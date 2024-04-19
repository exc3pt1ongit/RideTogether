using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using RideTogether.Api.Filters;
using RideTogether.Orchestrators.User;
using RideTogether.Orchestrators.User.Model;

namespace RideTogether.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[UserExceptionFilter]
public class UsersController : ControllerBase
{
    private readonly IUserOrchestrator _userOrchestrator;

    public UsersController(IUserOrchestrator userOrchestrator)
    {
        _userOrchestrator = userOrchestrator;
    }
    
    [HttpGet]
    // [Authorize(Roles = "admin")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<User>))]
    public async Task<ActionResult<IEnumerable<User>>> GetAllAsync()
    {
        var users = await _userOrchestrator.GetAllAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
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
        var user = await _userOrchestrator.RegisterAsync(request);
        return CreatedAtAction(nameof(Register), new { id = user.Id }, user);
    }

    [HttpDelete("{id}")]
    // [Authorize(Roles = "admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    // [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
    public async Task<ActionResult> DeleteUser(int id)
    {
        await _userOrchestrator.DeleteByIdAsync(id);

        return NoContent();
    }
}