using Microsoft.AspNetCore.Mvc;
using RideTogether.Models.AuthModel;

namespace RideTogether.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly IAuthOrchestrator _authOrchestrator;

    public LoginController(IAuthOrchestrator authOrchestrator)
    {
        _authOrchestrator = authOrchestrator;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
    // [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorDetails))]
    // [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Login(LoginRequest model)
    {
        var authToken = await _authOrchestrator.GetTokenAsync(model);

        return Ok(authToken.Token);
    }
}