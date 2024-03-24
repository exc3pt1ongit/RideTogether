namespace RideTogether.Dal.Filters;

public class DriverFilterDto
{
    public int? MinAge { get; set; }
    public int? MaxAge { get; set; }
    public int? MinTrips { get; set; }
}