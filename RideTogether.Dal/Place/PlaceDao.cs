namespace RideTogether.Dal.Trip;

public class PlaceDao : BaseDao
{
    public string Name { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}