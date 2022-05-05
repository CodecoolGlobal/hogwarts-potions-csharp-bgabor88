using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Enums;

namespace HogwartsPotions.Models.Interfaces;

public interface IRecipeRepository
{
    public Task<List<Recipe>> GetRecipesByIngredients(HashSet<Ingredient> potionUsedIngredients);
    public int CountUserRecipes(Student student);
    public BrewingStatus CheckBrewingStatus(Potion potion);
    public Task<List<Recipe>> GetAllRecipe();
    public void AddRecipe(Recipe recipe);
    public Task<Recipe> GetRecipe(long id);
    public Task UpdateRecipe(Recipe updatedRecipe);
    public void DeleteRecipe(long id);
}