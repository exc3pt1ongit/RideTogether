namespace RideTogether.Orchestrators.Trip.Model.Requests;

public class CreateTripRequest
{
    public int DriverId { get; set; }
    public DateTime StartTime { get; set; }
    public Place.Place Source { get; set; }
    public Place.Place Destination { get; set; }
    public decimal Price { get; set; }
    public TripAmenities Amenities { get; set; }
    public string Description { get; set; }
}