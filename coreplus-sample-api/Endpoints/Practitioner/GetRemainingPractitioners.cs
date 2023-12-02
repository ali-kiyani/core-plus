using Coreplus.Sample.Api.Services;

namespace Coreplus.Sample.Api.Endpoints.Practitioner
{
    public static class GetRemainingPractitioners
    {
        public static RouteGroupBuilder MapGetRemainingPractitioners(this RouteGroupBuilder group)
        {
            group.MapGet("/remaining", async (PractitionerService practitionerService) =>
            {
                var practitioners = await practitionerService.GetRemainingPractitioners();
                return Results.Ok(practitioners);
            });

            return group;
        }
    }
}
