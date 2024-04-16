namespace RideTogether.Dal.Role;

public interface IRoleRepository
{
    Task<List<RoleDao>> GetAllAsync();
    Task<RoleDao> GetByIdAsync(int id);
    Task<RoleDao> CreateAsync(RoleDao entity);
    Task<RoleDao> UpdateAsync(RoleDao entity);
    Task DeleteAsync(int id);
    Task<bool> IsBasicAsync(int id);
}