namespace RideTogether.Models.TripModel.Interfaces;

public interface ITripRepository
{
    Task<List<Trip>> GetAllAsync();
    Task<Trip> GetByIdAsync(int id);
    Task<Trip> CreateAsync(Trip trip);
    Task<Trip> UpdateAsync(Trip trip);
    Task DeleteAsync(int id);
}