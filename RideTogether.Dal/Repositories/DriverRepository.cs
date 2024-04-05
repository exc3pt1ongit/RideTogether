using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RideTogether.Dal.DataObjects.Person;
using RideTogether.Dal.Filters;
using RideTogether.Dal.Repositories.Interfaces;
using RideTogether.Models.PersonModel;

namespace RideTogether.Dal.Repositories;

public class DriverRepository : IDriverRepository
{
    private readonly RideTogetherDbContext _dbContext;
    private readonly IMapper _mapper;

    public DriverRepository(RideTogetherDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public List<Driver> FindDataByFilter(List<Driver>? entities, DriverFilterDto? filter)
    {
        if (filter is null || entities is null) return _mapper.Map<List<Driver>>(entities);

        if (filter.MinAge.HasValue)
        {
            entities = entities.Where(e => e.Age >= filter.MinAge.Value).ToList();
        }

        if (filter.MaxAge.HasValue)
        {
            entities = entities.Where(e => e.Age <= filter.MaxAge.Value).ToList();
        }

        if (filter.MinTrips.HasValue)
        {
            entities = entities.Where(e => e.Trips?.Count >= filter.MinTrips.Value).ToList();
        }

        return _mapper.Map<List<Driver>>(entities);
    }
    
    public async Task<List<Driver>> GetAllAsync()
    {
        var entities = await _dbContext.Drivers.AsNoTracking().ToListAsync();
        entities.ForEach(e => e.Trips = _dbContext.Trips.Where(t => t.DriverId == e.Id).ToList());
        return _mapper.Map<List<Driver>>(entities);
    }

    public async Task<Driver> GetByIdAsync(int id)
    {
        var entity = await _dbContext.Drivers.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        if (entity != null)
            entity.Trips = _dbContext.Trips.Where(t => t.DriverId == entity.Id).ToList();
        return _mapper.Map<Driver>(entity);
    }

    public async Task<Driver> CreateAsync(Driver driver)
    {
        var entity = _mapper.Map<DriverDao>(driver);
        var result = await _dbContext.Drivers.AddAsync(entity);
        await _dbContext.SaveChangesAsync();
        return _mapper.Map<Driver>(result.Entity);
    }

    public async Task<Driver> UpdateAsync(Driver driver)
    {
        var existingEntity = _mapper.Map<DriverDao>(driver);
        var entityEntry = _dbContext.Drivers.Update(existingEntity);
        await _dbContext.SaveChangesAsync();
        return _mapper.Map<Driver>(entityEntry.Entity);
    }

    public async Task DeleteAsync(int id)
    {
        var existingEntity = await _dbContext.Drivers
            .FirstAsync(x => x.Id == id);
        _dbContext.Drivers.Remove(existingEntity);
        await _dbContext.SaveChangesAsync();
    }
}