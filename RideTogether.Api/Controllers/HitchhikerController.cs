using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RideTogether.Models.PersonModel;
using RideTogether.Models.PersonModel.Interfaces;
using RideTogether.Orchestrators.Contracts.Hitchhiker;

namespace RideTogether.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HitchhikerController : ControllerBase
{
    private readonly IHitchhikerOrchestrator _hitchhikerOrchestrator;
    private readonly IMapper _mapper;

    public HitchhikerController(IMapper mapper, IHitchhikerOrchestrator hitchhikerOrchestrator)
    {
        _mapper = mapper;
        _hitchhikerOrchestrator = hitchhikerOrchestrator;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Hitchhiker>>> Get()
    {
        var hitchhikers = await _hitchhikerOrchestrator.GetAllAsync();
        return Ok(hitchhikers);
    }
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var hitchhiker = await _hitchhikerOrchestrator.GetByIdAsync(id);
        return Ok(hitchhiker);
    }
    
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateHitchhikerRequest hitchhikerRequest)
    {
        var hitchhiker = _mapper.Map<Hitchhiker>(hitchhikerRequest);
        var createdHitchhiker = await _hitchhikerOrchestrator.CreateAsync(hitchhiker);
        return Ok(createdHitchhiker);
    }
    
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, [FromBody] UpdateHitchhikerRequest hitchhikerRequest)
    {
        var hitchhiker = _mapper.Map<Hitchhiker>(hitchhikerRequest);
        hitchhiker.Id = id;
        var updatedHitchhiker = await _hitchhikerOrchestrator.UpdateAsync(id, hitchhiker);

        return Ok(updatedHitchhiker);
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deletedHitchhiker = await _hitchhikerOrchestrator.DeleteAsync(id);
        return Ok(deletedHitchhiker);
    }
}