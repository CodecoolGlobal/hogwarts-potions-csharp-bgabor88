using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HogwartsPotions.Models.Repositories;

public class IngredientRepository : IIngredientRepository
{
    public IngredientRepository(HogwartsContext context)
    {
        Context = context;
    }

    public HogwartsContext Context { get; set; }
    

    public Task<List<Ingredient>> GetAllIngredients()
    {
        return Task.Run(() => Context.Ingredients
            .ToListAsync());
    }

    public void AddIngredient(Ingredient ingredient)
    {
        Context.Ingredients.Add(ingredient);
        Context.SaveChangesAsync();
    }

    public Task<Ingredient> GetIngredient(long id)
    {
        return Task.Run(() => Context.Ingredients
            .FirstOrDefaultAsync(ingredient => ingredient.Id == id));
    }

    public void UpdateIngredient(Ingredient updatedIngredient)
    {
        Context.Ingredients.Update(updatedIngredient);
        Context.SaveChangesAsync();
    }

    public void DeleteIngredient(long id)
    {
        var ingredientToDelete = GetIngredient(id).Result;
        if (ingredientToDelete != null)
        {
            Context.Ingredients.Remove(ingredientToDelete);
            Context.SaveChangesAsync();
        }
    }
}