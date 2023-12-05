using Coreplus.Sample.Api.Endpoints.Practitioner;
using Coreplus.Sample.Api.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<PractitionerService>();
//builder.Services.AddCors();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173") // Replace with your frontend origin(s)
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});
var app = builder.Build();
//app.UseCors("AllowAll");
app.UseCors("AllowSpecificOrigin");

var practitionerEndpoints = app.MapGroup("/practitioners");
practitionerEndpoints.MapPractitionerEndpoints();

app.Run();
