using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using HogwartsPotions.Models.Enums;

namespace HogwartsPotions.Models.Entities;

public class Potion
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; } = "DEFAULT";
    public BrewingStatus Status { get; set; } = BrewingStatus.Brew;


    public Student Student { get; set; }
    public HashSet<Ingredient> Ingredients { get; set; } = new HashSet<Ingredient>();


    public Potion()
    {
    }
}