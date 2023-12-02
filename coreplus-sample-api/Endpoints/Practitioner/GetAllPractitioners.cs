using Coreplus.Sample.Api.Services;

namespace Coreplus.Sample.Api.Endpoints.Practitioner;

public static class GetAllPractitioners
{
    public static RouteGroupBuilder MapGetAllPractitioners(this RouteGroupBuilder group)
    {
        group.MapGet("/", async (PractitionerService practitionerService) =>
        {
            var practitioners = await practitionerService.GetPractitioners();
            return Results.Ok(practitioners);
        });

        return group;
    }
}