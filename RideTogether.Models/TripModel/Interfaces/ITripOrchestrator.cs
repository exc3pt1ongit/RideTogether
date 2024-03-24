namespace RideTogether.Models.TripModel.Interfaces;

public interface ITripOrchestrator
{
    Task<List<Trip>> GetAllAsync();
    Task<Trip> GetByIdAsync(int id);
    Task<Trip> CreateAsync(Trip trip);
    Task<Trip> UpdateAsync(int id, Trip tripToUpdate);
    Task<Trip> DeleteAsync(int id);
}