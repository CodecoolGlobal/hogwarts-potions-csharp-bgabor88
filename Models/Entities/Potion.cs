using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using HogwartsPotions.Models.Enums;

namespace HogwartsPotions.Models.Entities
{
    public class Potion
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ID { get; set; }

        public string Name { get; set; } = "DEFAULT";

        public Student Student { get; set; }

        public BrewingStatus Status { get; set; } = BrewingStatus.Brew;

        //public HashSet<long> IngredientsId { get; set; } = new HashSet<long>();
        public HashSet<Ingredient> Ingredients { get; set; } = new HashSet<Ingredient>();

        //public ICollection<PotionIngredient> PotionIngredients { get; set; }


        public Potion()
        {
        }

        //public void AddIngredient(Ingredient ingredient)
        //{
        //    Ingredients.Add(ingredient);
        //}
    }
}
