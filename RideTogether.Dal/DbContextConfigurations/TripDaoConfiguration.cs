using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RideTogether.Dal.Trip;

namespace RideTogether.Dal.DbContextConfigurations;

public class TripDaoConfiguration : IEntityTypeConfiguration<TripDao>
{
    public void Configure(EntityTypeBuilder<TripDao> builder)
    {
        // Define table name
        builder.ToTable("Trips");

        // Define primary key
        builder.HasKey(t => t.Id).HasName("PK_Trips");
        builder.Property(t => t.Id).ValueGeneratedOnAdd();
        
        // Define properties
        builder.Property(t => t.DriverId).IsRequired();
        builder.Property(t => t.Status).IsRequired();
        builder.Property(t => t.Price).IsRequired();
        builder.Property(t => t.Distance).IsRequired();
        builder.Property(t => t.StartTime).IsRequired();
        builder.Property(t => t.EndTime).IsRequired();

        // Define relationships
        builder.HasOne(t => t.Source)
            .WithMany()
            .IsRequired()
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(t => t.Destination)
            .WithMany()
            .IsRequired()
            .OnDelete(DeleteBehavior.Restrict);

        // Configure Amenities properties
        // builder.Property(t => t.Amenities.MaximumTwoPeopleBackSeat).HasColumnName("MaximumTwoPeopleBackSeat");
        // builder.Property(t => t.Amenities.CanSmoke).HasColumnName("CanSmoke");
        // builder.Property(t => t.Amenities.PetsAllowed).HasColumnName("PetsAllowed");
        // builder.Property(t => t.Amenities.Wifi).HasColumnName("Wifi");
        // builder.Property(t => t.Amenities.AirConditioning).HasColumnName("AirConditioning");

        builder.OwnsOne(t => t.Amenities, a =>
        {
            a.Property(x => x.MaximumTwoPeopleBackSeat).HasColumnName("MaximumTwoPeopleBackSeat");
            a.Property(x => x.CanSmoke).HasColumnName("CanSmoke");
            a.Property(x => x.PetsAllowed).HasColumnName("PetsAllowed");
            a.Property(x => x.Wifi).HasColumnName("Wifi");
            a.Property(x => x.AirConditioning).HasColumnName("AirConditioning");
        });
        
        // Define navigation property for Travelers
        // builder.Property(t => t.Travelers)
        //     .HasColumnType("jsonb") // Assuming you're using PostgreSQL and want to store as JSONB
        //     .IsRequired();

        // Ignore mapping for the Amenities property (handled directly)
        // builder.Ignore(t => t.Amenities);

        // Ignore mapping for the Travelers property (handled as JSONB)
        // builder.Ignore(t => t.Travelers);
    }
}