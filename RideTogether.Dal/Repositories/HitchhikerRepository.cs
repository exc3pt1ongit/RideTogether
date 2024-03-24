using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RideTogether.Dal.Person;
using RideTogether.Models.PersonModel;
using RideTogether.Models.PersonModel.Interfaces;

namespace RideTogether.Dal.Repositories;

public class HitchhikerRepository : IHitchhikerRepository
{
    private readonly RideTogetherDbContext _dbContext;
    private readonly IMapper _mapper;

    public HitchhikerRepository(RideTogetherDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }
    
    public async Task<List<Hitchhiker>> GetAllAsync()
    {
        var entities = await _dbContext.Hitchhikers.AsNoTracking().ToListAsync();
        return _mapper.Map<List<Hitchhiker>>(entities);
    }

    public async Task<Hitchhiker> GetByIdAsync(int id)
    {
        var entity = await _dbContext.Hitchhikers.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        return _mapper.Map<Hitchhiker>(entity);
    }

    public async Task<Hitchhiker> CreateAsync(Hitchhiker hitchhiker)
    {
        var entity = _mapper.Map<HitchhikerDao>(hitchhiker);
        var result = await _dbContext.Hitchhikers.AddAsync(entity);
        await _dbContext.SaveChangesAsync();
        return _mapper.Map<Hitchhiker>(result.Entity);
    }

    public async Task<Hitchhiker> UpdateAsync(Hitchhiker hitchhiker)
    {
        var existingEntity = _mapper.Map<HitchhikerDao>(hitchhiker);
        var entityEntry = _dbContext.Hitchhikers.Update(existingEntity);
        await _dbContext.SaveChangesAsync();
        return _mapper.Map<Hitchhiker>(entityEntry.Entity);
    }

    public async Task DeleteAsync(int id)
    {
        var existingEntity = await _dbContext.Hitchhikers
            .FirstAsync(x => x.Id == id);
        _dbContext.Hitchhikers.Remove(existingEntity);
        await _dbContext.SaveChangesAsync();
    }
}