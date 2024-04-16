using RideTogether.Orchestrators.Trip.Model;

namespace RideTogether.Orchestrators.Trip;

public interface ITripOrchestrator
{
    Task<IEnumerable<Model.Trip>> GetAllAsync();
    Task<Model.Trip> GetByIdAsync(int id);
    Task<Model.Trip> CreateAsync(CreateTripRequest request);
    Task DeleteByIdAsync(int tripId);
}