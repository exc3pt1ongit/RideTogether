using AutoMapper;

using System.Text;
using System.Security.Claims;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using RideTogether.Dal.User;
using RideTogether.Orchestrators.User;
using RideTogether.Orchestrators.Auth.Model;
using RideTogether.Orchestrators.Auth.Options;
using RideTogether.Orchestrators.Validation.Exceptions;

namespace RideTogether.Orchestrators.Auth;

public class AuthOrchestrator : IAuthOrchestrator
{
    private readonly IOptions<JwtOptions> _authOptions;

    private readonly ILogger<UserOrchestrator> _logger;
    private readonly IMapper _mapper;
    private readonly IUserRepository _userRepository;

    public AuthOrchestrator(IUserRepository userRepository, IMapper mapper, IOptions<JwtOptions> authOptions,
        ILogger<UserOrchestrator> logger)
    {
        _mapper = mapper;
        _authOptions = authOptions;
        _logger = logger;
        _userRepository = userRepository;
    }

    public async Task<AuthToken> GetTokenAsync(LoginRequest request)
    {
        var userEntity = await _userRepository.GetByEmailAsync(request.Email);
        var user = _mapper.Map<User.Model.User>(userEntity);

        if (user == null)
            throw new NotFoundException(string.Format(ExceptionMessages.NotFound, nameof(User.Model.User), "Email",
                request.Email));

        if (!VerifyPassword(request.Password, user.Credentials.PasswordHash, user.Credentials.PasswordSalt))
            throw new WrongPasswordException(ExceptionMessages.WrongPassword);

        _logger.LogInformation("The user with email {Email} has logged into", request.Email);
        var authToken = new AuthToken
        {
            Token = GenerateToken(user)
        };
        return authToken;
    }
    
    private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
    {
        using var hmac = new HMACSHA512(passwordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        return computedHash.SequenceEqual(passwordHash);
    }

    private string GenerateToken(User.Model.User user)
    {
        var authParams = _authOptions.Value;

        List<Claim> claims =
        [
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Credentials.Role.RoleName),
            new Claim("id", user.Id.ToString())
        ];

        // var key = authParams.GetSymmetricSecurityKey();
        // var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
        var key = new SymmetricSecurityKey(authParams.GetSymmetricSecurityKey().Key.Take(64)
            .ToArray()); // 512 bits = 64 bytes
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var token = new JwtSecurityToken(
            authParams.Issuer,
            authParams.Audience,
            claims,
            expires: DateTime.Now.AddSeconds(authParams.TokenLifeTime),
            signingCredentials: credentials);

        _logger.LogInformation("JWT token for {Email} generated", user.Email);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}