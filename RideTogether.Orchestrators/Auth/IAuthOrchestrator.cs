using RideTogether.Orchestrators.Auth.Model;

namespace RideTogether.Orchestrators.Auth;

public interface IAuthOrchestrator
{
    Task<AuthToken> GetTokenAsync(LoginRequest login);
}