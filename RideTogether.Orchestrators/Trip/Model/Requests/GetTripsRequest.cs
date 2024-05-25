namespace RideTogether.Orchestrators.Trip.Model.Requests;

public class GetTripsRequest
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    
    public double? SourceLat { get; set; }
    public double? SourceLng { get; set; }
    
    public double? DestinationLat { get; set; }
    public double? DestinationLng { get; set; }
    
    public DateTime? TripDate { get; set; }
    
    public int? CreatedBy { get; set; }
    public string? MainFilter { get; set; }
    
    public bool? DepartureSixToNoon { get; set; }
    public bool? DepartureNoonToSix { get; set; }
    public bool? DepartureAfterSixPm { get; set; }
    
    public TripAmenities? Amenities { get; set; }
}