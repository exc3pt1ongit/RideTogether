namespace RideTogether.Models.PersonModel.Interfaces;

public interface IHitchhikerRepository
{
    Task<List<Hitchhiker>> GetAllAsync();
    Task<Hitchhiker> GetByIdAsync(int id);
    Task<Hitchhiker> CreateAsync(Hitchhiker hitchhiker);
    Task<Hitchhiker> UpdateAsync(Hitchhiker hitchhiker);
    Task DeleteAsync(int id);
}