namespace RideTogether.Orchestrators.Trip.Model;

public class CreateTripRequest
{
    public int DriverId { get; set; }
    public Place.Place Source { get; set; }
    public Place.Place Destination { get; set; }
    public decimal Price { get; set; }
}