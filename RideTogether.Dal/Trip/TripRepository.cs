using Microsoft.EntityFrameworkCore;

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
            .ToListAsync();
    }

    public async Task<TripDao> GetByIdAsync(int id)
    {
        return await _dbContext.Trips
            .Include(x => x.Source)
            .Include(x => x.Destination)
            .FirstOrDefaultAsync(x => x.Id == id);
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
        var existingTrip = await _dbContext.Trips
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.DriverId == driverId
                && x.Source.Latitude == source.Lat
                && x.Source.Longitude == source.Lng
                && x.Destination.Latitude == destination.Lat
                && x.Destination.Longitude == destination.Lng);
        return existingTrip != null;
    }
}