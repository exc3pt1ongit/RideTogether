using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace RideTogether.Dal.DataObjects.City;

[Table("Cities")]
public class CityDao
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("id")] public int Id { get; set; }
    
    [AllowNull]
    [Column("name")] public string Name { get; }
    
    [Column("lat")] public double Latitude { get; }
    [Column("lng")] public double Longitude { get; }
}