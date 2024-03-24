using Microsoft.EntityFrameworkCore;
using RideTogether.Dal;
using RideTogether.Dal.Repositories;
using RideTogether.Dal.Repositories.Interfaces;
using RideTogether.Models.PersonModel.Interfaces;
using RideTogether.Models.TripModel.Interfaces;
using RideTogether.Orchestrators.Person;
using RideTogether.Orchestrators.Trip;

// TODO: пофіксити ендпоінти для Trip.

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddDbContext<RideTogetherDbContext>(
    options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQLConnectionString")));

// Mapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Repository
builder.Services.AddScoped<IDriverRepository, DriverRepository>();
builder.Services.AddScoped<IHitchhikerRepository, HitchhikerRepository>();
builder.Services.AddScoped<ITripRepository, TripRepository>();

// Orchestrators
builder.Services.AddScoped<IDriverOrchestrator, DriverOrchestrator>();
builder.Services.AddScoped<IHitchhikerOrchestrator, HitchhikerOrchestrator>();
builder.Services.AddScoped<ITripOrchestrator, TripOrchestrator>();

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
app.MapControllers();
app.Run();