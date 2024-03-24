using RideTogether.Models.RouteModel;

namespace RideTogether.Models.TripModel;

public class Trip
{
    public int Id { get; set; }
    public Route? Route { get; set; }
    public double Price { get; set; }
    public DateTime Date { get; set; }
    public int PassengersCount { get; set; }
    // public Driver Driver { get; set; }
}