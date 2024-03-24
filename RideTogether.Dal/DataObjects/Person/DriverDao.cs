using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using RideTogether.Dal.DataObjects.Trip;

namespace RideTogether.Dal.DataObjects.Person;

[Table("Drivers")]
public class DriverDao
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("id")] public int Id { get; set; }
    
    [Required]
    [MaxLength(255)]
    [Column("username")] public string Username { get; set; }
    
    [MaxLength(255)]
    [Column("screen_name")] public string ScreenName { get; set; }
    
    [Column("age")] public int Age { get; set; }
    
    [AllowNull]
    [Column("trips")] public List<TripDao> Trips { get; set; }
}