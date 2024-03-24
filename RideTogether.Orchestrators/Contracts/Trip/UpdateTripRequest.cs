using System.ComponentModel.DataAnnotations;

namespace RideTogether.Orchestrators.Contracts.Trip;

public class UpdateTripRequest
{
    [Required(ErrorMessage = "Price is required")]
    public double Price { get; set; }
    
    [Required(ErrorMessage = "Date is required")]
    public DateTime Date { get; set; }
    
    [Required(ErrorMessage = "Passengers count is required")]
    public int PassengersCount { get; set; }
}