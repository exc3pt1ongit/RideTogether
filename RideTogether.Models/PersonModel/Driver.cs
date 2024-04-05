using RideTogether.Models.TripModel;

namespace RideTogether.Models.PersonModel;

public class Driver
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? ScreenName { get; set; }
    public int Age { get; set; }
    public List<Trip>? Trips { get; set; }
}