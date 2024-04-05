using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RideTogether.Api;
using RideTogether.Dal;
using RideTogether.Dal.Repositories;
using RideTogether.Dal.Repositories.Interfaces;
using RideTogether.Models.AuthModel;
using RideTogether.Models.CredentialsModel;
using RideTogether.Models.PersonModel.Interfaces;
using RideTogether.Models.RoleModel;
using RideTogether.Models.TripModel.Interfaces;
using RideTogether.Models.UserModel;
using RideTogether.Orchestrators.Auth;
using RideTogether.Orchestrators.Auth.Options;
using RideTogether.Orchestrators.Person;
using RideTogether.Orchestrators.Trip;
using RideTogether.Orchestrators.User;
using Swashbuckle.AspNetCore.SwaggerGen;

// TODO: пофіксити ендпоінти для Trip.

var builder = WebApplication.CreateBuilder(args);

var authOptions = builder.Configuration.GetSection("Auth");
builder.Services.Configure<JwtOptions>(authOptions);
var auth = authOptions.Get<JwtOptions>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = auth.Issuer,

        ValidateAudience = true,
        ValidAudience = auth.Audience,

        ValidateLifetime = true,

        IssuerSigningKey = auth.GetSymmetricSecurityKey(),
        ValidateIssuerSigningKey = true,
    };
});

builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

builder.Services.AddDbContext<RideTogetherDbContext>(
    options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQLConnectionString")));

// Mapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Repository
builder.Services.AddScoped<IDriverRepository, DriverRepository>();
builder.Services.AddScoped<IHitchhikerRepository, HitchhikerRepository>();
builder.Services.AddScoped<ITripRepository, TripRepository>();

builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<ICredentialsRepository, CredentialsRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Orchestrators
builder.Services.AddScoped<IDriverOrchestrator, DriverOrchestrator>();
builder.Services.AddScoped<IHitchhikerOrchestrator, HitchhikerOrchestrator>();
builder.Services.AddScoped<ITripOrchestrator, TripOrchestrator>();

builder.Services.AddScoped<IUserOrchestrator, UserOrchestrator>();
builder.Services.AddScoped<IAuthOrchestrator, AuthOrchestrator>();

// WebApi settings
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();