using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using HogwartsPotions.Models.Enums;

namespace HogwartsPotions.Models.Entities;

public class Student
{
    public Student()
    {
    }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; }

    public HouseType HouseType { get; set; }
    public PetType PetType { get; set; }

    // Navigation properties
    public HashSet<Recipe> Recipes { get; set; } = new();
    public HashSet<Potion> Potions { get; set; } = new();
    public Room Room { get; set; }
    
}