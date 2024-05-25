using System.Numerics;
using Microsoft.EntityFrameworkCore;
using RideTogether.Dal.Trip.Filtering;

namespace RideTogether.Dal.Trip;

public class TripRepository : ITripRepository
{
    private readonly RideTogetherDbContext _dbContext;

    public TripRepository(RideTogetherDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<List<TripDao>> GetAllAsync()
    {
        return await _dbContext.Trips
            .Include(x => x.Source)
            .Include(x => x.Destination)
            .Include(x => x.Amenities)
            .ToListAsync();
    }

    public async Task<List<TripDao>> GetFilteredAsync(TripFilter filter)
    {
        var query = _dbContext.Trips
            .Include(x => x.Source)
            .Include(x => x.Destination)
            .Include(x => x.Amenities)
            .AsQueryable();
        
        if (filter.SourceLat != 0 && filter.SourceLng != 0)
        {
            // Assuming 1 degree of latitude/longitude is approximately 111 kilometers
            var radiusInKm = 0.5; // Adjust this radius as needed
            var sourceLatitude = filter.SourceLat;
            var sourceLongitude = filter.SourceLng;

            query = query.Where(x => 
                (x.Source.Latitude - sourceLatitude) * (x.Source.Latitude - sourceLatitude) +
                (x.Source.Longitude - sourceLongitude) * (x.Source.Longitude - sourceLongitude) <= radiusInKm * radiusInKm);
        }

        if (filter.DestinationLat != 0 && filter.DestinationLng != 0)
        {
            // Similar to source latitude/longitude filter
            var radiusInKm = 0.5; // Adjust this radius as needed
            var destinationLatitude = filter.DestinationLat;
            var destinationLongitude = filter.DestinationLng;

            query = query.Where(x => 
                (x.Destination.Latitude - destinationLatitude) * (x.Destination.Latitude - destinationLatitude) +
                (x.Destination.Longitude - destinationLongitude) * (x.Destination.Longitude - destinationLongitude) <= radiusInKm * radiusInKm);
        }
        
        if (filter.TripDate != default)
        {
            query = query.Where(x => x.StartTime.Date == filter.TripDate.Date);
        }

        if (filter.CreatedBy is > 0)
            query = query.Where(x => x.DriverId == filter.CreatedBy);
        
        if (!string.IsNullOrEmpty(filter.MainFilter))
        {
            var isFormated = Enum.TryParse<TripMainFilterTypes>(filter.MainFilter, out var mainFilterType);

            if (isFormated)
            {
                query = mainFilterType switch
                {
                    TripMainFilterTypes.EarliestDepartureTime => query.OrderBy(x => x.StartTime),
                    TripMainFilterTypes.LowestPrice => query.OrderBy(x => x.Price),
                    TripMainFilterTypes.ShortestTrip => query.OrderBy(x => x.Distance),
                    _ => query
                };
            }
        }
        
        // if (filter.DepartureSixToNoon.HasValue || filter.DepartureNoonToSix.HasValue || filter.DepartureAfterSixPm.HasValue)
        // {
        //     query = query.Where(x =>
        //         (filter.DepartureSixToNoon.HasValue && x.StartTime.TimeOfDay >= new TimeSpan(6, 0, 0) && x.StartTime.TimeOfDay <= new TimeSpan(12, 0, 0)) ||
        //         (filter.DepartureNoonToSix.HasValue && x.StartTime.TimeOfDay > new TimeSpan(12, 0, 0) && x.StartTime.TimeOfDay <= new TimeSpan(18, 0, 0)) ||
        //         (filter.DepartureAfterSixPm.HasValue && x.StartTime.TimeOfDay > new TimeSpan(18, 0, 0))
        //     );
        // }
        
        // if (filter.DepartureSixToNoon.HasValue || filter.DepartureNoonToSix.HasValue || filter.DepartureAfterSixPm.HasValue)
        // {
        //     query = query.Where(x =>
        //         (filter.DepartureSixToNoon.HasValue && x.StartTime.TimeOfDay >= new TimeSpan(6, 0, 0) && x.StartTime.TimeOfDay < new TimeSpan(12, 0, 0)) ||
        //         (filter.DepartureNoonToSix.HasValue && x.StartTime.TimeOfDay >= new TimeSpan(12, 0, 0) && x.StartTime.TimeOfDay < new TimeSpan(18, 0, 0)) ||
        //         (filter.DepartureAfterSixPm.HasValue && x.StartTime.TimeOfDay >= new TimeSpan(18, 0, 0))
        //     );
        // }
        
        if (filter.Amenities is { MaximumTwoPeopleBackSeat: not null })
            query = query.Where(x => x.Amenities.MaximumTwoPeopleBackSeat == filter.Amenities.MaximumTwoPeopleBackSeat);

        if (filter.Amenities is { CanSmoke: not null })
            query = query.Where(x => x.Amenities.CanSmoke == filter.Amenities.CanSmoke);

        if (filter.Amenities is { PetsAllowed: not null })
            query = query.Where(x => x.Amenities.PetsAllowed == filter.Amenities.PetsAllowed);

        if (filter.Amenities is { Wifi: not null })
            query = query.Where(x => x.Amenities.Wifi == filter.Amenities.Wifi);

        if (filter.Amenities is { AirConditioning: not null })
            query = query.Where(x => x.Amenities.AirConditioning == filter.Amenities.AirConditioning);

        return query
            .Skip((filter.PageNumber - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .AsNoTracking()
            .ToList();
    }
    
    public async Task<TripDao> GetByIdAsync(int id)
    {
        var query = _dbContext.Trips
            .Include(x => x.Source)
            .Include(x => x.Destination)
            .Include(x => x.Amenities)
            .AsQueryable()
            .AsNoTracking();

        return await query.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<TripDao> CreateAsync(TripDao entity)
    {
        var result = await _dbContext.Trips.AddAsync(entity);
        await _dbContext.SaveChangesAsync();
        return result.Entity;
    }

    public async Task<TripDao> UpdateAsync(TripDao entity)
    {
        var entityEntry = _dbContext.Trips.Update(entity);
        await _dbContext.SaveChangesAsync();
        return entityEntry.Entity;
    }

    public async Task DeleteAsync(int id)
    {
        var existingEntity = await _dbContext.Trips
            .FirstAsync(s => s.Id == id);
        _dbContext.Trips.Remove(existingEntity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<bool> IsTripExistAsync(int driverId, 
        (double Lat, double Lng) source, (double Lat, double Lng) destination)
    {
        const double tolerance = 1e-6;
        var existingTrip = await _dbContext.Trips
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.DriverId == driverId
                && Math.Abs(x.Source.Latitude - source.Lat) < tolerance
                && Math.Abs(x.Source.Longitude - source.Lng) < tolerance
                && Math.Abs(x.Destination.Latitude - destination.Lat) < tolerance
                && Math.Abs(x.Destination.Longitude - destination.Lng) < tolerance);
        return existingTrip != null;
    }
}