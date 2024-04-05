namespace RideTogether.Models.RoleModel;

public interface IRoleRepository
{
    Task<List<Role>> GetAllAsync();
    Task<Role> GetByIdAsync(int id);
    Task<Role> CreateAsync(Role model);
    Task<Role> UpdateAsync(Role model);
    Task DeleteAsync(int id);
    Task<bool> IsBasicAsync(int id);
}