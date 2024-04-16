using Microsoft.AspNetCore.Mvc;
using RideTogether.Orchestrators.Trip;
using RideTogether.Orchestrators.Trip.Model;

namespace RideTogether.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TripsController : ControllerBase
{
    private readonly ITripOrchestrator _tripOrchestrator;

    public TripsController(ITripOrchestrator tripOrchestrator)
    {
        _tripOrchestrator = tripOrchestrator;
    }
    
    [HttpGet]
    // [Authorize(Roles = "admin")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Trip>))]
    public async Task<ActionResult<IEnumerable<Trip>>> GetAllAsync()
    {
        var trips = await _tripOrchestrator.GetAllAsync();
        return Ok(trips);
    }
    
    [HttpGet("{id}")]
    // [Authorize(Roles = "admin")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Trip))]
    // [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
    public async Task<ActionResult<Trip>> GetById(int id)
    {
        var trip = await _tripOrchestrator.GetByIdAsync(id);
        return Ok(trip);
    }
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Trip))]
    // [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorDetails))]
    public async Task<ActionResult<Trip>> Create([FromBody] CreateTripRequest request)
    {
        var trip = await _tripOrchestrator.CreateAsync(request);
        return CreatedAtAction(nameof(Create), new { id = trip.Id }, trip);
    }
    
    [HttpDelete("{id}")]
    // [Authorize(Roles = "admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    // [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
    public async Task<ActionResult> DeleteUser(int id)
    {
        await _tripOrchestrator.DeleteByIdAsync(id);
        return NoContent();
    }
}