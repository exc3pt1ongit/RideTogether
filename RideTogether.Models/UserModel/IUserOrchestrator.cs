namespace RideTogether.Models.UserModel;

public interface IUserOrchestrator
{
    Task<User> RegisterAsync(SignUpModel authModel);
    Task<User> GetByIdAsync(int id);
    Task<IEnumerable<User>> GetAllAsync();
    Task DeleteByIdAsync(int userId);
}