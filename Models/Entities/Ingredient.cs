using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HogwartsPotions.Models.Entities;

public class Ingredient
{ 
    public Ingredient(string name)
    {
        Name = name;
    }


    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; }


    //Navigation properties
    public HashSet<Potion> Potions { get; set; }
    public HashSet<Recipe> Recipes { get; set; }
}