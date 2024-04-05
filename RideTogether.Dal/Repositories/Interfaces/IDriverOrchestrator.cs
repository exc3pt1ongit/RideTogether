using RideTogether.Dal.Filters;
using RideTogether.Models.PersonModel;

namespace RideTogether.Dal.Repositories.Interfaces;

public interface IDriverOrchestrator
{
    Task<List<Driver>> GetAllAsync();
    Task<Driver> GetByIdAsync(int id);
    Task<Driver> CreateAsync(Driver driver);
    Task<Driver> UpdateAsync(int id, Driver driverToUpdate);
    Task<Driver> DeleteAsync(int id);
    List<Driver> FindDataByFilter(List<Driver>? entities, DriverFilterDto? filter);
}