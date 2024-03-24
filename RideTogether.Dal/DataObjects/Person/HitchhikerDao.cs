using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RideTogether.Dal.DataObjects.Person;

[Table("Hitchhikers")]
public class HitchhikerDao
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
}