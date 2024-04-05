using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RideTogether.Dal.DataObjects.User;
using RideTogether.Models.UserModel;

namespace RideTogether.Dal.Repositories;

public class UserRepository : IUserRepository
{
    private readonly RideTogetherDbContext _dbContext;
    private readonly IMapper _mapper;

    public UserRepository(RideTogetherDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }
    
    public async Task<List<User>> GetAllAsync()
    {
        var entities = await _dbContext.Users
            .Include(usr => usr.Credentials)
            .ThenInclude(cred => cred.Role)
            .AsNoTracking()
            .ToListAsync();
        return _mapper.Map<List<User>>(entities);
    }

    public async Task<User> GetByIdAsync(int id)
    {
        var entity = await _dbContext.Users
            .Include(usr => usr.Credentials)
            .ThenInclude(cred => cred.Role)
            .AsNoTracking()
            .FirstOrDefaultAsync(usr => usr.Id == id);
        return _mapper.Map<User>(entity);
    }

    public async Task<User> CreateAsync(User model)
    {
        var entity = _mapper.Map<UserDao>(model);
        var result = await _dbContext.Users.AddAsync(entity);
        await _dbContext.SaveChangesAsync();

        return _mapper.Map<User>(result.Entity);
    }

    public async Task<User> UpdateAsync(User model)
    {
        var existingEntity = _mapper.Map<UserDao>(model);
        var entityEntry = _dbContext.Users.Update(existingEntity);

        await _dbContext.SaveChangesAsync();

        return _mapper.Map<User>(entityEntry.Entity);
    }

    public async Task DeleteAsync(int id)
    {
        var existingEntity = await _dbContext.Users
            .FirstAsync(s => s.Id == id);
        _dbContext.Users.Remove(existingEntity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<User> GetByEmailAsync(string email)
    {
        var entity = await _dbContext.Users
            .Include(usr => usr.Credentials)
            .ThenInclude(cred => cred.Role)
            .AsNoTracking()
            .FirstOrDefaultAsync(usr => usr.Email == email);
        return _mapper.Map<User>(entity);
    }

    public async Task<bool> IsNicknameTakenAsync(string nickname)
        => await _dbContext.Users.AnyAsync(usr => usr.Nickname == nickname);

    public async Task<bool> IsEmailExistAsync(string email)
        => await _dbContext.Users.AnyAsync(usr => usr.Email == email);
}