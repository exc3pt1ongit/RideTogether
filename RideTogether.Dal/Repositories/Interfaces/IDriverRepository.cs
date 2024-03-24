using RideTogether.Dal.Filters;
using RideTogether.Models.Person;

namespace RideTogether.Dal.Repositories.Interfaces;

public interface IDriverRepository
{
    Task<List<Driver>> GetAllAsync();
    Task<Driver> GetByIdAsync(int id);
    Task<Driver> CreateAsync(Driver driver);
    Task<Driver> UpdateAsync(Driver driver);
    Task DeleteAsync(int id);
    List<Driver> FindDataByFilter(List<Driver>? entities, DriverFilterDto? filter);
}