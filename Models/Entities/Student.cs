using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using HogwartsPotions.Models.Enums;

namespace HogwartsPotions.Models.Entities;

public class Student
{
    public Student(string name, HouseType houseType, PetType petType)
    {
        Name = name;
        HouseType = houseType;
        PetType = petType;
        Recipes = new HashSet<Recipe>();
        Potions = new HashSet<Potion>();
    }


    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; }


    public HouseType HouseType { get; set; }
    public PetType PetType { get; set; }


    // Navigation properties
    public HashSet<Recipe> Recipes { get; set; }
    public HashSet<Potion> Potions { get; set; }
    public Room Room { get; set; }
    
}