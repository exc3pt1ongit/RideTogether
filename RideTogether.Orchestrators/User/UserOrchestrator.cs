using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Microsoft.Extensions.Logging;
using RideTogether.Dal.Role;
using RideTogether.Dal.User;
using RideTogether.Orchestrators.User.Model;
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
    
    public async Task<Model.User> RegisterAsync(SignUpRequest request)
    {
        var isExist = await _userRepository.IsEmailExistAsync(request.Email);

        if (isExist)
            throw new InvalidRegistrationException(string.Format(ExceptionMessages.EmailUsed, request.Email));

        if (request.Nickname == "") request.Nickname = null;

        var isTaken = await _userRepository.IsNicknameTakenAsync(request.Nickname);

        if (isTaken) throw new Exception(string.Format(ExceptionMessages.NicknameTaken, request.Nickname));

        var userModel = CreateAccount(request, (int)BasicRoles.Admin);

        var user = await _userRepository.CreateAsync(_mapper.Map<UserDao>(userModel));

        _logger.LogInformation("User with email {Email} registered", request.Email);

        return _mapper.Map<Model.User>(user);
    }

    public async Task<Model.User> GetByIdAsync(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null)
            throw new NotFoundException(string
                .Format(ExceptionMessages.NotFound, nameof(Model.User), "Id", id.ToString()));
        return _mapper.Map<Model.User>(user);
    }

    public async Task<IEnumerable<Model.User>> GetAllAsync()
    {
        var users = await _userRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<Model.User>>(users);
    }

    public async Task DeleteByIdAsync(int userId)
    {
        var user = await _userRepository.GetByIdAsync(userId);

        if (user == null)
            throw new NotFoundException(string.Format(ExceptionMessages.NotFound, nameof(Model.User), "Id",
                userId.ToString()));

        await _userRepository.DeleteAsync(userId);

        _logger.LogInformation("The user {Email} has been deleted", user.Email);
    }
    
    private static Model.User CreateAccount(SignUpRequest request, int roleId)
    {
        byte[] passwordHash;
        byte[] passwordSalt;
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password));
        }

        var user = new Model.User
        {
            Email = request.Email,
            Nickname = request.Nickname,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Credentials = new Credentials.Credentials
            {
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                RoleId = roleId
            }
        };

        return user;
    }
}