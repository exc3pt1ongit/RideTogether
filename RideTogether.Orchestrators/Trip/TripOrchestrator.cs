using AutoMapper;
using RideTogether.Models.TripModel.Interfaces;

namespace RideTogether.Orchestrators.Trip;

public class TripOrchestrator : ITripOrchestrator
{
    private readonly ITripRepository _tripRepository;
    private readonly IMapper _mapper;

    public TripOrchestrator(ITripRepository tripRepository, IMapper mapper)
    {
        _tripRepository = tripRepository;
        _mapper = mapper;
    }
    
    public async Task<List<Models.TripModel.Trip>> GetAllAsync()
    {
        return await _tripRepository.GetAllAsync();
    }

    public async Task<Models.TripModel.Trip> GetByIdAsync(int id)
    {
        var trip = await _tripRepository.GetByIdAsync(id);
        if (trip == null)
            throw new Exception($"Trip with id {id} not found");
        return trip;
    }

    public async Task<Models.TripModel.Trip> CreateAsync(Models.TripModel.Trip trip)
    {
        return await _tripRepository.CreateAsync(trip);
    }

    public async Task<Models.TripModel.Trip> UpdateAsync(int id, Models.TripModel.Trip tripToUpdate)
    {
        var trip = await GetByIdAsync(id);
        trip = _mapper.Map(tripToUpdate, trip);
        return await _tripRepository.UpdateAsync(trip);
    }

    public async Task<Models.TripModel.Trip> DeleteAsync(int id)
    {
        var trip = await GetByIdAsync(id);
        await _tripRepository.DeleteAsync(id);
        return trip;
    }
}