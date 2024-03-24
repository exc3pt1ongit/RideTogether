using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RideTogether.Dal.Person;
using RideTogether.Models.Person;
using RideTogether.Models.Person.Interfaces;

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
    
    public async Task<List<Driver>> GetAllAsync()
    {
        var entities = await _dbContext.Drivers.AsNoTracking().ToListAsync();
        return _mapper.Map<List<Driver>>(entities);
    }

    public async Task<Driver> GetByIdAsync(int id)
    {
        var entity = await _dbContext.Drivers.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
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