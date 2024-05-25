using RideTogether.Dal.Paging;

namespace RideTogether.Dal.Trip.Filtering;

public class TripFilter : PagingFilteringParameters
{
    public int? CreatedBy { get; set; }
    
    public double SourceLat { get; set; }
    public double SourceLng { get; set; }
    
    public double DestinationLat { get; set; }
    public double DestinationLng { get; set; }
    
    public DateTime TripDate { get; set; }
    
    public string MainFilter { get; set; }
    
    public bool? DepartureSixToNoon { get; set; }
    public bool? DepartureNoonToSix { get; set; }
    public bool? DepartureAfterSixPm { get; set; }
    
    public TripAmenities? Amenities { get; set; }
}