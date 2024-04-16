using Microsoft.EntityFrameworkCore;

namespace RideTogether.Dal.Role;

public class RoleRepository : IRoleRepository
{
    private readonly RideTogetherDbContext _dbContext;
    
    public RoleRepository(RideTogetherDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<List<RoleDao>> GetAllAsync()
    {
        return await _dbContext.Roles.AsNoTracking().ToListAsync();
    }

    public async Task<RoleDao> GetByIdAsync(int id)
    {
        return await _dbContext.Roles
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<RoleDao> CreateAsync(RoleDao entity)
    {
        var result = await _dbContext.Roles.AddAsync(entity);
        await _dbContext.SaveChangesAsync();
        return result.Entity;
    }

    public async Task<RoleDao> UpdateAsync(RoleDao entity)
    {
        var entityEntry = _dbContext.Roles.Update(entity);
        await _dbContext.SaveChangesAsync();
        return entityEntry.Entity;
    }

    public async Task DeleteAsync(int id)
    {
        var existingEntity = await _dbContext.Roles
            .FirstAsync(s => s.Id == id);
        _dbContext.Roles.Remove(existingEntity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<bool> IsBasicAsync(int id)
    {
        var role = await _dbContext.Roles
            .FirstOrDefaultAsync(x => x.Id == id);
        return role is { BasicRole: true };
    }
}