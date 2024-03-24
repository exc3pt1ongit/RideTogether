using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RideTogether.Dal.DataObjects.Trip;
using RideTogether.Models.TripModel.Interfaces;

namespace RideTogether.Dal.Repositories;

public class TripRepository : ITripRepository
{
    private readonly RideTogetherDbContext _dbContext;
    private readonly IMapper _mapper;

    public TripRepository(RideTogetherDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }
    
    public async Task<List<Models.TripModel.Trip>> GetAllAsync()
    {
        var entities = await _dbContext.Trips.AsNoTracking().ToListAsync();
        return _mapper.Map<List<Models.TripModel.Trip>>(entities);
    }

    public async Task<Models.TripModel.Trip> GetByIdAsync(int id)
    {
        var entity = await _dbContext.Trips.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        return _mapper.Map<Models.TripModel.Trip>(entity);
    }

    public async Task<Models.TripModel.Trip> CreateAsync(Models.TripModel.Trip trip)
    {
        var entity = _mapper.Map<TripDao>(trip);
        var result = await _dbContext.Trips.AddAsync(entity);
        await _dbContext.SaveChangesAsync();
        return _mapper.Map<Models.TripModel.Trip>(result.Entity);
    }

    public async Task<Models.TripModel.Trip> UpdateAsync(Models.TripModel.Trip trip)
    {
        var existingEntity = _mapper.Map<TripDao>(trip);
        var entityEntry = _dbContext.Trips.Update(existingEntity);
        await _dbContext.SaveChangesAsync();
        return _mapper.Map<Models.TripModel.Trip>(entityEntry.Entity);
    }

    public async Task DeleteAsync(int id)
    {
        var existingEntity = await _dbContext.Trips
            .FirstAsync(x => x.Id == id);
        _dbContext.Trips.Remove(existingEntity);
        await _dbContext.SaveChangesAsync();
    }
}