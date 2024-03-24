namespace RideTogether.Models.Person.Interfaces;

public interface IDriverRepository
{
    Task<List<Driver>> GetAllAsync();
    Task<Driver> GetByIdAsync(int id);
    Task<Driver> CreateAsync(Driver driver);
    Task<Driver> UpdateAsync(Driver driver);
    Task DeleteAsync(int id);
}