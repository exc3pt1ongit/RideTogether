using RideTogether.Dal.Trip.Filtering;

namespace RideTogether.Dal.Trip;

public interface ITripRepository
{
    Task<List<TripDao>> GetAllAsync();
    Task<List<TripDao>> GetFilteredAsync(TripFilter filter);
    Task<TripDao?> GetByIdAsync(int id);
    Task<TripDao> CreateAsync(TripDao entity);
    Task<TripDao> UpdateAsync(TripDao entity);
    Task DeleteAsync(int id);

    Task<bool> IsTripExistAsync(int driverId, (double Lat, double Lng) source, (double Lat, double Lng) destination);
}