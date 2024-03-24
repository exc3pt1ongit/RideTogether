﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using RideTogether.Dal.Person;
using RideTogether.Dal.Route;

namespace RideTogether.Dal.Trip;

[Table("Trips")]
public class TripDao
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("id")] public int Id { get; set; }

    // [AllowNull]
    // [Column("route_id")] public RouteDao Route { get; set; }

    [Required]
    [Column("price")] public double Price { get; set; }

    [Required]
    [Column("date")] public DateTime Date { get; set; }

    [Required]
    [Column("passengers_count")] public int PassengersCount { get; set; }

    // [Column("driver_id")]
    // [AllowNull]
    // public DriverDao Driver { get; set; }
}