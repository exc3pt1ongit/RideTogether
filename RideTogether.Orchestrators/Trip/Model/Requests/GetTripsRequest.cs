namespace RideTogether.Orchestrators.Trip.Model.Requests;

public class GetTripsRequest
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    
    public string? MainFilter { get; set; }
    
    public bool? DepartureSixToNoon { get; set; }
    public bool? DepartureNoonToSix { get; set; }
    public bool? DepartureAfterSixPm { get; set; }
    
    public TripAmenities? Amenities { get; set; }
}