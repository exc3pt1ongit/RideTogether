namespace RideTogether.Dal.Trip;

public class TripDao : BaseDao
{
    public int DriverId { get; set; }
    public TripStatuses Status { get; set; }
    
    public double Distance { get; set; }
    public string StartTime { get; set; }
    public string EndTime { get; set; }
    
    public PlaceDao SorcePlace { get; set; }
    public PlaceDao DestinationPlace { get; set; }

    public List<int> Travelers { get; set; }
}