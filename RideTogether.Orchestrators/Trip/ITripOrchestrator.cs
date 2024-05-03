using RideTogether.Dal;
using RideTogether.Orchestrators.Trip.Model;
using RideTogether.Orchestrators.Trip.Model.Requests;

namespace RideTogether.Orchestrators.Trip;

public interface ITripOrchestrator
{
    Task<IEnumerable<TripResponseDto>> GetAllAsync();
    Task<ListResponseDto<TripResponseDto>> GetFilteredAsync(GetTripsRequest request);
    Task<TripResponseDto> GetByIdAsync(int id);
    Task<TripResponseDto> CreateAsync(CreateTripRequest request);
    Task<TripResponseDto> UpdateAsync(int id, UpdateTripRequest request);
    Task<TripResponseDto> DeleteAsync(int tripId);
}