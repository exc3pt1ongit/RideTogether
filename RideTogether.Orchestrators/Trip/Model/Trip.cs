namespace RideTogether.Orchestrators.Trip.Model;

public class Trip
{
    public int Id { get; set; }
    public int DriverId { get; set; }
    public TripStatuses Status { get; set; }
    
    public double Distance { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    
    public Place.Place SorcePlace { get; set; }
    public Place.Place DestinationPlace { get; set; }

    public List<int> Travelers { get; set; }
}