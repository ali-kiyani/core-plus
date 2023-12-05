using Coreplus.Sample.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Coreplus.Sample.Api.Endpoints.Practitioner
{
    public static class GetPractitionerAppointment
    {
        public static RouteGroupBuilder MapGetPractitionerAppointments(this RouteGroupBuilder group)
        {
            group.MapGet("/{id:long}/appointments", async (PractitionerService practitionerService, long id, [FromQuery(Name = "date")] string date,
                [FromQuery(Name = "skip")] int? skip, [FromQuery(Name = "count")] int? count) =>
            {
                var appointments = await practitionerService.GetPractitionersAppointmentData(id, date, skip, count);
                return Results.Ok(appointments);

            });

            return group;
        }
    }
}
