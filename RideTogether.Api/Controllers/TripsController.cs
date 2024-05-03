using Microsoft.AspNetCore.Mvc;
using RideTogether.Dal;
using RideTogether.Orchestrators.Trip;
using RideTogether.Orchestrators.Trip.Model;
using RideTogether.Orchestrators.Trip.Model.Requests;

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
    
    // [HttpGet]
    // // [Authorize(Roles = "admin")]
    // [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Trip>))]
    // public async Task<ActionResult<IEnumerable<Trip>>> GetAllAsync()
    // {
    //     var trips = await _tripOrchestrator.GetAllAsync();
    //     return Ok(trips);
    // }
    
    [HttpGet]
    public async Task<ActionResult<ListResponseDto<TripResponseDto>>> Get([FromQuery] GetTripsRequest request)
    {
        var trips = await _tripOrchestrator.GetFilteredAsync(request);
        return Ok(trips);
    }
    
    // [HttpGet("{id}")]
    // // [Authorize(Roles = "admin")]
    // [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Trip))]
    // // [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
    // public async Task<ActionResult<Trip>> GetById(int id)
    // {
    //     var trip = await _tripOrchestrator.GetByIdAsync(id);
    //     return Ok(trip);
    // }
    
    [HttpGet("{id:int}")]
    public async Task<ActionResult<TripResponseDto>> GetById(int id)
    {
        var trip = await _tripOrchestrator.GetByIdAsync(id);
        if (trip == null) return NotFound();
        return Ok(trip);
    }
    
    // [HttpPost]
    // [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Trip))]
    // // [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorDetails))]
    // public async Task<ActionResult<Trip>> Create([FromBody] CreateTripRequest request)
    // {
    //     var trip = await _tripOrchestrator.CreateAsync(request);
    //     return CreatedAtAction(nameof(Create), new { id = trip.Id }, trip);
    // }
    
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateTripRequest request)
    {
        var createdModel = await _tripOrchestrator.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = createdModel.Id }, createdModel);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] UpdateTripRequest request)
    {
        var updatedModel = await _tripOrchestrator.UpdateAsync(id, request);
        if (updatedModel == null) return NotFound();
        return Ok(updatedModel);
    }
    
    // [HttpDelete("{id}")]
    // // [Authorize(Roles = "admin")]
    // [ProducesResponseType(StatusCodes.Status204NoContent)]
    // // [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorDetails))]
    // public async Task<ActionResult> DeleteUser(int id)
    // {
    //     await _tripOrchestrator.DeleteAsync(id);
    //     return NoContent();
    // }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _tripOrchestrator.DeleteAsync(id);
        return Ok();
    }
}