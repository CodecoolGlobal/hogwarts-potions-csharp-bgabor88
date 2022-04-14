using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HogwartsPotions.Models.Entities;

public class Recipe
{
    public Recipe()
    {

    }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; }

    // Navigation properties
    public Student Student { get; set; }
    public HashSet<Ingredient> Ingredients { get; set; } = new();
}