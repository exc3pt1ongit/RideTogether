using Microsoft.EntityFrameworkCore;

namespace RideTogether.Dal.Credentials;

public class CredentialsRepository : ICredentialsRepository
{
    private readonly RideTogetherDbContext _dbContext;
    
    public CredentialsRepository(RideTogetherDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<IEnumerable<CredentialsDao>> GetAllAsync()
    {
        return await _dbContext.Credentials
            .Include(c => c.Role)
            .Include(c => c.User)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<CredentialsDao> GetByIdAsync(int id)
    {
        return await _dbContext.Credentials
            .Include(c => c.Role)
            .Include(c => c.User)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<CredentialsDao> CreateAsync(CredentialsDao entity)
    {
        var result = await _dbContext.Credentials.AddAsync(entity);
        await _dbContext.SaveChangesAsync();
        return result.Entity;
    }

    public async Task<CredentialsDao> UpdateAsync(CredentialsDao entity)
    {
        var entityEntry = _dbContext.Credentials.Update(entity);
        await _dbContext.SaveChangesAsync();
        return entityEntry.Entity;
    }

    public async Task DeleteAsync(int id)
    {
        var existingEntity = await _dbContext.Credentials
            .FirstAsync(s => s.Id == id);
        _dbContext.Credentials.Remove(existingEntity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<CredentialsDao> GetByUserIdAsync(int userId)
    {
        return await _dbContext.Credentials
            .Include(c => c.Role)
            .Include(c => c.User)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.UserId == userId);
    }
}