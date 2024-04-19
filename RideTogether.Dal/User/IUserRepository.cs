namespace RideTogether.Dal.User;

public interface IUserRepository
{
    Task<List<UserDao>> GetAllAsync();
    Task<UserDao> GetByIdAsync(int id);
    Task<UserDao> CreateAsync(UserDao entity);
    Task<UserDao> UpdateAsync(UserDao entity);
    Task DeleteAsync(int id);
    Task<UserDao> GetByEmailAsync(string email);
    Task<bool> IsNicknameTakenAsync(string nickname);
    Task<bool> IsEmailExistAsync(string email);
}