using Microsoft.EntityFrameworkCore;

namespace RideTogether.Dal.User;

public class UserRepository : IUserRepository
{
    private readonly RideTogetherDbContext _dbContext;

    public UserRepository(RideTogetherDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<UserDao>> GetAllAsync()
    {
        return await _dbContext.Users
            .Include(usr => usr.Credentials)
            .ThenInclude(cred => cred.Role)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<UserDao> GetByIdAsync(int id)
    {
        return await _dbContext.Users
            .Include(usr => usr.Credentials)
            .ThenInclude(cred => cred.Role)
            .AsNoTracking()
            .FirstOrDefaultAsync(usr => usr.Id == id);
    }

    public async Task<UserDao> CreateAsync(UserDao entity)
    {
        var result = await _dbContext.Users.AddAsync(entity);
        await _dbContext.SaveChangesAsync();

        return result.Entity;
    }

    public async Task<UserDao> UpdateAsync(UserDao entity)
    {
        var entityEntry = _dbContext.Users.Update(entity);
        await _dbContext.SaveChangesAsync();
        return entityEntry.Entity;
    }

    public async Task DeleteAsync(int id)
    {
        var existingEntity = await _dbContext.Users
            .FirstAsync(s => s.Id == id);
        _dbContext.Users.Remove(existingEntity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<UserDao> GetByEmailAsync(string email)
    {
        return await _dbContext.Users
            .Include(usr => usr.Credentials)
            .ThenInclude(cred => cred.Role)
            .AsNoTracking()
            .FirstOrDefaultAsync(usr => usr.Email == email);
    }

    public async Task<bool> IsNicknameTakenAsync(string nickname)
    {
        return await _dbContext.Users.AnyAsync(usr => usr.Nickname == nickname);
    }

    public async Task<bool> IsEmailExistAsync(string email)
    {
        return await _dbContext.Users.AnyAsync(usr => usr.Email == email);
    }
}