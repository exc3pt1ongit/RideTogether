using RideTogether.Dal.Paging;

namespace RideTogether.Dal.Trip.Filtering;

public class TripFilter : PagingFilteringParameters
{
    public string MainFilter { get; set; }
    
    public bool? DepartureSixToNoon { get; set; }
    public bool? DepartureNoonToSix { get; set; }
    public bool? DepartureAfterSixPm { get; set; }
    
    public TripAmenities? Amenities { get; set; }
}