using Microsoft.EntityFrameworkCore;
using RideTogether.Dal.DataObjects.Credentials;
using RideTogether.Dal.DataObjects.Person;
using RideTogether.Dal.DataObjects.Role;
using RideTogether.Dal.DataObjects.Route;
using RideTogether.Dal.DataObjects.Trip;
using RideTogether.Dal.DataObjects.User;

namespace RideTogether.Dal;

public class RideTogetherDbContext : DbContext
{
    public RideTogetherDbContext(DbContextOptions<RideTogetherDbContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        #region FluentApi
            
        var user = modelBuilder.Entity<UserDao>();
        user.HasOne(u => u.Credentials)
            .WithOne(p => p.User)
            .HasForeignKey<CredentialsDao>(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        user.HasIndex(u => u.Email).IsUnique();
        user.Property(u => u.Email).HasMaxLength(100).IsRequired();
        user.Property(u => u.Nickname).HasMaxLength(30);
        user.Property(u => u.RegistrationTime).HasDefaultValueSql("CURRENT_TIMESTAMP");
        user.ToTable("Users");

        var credentials = modelBuilder.Entity<CredentialsDao>();
        credentials.HasOne(p => p.Role)
            .WithMany(r => r.Credentials)
            .OnDelete(DeleteBehavior.SetNull);
        credentials.Property(p => p.PasswordSalt).IsRequired();
        credentials.Property(p => p.PasswordHash).IsRequired();
        credentials.ToTable("Credentials");

        modelBuilder.Entity<RoleDao>()
            .Property(r => r.RoleName).HasMaxLength(50).IsRequired();
            
        #endregion
    }

    public DbSet<HitchhikerDao> Hitchhikers { get; set; }
    public DbSet<DriverDao> Drivers { get; set; }
    public DbSet<RouteDao> Routes { get; set; }
    public DbSet<TripDao> Trips { get; set; }
    
    public DbSet<UserDao> Users { get; set; }
    public DbSet<RoleDao> Roles { get; set; }
    public DbSet<CredentialsDao> Credentials { get; set; }
}