namespace RideTogether.Models.CredentialsModel;

public interface ICredentialsRepository
{
    Task<IEnumerable<Credentials>> GetAllAsync();
    Task<Credentials> GetByIdAsync(int id);

    Task<Credentials> CreateAsync(Credentials model);

    Task<Credentials> UpdateAsync(Credentials model);
    Task DeleteAsync(int id);
    Task<Credentials> GetByUserIdAsync(int userId);
}