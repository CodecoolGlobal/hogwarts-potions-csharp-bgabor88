using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using HogwartsPotions.Models.Enums;

namespace HogwartsPotions.Models.Entities;

public class Potion
{
    public Potion()
    {
    }

    public Potion(string name, HashSet<Ingredient> usedIngredients, Student student, HogwartsContext context)
    {
        Name = name;
        UsedIngredients = usedIngredients;
        Student = student;
        Status = context.CheckBrewingStatus(this);
    }


    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; }
    public BrewingStatus Status { get; set; }


    // Navigation properties
    public Student Student { get; set; }
    public Recipe Recipe { get; set; }
    public HashSet<Ingredient> UsedIngredients { get; set; }
}