using System.Globalization;
using System.IO;
using System.Text.Json;
using Coreplus.Sample.Api.Types;
using static Coreplus.Sample.Api.Services.Dtos.Dtos;

namespace Coreplus.Sample.Api.Services;

public class PractitionerService
{
    private readonly Practitioner[] practitioners;
    private readonly Appointment[] appointments;

    public PractitionerService()
    {
        using var practitionersFileStream = File.OpenRead(@"./Data/practitioners.json");
        practitioners = JsonSerializer.Deserialize<Practitioner[]>(practitionersFileStream);
        if (practitioners == null)
        {
            throw new Exception("Practitioners data read error");
        }
        using var appointmentsFileStream = File.OpenRead(@"./Data/appointments.json");
        appointments = JsonSerializer.Deserialize<Appointment[]>(appointmentsFileStream);
        if (appointments == null)
        {
            throw new Exception("Appointments data read error");
        }
    }
    public async Task<IEnumerable<PractitionerDto>> GetPractitioners()
    {
        return practitioners.Select(prac => new PractitionerDto(prac.id, prac.name, prac.level));
    }

    public async Task<IEnumerable<PractitionerDto>> GetSupervisorPractitioners()
    {
        return practitioners.Where(practitioner => (int)practitioner.level >= 2).Select(prac => new PractitionerDto(prac.id, prac.name, prac.level));
    }
    public async Task<IEnumerable<PractitionerDto>> GetRemainingPractitioners()
    {
        return practitioners.Where(practitioner => (int)practitioner.level < 2).Select(prac => new PractitionerDto(prac.id, prac.name, prac.level));
    }

    public async Task<PractitionerAppointmentByMonthListDto> GetPractitionersAppointmentDataByMonth(long id, string startDate, string endDate, int? skip, int? count)
    {
        if (DateTime.TryParse(startDate, out DateTime sDate) && DateTime.TryParse(endDate, out DateTime eDate))
        {
            sDate = new DateTime(sDate.Year, sDate.Month, 1);
            eDate = new DateTime(eDate.Year, eDate.Month, 1).AddMonths(1);

            var data = appointments.Where(appointment => appointment.practitioner_id == id &&
            DateTime.Parse(appointment.date) >= sDate && DateTime.Parse(appointment.date) < eDate)
                .GroupBy(x => DateTime.Parse(x.date).Month + "/" + DateTime.Parse(x.date).Year).OrderByDescending(x => DateTime.Parse(x.Key)).AsEnumerable();
            var totalCount = data.Count();
            if (skip.HasValue && count.HasValue)
            {
                data = data.Skip(skip.Value).Take(count.Value);
            }
            List<PractitionersAppointmentByMonthDto> list = new();
            foreach (var e in data)
            {
                PractitionersAppointmentByMonthDto practitionersAppointmentDtodto = new(e.Key, e.Sum(x => x.revenue), e.Sum(x => x.cost));
                list.Add(practitionersAppointmentDtodto);
            }

            return new PractitionerAppointmentByMonthListDto(totalCount, list);
        }
        else
        {
            throw new Exception("Unable to parse start / end date");
        }
    }

    public async Task<PractitionerAppointmentListDto> GetPractitionersAppointmentData(long id, string date, int? skip, int? count)
    {
        var splitDate = date.Split("/");
        var newDate = splitDate[0] + "/1/" + splitDate[1];
        if (DateTime.TryParse(newDate, out DateTime sDate))
        {
            DateTime eDate = sDate.AddMonths(1);
            var data = appointments.Where(appointment => appointment.practitioner_id == id && DateTime.Parse(appointment.date) >= sDate && DateTime.Parse(appointment.date) < eDate)
                .OrderByDescending(x => DateTime.Parse(x.date)).AsEnumerable();
            var totalCount = data.Count();
            if (skip.HasValue && count.HasValue)
            {
                data = data.Skip(skip.Value).Take(count.Value);
            }

            return new PractitionerAppointmentListDto(totalCount, data.Select(x => new PractitionersAppointmentDto(x.id, x.date, x.revenue, x.cost)));
        }
        else
        {
            throw new Exception("Unable to parse start / end date");
        }
    }

    public async Task<AppointmentDto> GetAppointmentData(long pid, long aid)
    {
        var appointment = appointments.FirstOrDefault(appointment => appointment.id == aid && appointment.practitioner_id == pid);
        if (appointment == null)
        {
            throw new Exception("No record found!");
        }
        return MapToAppointmentDto(appointment);
    }

    private AppointmentDto MapToAppointmentDto(Appointment appointment)
    {
        return new AppointmentDto(appointment.id, appointment.date, appointment.client_name, appointment.appointment_type, 
            appointment.duration, appointment.revenue, appointment.cost, appointment.practitioner_id);
    }
}