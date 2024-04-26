namespace RideTogether.Orchestrators.Trip.Model;

public class Trip
{
    public int Id { get; set; }
    public int DriverId { get; set; }
    public TripStatuses Status { get; set; }
    
    public decimal Price { get; set; }
    public double Distance { get; set; }
    public string StartTime { get; set; }
    public string EndTime { get; set; }
    
    public Place.Place Source { get; set; }
    public Place.Place Destination { get; set; }

    public List<int> Travelers { get; set; }
}