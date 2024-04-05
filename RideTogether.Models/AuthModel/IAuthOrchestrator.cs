namespace RideTogether.Models.AuthModel;

public interface IAuthOrchestrator
{
    Task<AuthToken> GetTokenAsync(LoginRequest login);
}