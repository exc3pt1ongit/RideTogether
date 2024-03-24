using System.ComponentModel.DataAnnotations;

namespace RideTogether.Orchestrators.Contracts.Hitchhiker;

public class CreateHitchhikerRequest
{
    [Required(ErrorMessage = "Username is required")]
    public string Username { get; set; }
    
    [Required(ErrorMessage = "Screen name is required")]
    public string ScreenName { get; set; }
    
    [Required(ErrorMessage = "Age is required")]
    public int Age { get; set; }
}