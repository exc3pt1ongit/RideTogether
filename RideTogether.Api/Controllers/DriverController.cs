using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RideTogether.Models.Person;
using RideTogether.Models.Person.Interfaces;
using RideTogether.Orchestrators.Contracts.Driver;

namespace RideTogether.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DriverController : ControllerBase
{
    private readonly IDriverOrchestrator _driverOrchestrator;
    private readonly IMapper _mapper;

    public DriverController(IMapper mapper, IDriverOrchestrator driverOrchestrator)
    {
        _mapper = mapper;
        _driverOrchestrator = driverOrchestrator;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Driver>>> Get(string? minAgeFilter = null)
    {
        var drivers = await _driverOrchestrator.GetAllAsync();
        
        var minAgeParsed = sbyte.TryParse(minAgeFilter, out var minAgeValue);
        if (minAgeFilter != null && minAgeParsed)
            drivers = drivers.Where(d => d.Age >= minAgeValue).ToList();
        
        return Ok(drivers);
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var driver = await _driverOrchestrator.GetByIdAsync(id);
        return Ok(driver);
    }
    
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateDriverRequest driverRequest)
    {
        var driver = _mapper.Map<Driver>(driverRequest);
        var createdDriver = await _driverOrchestrator.CreateAsync(driver);
        return Ok(createdDriver);
    }
    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, [FromBody] UpdateDriverRequest driverRequest)
    {
        var driver = _mapper.Map<Driver>(driverRequest);
        driver.Id = id;
        var updatedDriver = await _driverOrchestrator.UpdateAsync(id, driver);

        return Ok(updatedDriver);
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deletedDriver = await _driverOrchestrator.DeleteAsync(id);
        return Ok(deletedDriver);
    }
}