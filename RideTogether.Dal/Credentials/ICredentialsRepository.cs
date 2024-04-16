namespace RideTogether.Dal.Credentials;

public interface ICredentialsRepository
{
    Task<IEnumerable<CredentialsDao>> GetAllAsync();
    Task<CredentialsDao> GetByIdAsync(int id);

    Task<CredentialsDao> CreateAsync(CredentialsDao entity);

    Task<CredentialsDao> UpdateAsync(CredentialsDao entity);
    Task DeleteAsync(int id);
    Task<CredentialsDao> GetByUserIdAsync(int userId);
}