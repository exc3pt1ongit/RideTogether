using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RideTogether.Dal.DataObjects.Role;
using RideTogether.Models.RoleModel;

namespace RideTogether.Dal.Repositories;

public class RoleRepository : IRoleRepository
{
    private readonly RideTogetherDbContext _dbContext;
    private readonly IMapper _mapper;

    public RoleRepository(RideTogetherDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }
    
    public async Task<List<Role>> GetAllAsync()
    {
        var entities = await _dbContext.Roles.AsNoTracking().ToListAsync();

        return _mapper.Map<List<Role>>(entities);
    }

    public async Task<Role> GetByIdAsync(int id)
    {
        var entity = await _dbContext.Roles
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);

        return _mapper.Map<Role>(entity);
    }

    public async Task<Role> CreateAsync(Role model)
    {
        var entity = _mapper.Map<RoleDao>(model);
        var result = await _dbContext.Roles.AddAsync(entity);
        await _dbContext.SaveChangesAsync();

        return _mapper.Map<Role>(result.Entity);
    }

    public async Task<Role> UpdateAsync(Role model)
    {
        var existingEntity = _mapper.Map<RoleDao>(model);
        var entityEntry = _dbContext.Roles.Update(existingEntity);

        await _dbContext.SaveChangesAsync();

        return _mapper.Map<Role>(entityEntry.Entity);
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