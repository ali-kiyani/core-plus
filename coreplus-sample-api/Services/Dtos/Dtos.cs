using Coreplus.Sample.Api.Types;

namespace Coreplus.Sample.Api.Services.Dtos
{
    public class Dtos
    {
        public record PractitionerDto(long id, string name, PractitionerLevel level);
        public record PractitionersAppointmentDto(long id, string date, int revenue, int cost);
        public record AppointmentDto(long id, string date, string client_name, string appointment_type, int duration, int revenue, int cost, long practitioner_id);
        public record PractitionerAppointmentListDto(int totalCount, IEnumerable<PractitionersAppointmentDto> data);
    }
}
