using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using RideTogether.Dal.City;

namespace RideTogether.Dal.Route;

[Table("Routes")]
public class RouteDao
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("id")] public int Id { get; set; }
    
    [AllowNull]
    [Column("cities")] public List<CityDao> Cities { get; set; }
    
    [AllowNull]
    [Column("start_city")] public CityDao StartCity => Cities?[0];
    
    [AllowNull]
    [Column("end_city")] public CityDao EndCity => Cities?[^1];
}