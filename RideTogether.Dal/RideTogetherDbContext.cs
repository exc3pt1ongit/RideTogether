using Microsoft.EntityFrameworkCore;
using RideTogether.Dal.DataObjects.Person;
using RideTogether.Dal.DataObjects.Route;
using RideTogether.Dal.DataObjects.Trip;

namespace RideTogether.Dal;

public class RideTogetherDbContext : DbContext
{
    public RideTogetherDbContext(DbContextOptions<RideTogetherDbContext> options) : base(options) {}

    public DbSet<HitchhikerDao> Hitchhikers { get; set; }
    public DbSet<DriverDao> Drivers { get; set; }
    public DbSet<RouteDao> Routes { get; set; }
    public DbSet<TripDao> Trips { get; set; }
}