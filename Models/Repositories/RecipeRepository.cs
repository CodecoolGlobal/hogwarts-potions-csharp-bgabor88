using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Enums;
using HogwartsPotions.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HogwartsPotions.Models.Repositories;

public class RecipeRepository : IRecipeRepository
{
    public RecipeRepository(HogwartsContext context)
    {
        Context = context;
    }

    private const int MaxIngredientsForPotions = 5;
    public HogwartsContext Context { get; set; }
    
    public Task<List<Recipe>> GetRecipesByIngredients(HashSet<Ingredient> potionUsedIngredients)
    {
        var recipes = GetAllRecipe().Result;
        return Task.Run(() => recipes
            .Where(recipe => recipe.Ingredients
                .IsSupersetOf(potionUsedIngredients))
            .ToList());
    }

    public int CountUserRecipes(Student student)
    {
        return Context.Recipes.Count(r => r.Student == student) + 1;
    }

    public BrewingStatus CheckBrewingStatus(Potion potion)
    {
        if (potion.UsedIngredients.Count < MaxIngredientsForPotions)
        {
            return BrewingStatus.Brew;
        }

        var recipes = GetAllRecipe().Result;
        var newRecipeIngredients = potion.UsedIngredients;
        return recipes.Select(recipe => recipe.Ingredients)
            .Any(ingredients => ingredients
                .SetEquals(newRecipeIngredients)) ? BrewingStatus.Replica : BrewingStatus.Discovery;
    }


    public Task<List<Recipe>> GetAllRecipe()
    {
        return Task.Run(() => Context.Recipes
            .Include(r => r.Ingredients)
            .Include(r => r.Student)
            .ToListAsync());
    }

    public void AddRecipe(Recipe recipe)
    {
        Context.Recipes.Add(recipe);
        Context.SaveChangesAsync();
    }

    public Task<Recipe> GetRecipe(long id)
    {
        return Task.Run(() => Context.Recipes
            .Include(r => r.Ingredients)
            .Include(r => r.Student)
            .FirstOrDefaultAsync(recipe => recipe.Id == id));
    }

    public Task UpdateRecipe(Recipe updatedRecipe)
    {
        return Task.Run(() => Context.Recipes.Update(updatedRecipe));
    }

    public void DeleteRecipe(long id)
    {
        var recipeToDelete = GetRecipe(id).Result;
        if (recipeToDelete != null)
        {
            Context.Recipes.Remove(recipeToDelete);
        }
    }

}