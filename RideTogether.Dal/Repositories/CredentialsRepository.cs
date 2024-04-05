using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RideTogether.Dal.DataObjects.Credentials;
using RideTogether.Models.CredentialsModel;

namespace RideTogether.Dal.Repositories;

public class CredentialsRepository : ICredentialsRepository
{
    private readonly RideTogetherDbContext _dbContext;
    private readonly IMapper _mapper;

    public CredentialsRepository(RideTogetherDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }
    
    public async Task<IEnumerable<Credentials>> GetAllAsync()
    {
        var entities = await _dbContext.Credentials
            .Include(c => c.Role)
            .Include(c => c.User)
            .AsNoTracking()
            .ToListAsync();

        return _mapper.Map<List<Credentials>>(entities);
    }

    public async Task<Credentials> GetByIdAsync(int id)
    {
        var entity = await _dbContext.Credentials
            .Include(c => c.Role)
            .Include(c => c.User)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);
        
        return _mapper.Map<Credentials>(entity);
    }

    public async Task<Credentials> CreateAsync(Credentials model)
    {
        var entity = _mapper.Map<CredentialsDao>(model);
        var result = await _dbContext.Credentials.AddAsync(entity);
        await _dbContext.SaveChangesAsync();

        return _mapper.Map<Credentials>(result.Entity);
    }

    public async Task<Credentials> UpdateAsync(Credentials model)
    {
        var existingEntity = _mapper.Map<CredentialsDao>(model);
        var entityEntry = _dbContext.Credentials.Update(existingEntity);

        await _dbContext.SaveChangesAsync();

        return _mapper.Map<Credentials>(entityEntry.Entity);
    }

    public async Task DeleteAsync(int id)
    {
        var existingEntity = await _dbContext.Credentials
            .FirstAsync(s => s.Id == id);
        _dbContext.Credentials.Remove(existingEntity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<Credentials> GetByUserIdAsync(int userId)
    {
        var entity = await _dbContext.Credentials
            .Include(c => c.Role)
            .Include(c => c.User)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.UserId == userId);

        return _mapper.Map<Credentials>(entity);
    }
}