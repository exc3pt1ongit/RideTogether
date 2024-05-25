namespace RideTogether.Dal.Trip;

public class TripDao : BaseDao
{
    public int DriverId { get; set; }
    public TripStatuses Status { get; set; }
    public decimal Price { get; set; }
    
    public double Distance { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    
    public PlaceDao Source { get; set; }
    public PlaceDao Destination { get; set; }
    public TripAmenities Amenities { get; set; }
    
    public string Description { get; set; }

    // public List<int> Travelers { get; set; }
}