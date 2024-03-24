using AutoMapper;
using RideTogether.Models.PersonModel;
using RideTogether.Models.PersonModel.Interfaces;

namespace RideTogether.Orchestrators.Person;

public class HitchhikerOrchestrator : IHitchhikerOrchestrator
{
    private readonly IHitchhikerRepository _hitchhikerRepository;
    private readonly IMapper _mapper;
    
    public HitchhikerOrchestrator(IHitchhikerRepository hitchhikerRepository, IMapper mapper)
    {
        _hitchhikerRepository = hitchhikerRepository;
        _mapper = mapper;
    }
    
    public async Task<List<Hitchhiker>> GetAllAsync()
    {
        return await _hitchhikerRepository.GetAllAsync();
    }
    
    public async Task<Hitchhiker> GetByIdAsync(int id)
    {
        var hitchhiker = await _hitchhikerRepository.GetByIdAsync(id);
        if (hitchhiker == null)
            throw new Exception($"Hitchhiker with ID {id} not found");
        return hitchhiker;
    }

    public async Task<Hitchhiker> CreateAsync(Hitchhiker hitchhiker)
    {
        return await _hitchhikerRepository.CreateAsync(hitchhiker);
    }

    public async Task<Hitchhiker> UpdateAsync(int id, Hitchhiker hitchhikerToUpdate)
    {
        var hitchhiker = await GetByIdAsync(id);
        hitchhiker = _mapper.Map(hitchhikerToUpdate, hitchhiker);
        return await _hitchhikerRepository.UpdateAsync(hitchhiker);
    }

    public async Task<Hitchhiker> DeleteAsync(int id)
    {
        var hitchhiker = await GetByIdAsync(id);
        await _hitchhikerRepository.DeleteAsync(id);
        return hitchhiker;
    }
}