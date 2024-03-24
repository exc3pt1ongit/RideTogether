namespace RideTogether.Models.Person;

public class Driver
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? ScreenName { get; set; }
    public int Age { get; set; }
    
    public List<TripModel.Trip> Trips { get; set; }
}