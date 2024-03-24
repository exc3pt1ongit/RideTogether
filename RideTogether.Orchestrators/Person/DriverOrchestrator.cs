using AutoMapper;
using RideTogether.Dal.Filters;
using RideTogether.Dal.Repositories.Interfaces;
using RideTogether.Models.Person;

namespace RideTogether.Orchestrators.Person;

public class DriverOrchestrator : IDriverOrchestrator
{
    private readonly IDriverRepository _driverRepository;
    private readonly IMapper _mapper;

    public DriverOrchestrator(IDriverRepository driverRepository, IMapper mapper)
    {
        _driverRepository = driverRepository;
        _mapper = mapper;
    }
    
    public async Task<List<Driver>> GetAllAsync()
    {
        return await _driverRepository.GetAllAsync();
    }

    public async Task<Driver> GetByIdAsync(int id)
    {
        var driver = await _driverRepository.GetByIdAsync(id);
        if (driver == null)
            throw new Exception($"Driver with ID {id} not found");
        return driver;
    }

    public async Task<Driver> CreateAsync(Driver driver)
    {
        return await _driverRepository.CreateAsync(driver);
    }

    public async Task<Driver> UpdateAsync(int id, Driver driverToUpdate)
    {
        var driver = await GetByIdAsync(id);
        driver = _mapper.Map(driverToUpdate, driver);
        return await _driverRepository.UpdateAsync(driver);
    }

    public async Task<Driver> DeleteAsync(int id)
    {
        var driver = await GetByIdAsync(id);
        await _driverRepository.DeleteAsync(id);
        return driver;
    }

    public List<Driver> FindDataByFilter(List<Driver>? entities, DriverFilterDto? filter)
    {
        return _driverRepository.FindDataByFilter(entities, filter);
    }
}