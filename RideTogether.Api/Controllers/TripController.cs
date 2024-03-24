using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RideTogether.Models.TripModel;
using RideTogether.Models.TripModel.Interfaces;
using RideTogether.Orchestrators.Contracts.Trip;

namespace RideTogether.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TripController : ControllerBase
{
    private readonly ITripOrchestrator _tripOrchestrator;
    private readonly IMapper _mapper;

    public TripController(IMapper mapper, ITripOrchestrator tripOrchestrator)
    {
        _mapper = mapper;
        _tripOrchestrator = tripOrchestrator;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Trip>>> Get()
    {
        var trips = await _tripOrchestrator.GetAllAsync();
        return Ok(trips);
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var trip = await _tripOrchestrator.GetByIdAsync(id);
        return Ok(trip);
    }
    
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateTripRequest tripRequest)
    {
        var trip = _mapper.Map<Trip>(tripRequest);
        var createdTrip = await _tripOrchestrator.CreateAsync(trip);
        return Ok(createdTrip);
    }
    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, [FromBody] UpdateTripRequest tripRequest)
    {
        var trip = _mapper.Map<Trip>(tripRequest);
        trip.Id = id;
        var updatedTrip = await _tripOrchestrator.UpdateAsync(id, trip);
        return Ok(updatedTrip);
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deletedTrip = await _tripOrchestrator.DeleteAsync(id);
        return Ok(deletedTrip);
    }
}