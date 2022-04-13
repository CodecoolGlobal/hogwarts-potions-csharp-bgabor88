using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HogwartsPotions.Models.Entities;

public class Recipe
{
    public Recipe()
    {

    }

    public Recipe(Student student, HogwartsContext context, HashSet<Ingredient> ingredients)
    {
        Name = $"{student.Name} discovery #{context.CountUserRecipes(student)}";
        Student = student;
        Ingredients = ingredients;
    }


    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; }


    // Navigation properties
    public Student Student { get; set; }
    public HashSet<Ingredient> Ingredients { get; set; }
}