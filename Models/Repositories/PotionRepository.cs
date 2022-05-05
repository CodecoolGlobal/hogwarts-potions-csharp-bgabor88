using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Enums;
using HogwartsPotions.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HogwartsPotions.Models.Repositories;

public class PotionRepository : IPotionRepository
{
    private readonly IRecipeRepository _recipeRepository;

    public PotionRepository(HogwartsContext context, IRecipeRepository recipeRepository)
    {
        Context = context;
        _recipeRepository = recipeRepository;
    }

    private const int MaxIngredientsForPotions = 5;
    public HogwartsContext Context { get; set; }   
    
    public async Task ModifyPotion(Potion potion, Ingredient ingredient)
    {
        if (potion != null && ingredient != null && potion.UsedIngredients.Count < MaxIngredientsForPotions)
        {
            potion.UsedIngredients.Add(ingredient);
            potion.Status = _recipeRepository.CheckBrewingStatus(potion);
            if (potion.Status == BrewingStatus.Discovery)
            {
                var newRecipe = new Recipe
                {
                    Name = $"{potion.Student.Name}'s Discovery #{_recipeRepository.CountUserRecipes(potion.Student)}",
                    Ingredients = potion.UsedIngredients,
                    Student = potion.Student
                };
                _recipeRepository.AddRecipe(newRecipe);
                potion.Recipe = newRecipe;
            }
        }

        await Context.SaveChangesAsync();
    }


    public Task<List<Potion>> GetAllPotions()
    {
        return Task.Run(() => Context.Potions
            .Include(p => p.UsedIngredients)
            .Include(p => p.Student)
            .Include(p => p.Recipe)
            .ToListAsync());
    }

    public void AddPotion(Potion potion)
    {
        Context.Potions.Add(potion);
        Context.SaveChangesAsync();
    }

    public Task<Potion> GetPotion(long potionId)
    {
        return Task.Run(() => Context.Potions
            .Include(p => p.UsedIngredients)
            .Include(p => p.Student)
            .Include(p => p.Recipe)
            .FirstOrDefaultAsync(potion => potion.Id == potionId));
    }

    public async Task DeletePotion(long id)
    {
        var potion = await GetPotion(id);
        if (potion != null)
        {
            Context.Potions.Remove(potion);
            await Context.SaveChangesAsync();
        }
    }
}