namespace RideTogether.Orchestrators.Trip.Model;

public class TripAmenities
{
    public bool? MaximumTwoPeopleBackSeat { get; set; }
    public bool? CanSmoke { get; set; }
    public bool? PetsAllowed { get; set; }
    public bool? Wifi { get; set; }
    public bool? AirConditioning { get; set; }
    
    public TripAmenities(bool? maximumTwoPeopleBackSeat = null, bool? canSmoke = null, bool? petsAllowed = null, bool? wifi = null, bool? airConditioning = null)
    {
        MaximumTwoPeopleBackSeat = maximumTwoPeopleBackSeat;
        CanSmoke = canSmoke;
        PetsAllowed = petsAllowed;
        Wifi = wifi;
        AirConditioning = airConditioning;
    }

    public TripAmenities()
    {
        
    }
}