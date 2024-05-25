namespace RideTogether.Orchestrators.Trip.Model;

public class TripResponseDto
{
    public int Id { get; set; }
    public int DriverId { get; set; }
    public TripStatuses Status { get; set; }
    
    public decimal Price { get; set; }
    public double Distance { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    
    public Place.Place Source { get; set; }
    public Place.Place Destination { get; set; }
    public TripAmenities Amenities { get; set; }
    
    public string Description { get; set; }

    // public List<int> Travelers { get; set; }
}