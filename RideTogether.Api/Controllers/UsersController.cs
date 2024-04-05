using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RideTogether.Models.UserModel;
using RideTogether.Orchestrators.Contracts.User;

namespace RideTogether.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserOrchestrator _userOrchestrator;
    private readonly IMapper _mapper;

    public UsersController(IUserOrchestrator userOrchestrator, IMapper mapper)
    {
        _userOrchestrator = userOrchestrator;
        _mapper = mapper;
    }
    
    [HttpGet]
    // [Authorize(Roles = "admin")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<User>))]
    public async Task<ActionResult<IEnumerable<User>>> GetAllAsync()
    {
        var users = await _userOrchestrator.GetAllAsync();

        return Ok(users);
    }

    [HttpGet("{id:int}")]
    // [Authorize(Roles = "admin")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(User))]
    // [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
    public async Task<ActionResult<User>> GetById(int id)
    {
        var user = await _userOrchestrator.GetByIdAsync(id);

        return Ok(user);
    }

    [HttpPost]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(User))]
    // [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorDetails))]
    public async Task<ActionResult<User>> Register([FromBody] SignUpRequest request)
    {
        var user = await _userOrchestrator.RegisterAsync(_mapper.Map<SignUpModel>(request));

        return CreatedAtAction(nameof(Register), new { id = user.Id }, user);
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    // [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
    public async Task<ActionResult> DeleteUser(int id)
    {
        await _userOrchestrator.DeleteByIdAsync(id);

        return NoContent();
    }
}