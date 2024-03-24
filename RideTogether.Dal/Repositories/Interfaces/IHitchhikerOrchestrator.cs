namespace RideTogether.Models.PersonModel.Interfaces;

public interface IHitchhikerOrchestrator
{
    Task<List<Hitchhiker>> GetAllAsync();
    Task<Hitchhiker> GetByIdAsync(int id);
    Task<Hitchhiker> CreateAsync(Hitchhiker hitchhiker);
    Task<Hitchhiker> UpdateAsync(int id, Hitchhiker hitchhikerToUpdate);
    Task<Hitchhiker> DeleteAsync(int id);
}