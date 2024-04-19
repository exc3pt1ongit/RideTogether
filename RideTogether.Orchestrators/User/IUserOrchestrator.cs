using RideTogether.Orchestrators.User.Model;

namespace RideTogether.Orchestrators.User;

public interface IUserOrchestrator
{
    Task<Model.User> RegisterAsync(SignUpRequest request);

    Task<Model.User> GetByIdAsync(int id);
    Task<Model.User> GetByNicknameAsync(string nickname);

    Task<IEnumerable<Model.User>> GetAllAsync();

    Task DeleteByIdAsync(int userId);
}