using Microsoft.EntityFrameworkCore;
using RideTogether.Dal.Person;
using RideTogether.Dal.Route;
using RideTogether.Dal.Trip;

namespace RideTogether.Dal;

public class RideTogetherDbContext : DbContext
{
    public RideTogetherDbContext(DbContextOptions<RideTogetherDbContext> options) : base(options) {}

    public DbSet<HitchhikerDao> Hitchhikers { get; set; }
    public DbSet<DriverDao> Drivers { get; set; }
    public DbSet<RouteDao> Routes { get; set; }
    public DbSet<TripDao> Trips { get; set; }
}