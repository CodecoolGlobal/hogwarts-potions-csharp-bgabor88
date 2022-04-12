using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HogwartsPotions.Models.Entities;

public class Ingredient
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long ID { get; set; }

    public string Name { get; set; }

    //public virtual HashSet<Potion> Potions { get; set; }

    //public ICollection<PotionIngredient> PotionIngredients { get; set; }

}