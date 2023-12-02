using Coreplus.Sample.Api.Services;

namespace Coreplus.Sample.Api.Endpoints.Practitioner
{
    public static class GetAppointmentData
    {
        public static RouteGroupBuilder MapGetAppointmentData(this RouteGroupBuilder group)
        {
            group.MapGet("/{pid:long}/appointments/{aid:long}", async (PractitionerService practitionerService, long pid, long aid) =>
            {
                var appointments = await practitionerService.GetAppointmentData(pid, aid);
                return Results.Ok(appointments);
            });

            return group;
        }
    }
}
