using Coreplus.Sample.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Xml.Linq;

namespace Coreplus.Sample.Api.Endpoints.Practitioner
{
    public static class GetPractitionerAppointmentsByMonth
    {
        public static RouteGroupBuilder MapGetPractitionerAppointmentsByMonth(this RouteGroupBuilder group)
        {
            group.MapGet("/{id:long}/appointmentsByMonth", async (PractitionerService practitionerService, long id, [FromQuery(Name = "startDate")] string startDate, [FromQuery(Name = "endDate")] string endDate,
                [FromQuery(Name = "skip")] int? skip, [FromQuery(Name = "count")] int? count) =>
            {
                var appointments = await practitionerService.GetPractitionersAppointmentDataByMonth(id, startDate, endDate, skip, count);
                return Results.Ok(appointments);

            });

            return group;
        }
    }
}
