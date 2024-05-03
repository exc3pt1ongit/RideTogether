namespace RideTogether.Orchestrators.Trip.Model.Requests;

public class UpdateTripRequest
{
    public TripStatuses Status { get; set; }
    public decimal Price { get; set; }
    public TripAmenities Amenities { get; set; }
}