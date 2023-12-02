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

    public async Task<PractitionerAppointmentListDto> GetPractitionersAppointmentDataByDate(long id, string startDate, string endDate, int? skip, int? count)
    {
        DateTime sDate, eDate;
        try
        {
            sDate = DateTime.Parse(startDate);
            eDate = DateTime.Parse(endDate);
        }
        catch(Exception ex)
        {
            throw new Exception("Unable to parse start date / end date");
        }
        sDate = new DateTime(sDate.Year, sDate.Month, 1);
        eDate = new DateTime(eDate.Year, eDate.Month, 1);
        var data = appointments.Where(appointment => appointment.practitioner_id == id && DateTime.Parse(appointment.date) >= sDate && DateTime.Parse(appointment.date) <= eDate);
        if (skip.HasValue && count.HasValue)
            data = data.Skip(skip.Value).Take(count.Value);
        return new PractitionerAppointmentListDto(data.Count(), data.Select(appointment => new PractitionersAppointmentDto(appointment.id, appointment.date, appointment.revenue, appointment.cost)));
    }

    public async Task<PractitionerAppointmentListDto> GetPractitionerAppointments(long id, int? skip, int? count)
    {
        var practitionersAppointments = appointments.Where(appointment => appointment.practitioner_id == id);
        var totalCount = practitionersAppointments.Count();
        if (skip.HasValue && count.HasValue)
            practitionersAppointments = practitionersAppointments.Skip(skip.Value).Take(count.Value);

        return new PractitionerAppointmentListDto(totalCount, practitionersAppointments.Select(appointment => new PractitionersAppointmentDto(appointment.id, appointment.date.ToString(), appointment.revenue, appointment.cost)));
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