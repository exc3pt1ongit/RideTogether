namespace RideTogether.Dal.Trip;

public class TripRepository : ITripRepository
{
    private readonly RideTogetherDbContext _dbContext;

    public TripRepository(RideTogetherDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public Task<List<TripDao>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<TripDao> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<TripDao> CreateAsync(TripDao entity)
    {
        throw new NotImplementedException();
    }

    public Task<TripDao> UpdateAsync(TripDao entity)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}