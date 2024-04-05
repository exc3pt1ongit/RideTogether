using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Microsoft.Extensions.Logging;
using RideTogether.Dal.DataObjects.Role;
using RideTogether.Models.CredentialsModel;
using RideTogether.Models.UserModel;
using RideTogether.Orchestrators.Validation.Exceptions;

namespace RideTogether.Orchestrators.User;

public class UserOrchestrator : IUserOrchestrator
{
    private readonly ILogger<UserOrchestrator> _logger;
    private readonly IMapper _mapper;
    private readonly IUserRepository _userRepository;

    public UserOrchestrator(IUserRepository userRepository, IMapper mapper, ILogger<UserOrchestrator> logger)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _logger = logger;
    }
    
    public async Task<Models.UserModel.User> RegisterAsync(SignUpModel authModel)
    {
        var isExist = await _userRepository.IsEmailExistAsync(authModel.Email);

        if (isExist)
            throw new InvalidRegistrationException(string.Format(ExceptionMessages.EmailUsed, authModel.Email));

        if (authModel.Nickname == "")
            authModel.Nickname = null;

        var isTaken = await _userRepository.IsNicknameTakenAsync(authModel.Nickname);

        if (isTaken)
            throw new Exception(string.Format(ExceptionMessages.NicknameTaken, authModel.Nickname));

        var userModel = CreateAccount(authModel, (int)BasicRoles.Admin);

        var user = await _userRepository.CreateAsync(userModel);

        _logger.LogInformation("User with email {Email} registered", authModel.Email);

        return _mapper.Map<Models.UserModel.User>(user);
    }

    public async Task<Models.UserModel.User> GetByIdAsync(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);

        if (user == null)
            throw new NotFoundException(string.Format(ExceptionMessages.NotFound, nameof(User), "Id",
                id.ToString()));

        return _mapper.Map<Models.UserModel.User>(user);
    }

    public async Task<IEnumerable<Models.UserModel.User>> GetAllAsync()
    {
        var users = await _userRepository.GetAllAsync();

        return _mapper.Map<IEnumerable<Models.UserModel.User>>(users);
    }

    public async Task DeleteByIdAsync(int userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);

        if (user == null)
            throw new NotFoundException(string.Format(ExceptionMessages.NotFound, nameof(User), "Id",
                userId.ToString()));

        await _userRepository.DeleteAsync(userId);

        _logger.LogInformation("The user {Email} has been deleted", user.Email);
    }
    
    private static Models.UserModel.User CreateAccount(SignUpModel registrationModel, int roleId)
    {
        byte[] passwordHash;
        byte[] passwordSalt;
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registrationModel.Password));
        }

        var user = new Models.UserModel.User
        {
            Email = registrationModel.Email,
            Nickname = registrationModel.Nickname,
            Credentials = new Credentials
            {
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                RoleId = roleId
            }
        };

        return user;
    }
}