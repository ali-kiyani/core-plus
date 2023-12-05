namespace Coreplus.Sample.Api.Endpoints.Practitioner;

public static class MapEndpoints
{
    public static RouteGroupBuilder MapPractitionerEndpoints(this RouteGroupBuilder group)
    {
        group.MapGetAllPractitioners();
        group.MapGetSupervisorPractitioners();
        group.MapGetRemainingPractitioners();
        group.MapGetPractitionerAppointmentsByMonth();
        group.MapGetPractitionerAppointments();
        group.MapGetAppointmentData();
        return group;
    }
}