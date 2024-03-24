namespace RideTogether.Models.RouteModel;

public class Route
{
    private List<City.City?>? Cities { get; set; }
    public City.City? StartCity => Cities?[0];
    public City.City? EndCity => Cities?[^1];
}