namespace RideTogether.Models.UserModel;

public interface IUserRepository
{
    Task<List<User>> GetAllAsync();
    Task<User> GetByIdAsync(int id);
    Task<User> CreateAsync(User model);
    Task<User> UpdateAsync(User model);
    Task DeleteAsync(int id);
    Task<User> GetByEmailAsync(string email);
    Task<bool> IsNicknameTakenAsync(string nickname);
    Task<bool> IsEmailExistAsync(string email);
}