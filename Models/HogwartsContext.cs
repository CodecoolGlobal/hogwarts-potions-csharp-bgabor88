using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace HogwartsPotions.Models;

public class HogwartsContext : DbContext
{
    #region Properties

    public const int MaxIngredientsForPotions = 5;
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Potion> Potions { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Recipe> Recipes { get; set; }


    #endregion

    #region Constructor

    public HogwartsContext(DbContextOptions<HogwartsContext> options) : base(options)
    {
    }

    #endregion

    #region ModelCreation
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }

    #endregion

    #region RoomOperations
    public async Task AddRoom(Room room)
    {
        await Task.Run(() => Rooms.Add(room));
    }

    public Task<Room> GetRoom(long roomId)
    {
        return Task.Run(() => Rooms
            .Include(r => r.Residents)
            .FirstOrDefaultAsync(room => room.Id == roomId));
    }

    public Task<List<Room>> GetAllRooms()
    {
        return Task.Run(() => Rooms
            .Include(x => x.Residents)
            .ToListAsync());
    }

    public Task UpdateRoom(Room room)
    {
        return Task.Run(() => Rooms.Update(room));
    }

    public async Task DeleteRoom(long id)
    {
        var oldRoom = await GetRoom(id);
        if (oldRoom != null)
        {
            Rooms.Remove(oldRoom);
        }
    }

    public Task<List<Room>> GetRoomsForRatOwners()
    {
        return Task.Run(() =>
        {
            return Rooms
                .Include(r => r.Residents)
                .Where(room => room.Residents
                    .Any(student => student.PetType != PetType.Cat || student.PetType != PetType.Owl))
                .ToListAsync();
        });
    }

    #endregion

    #region PotionOperations
    public async Task ModifyPotion(Potion potion, Ingredient ingredient)
    {
        if (potion != null && ingredient != null && potion.UsedIngredients.Count < MaxIngredientsForPotions)
        {
            potion.UsedIngredients.Add(ingredient);
            potion.Status = CheckBrewingStatus(potion);
            if (potion.Status == BrewingStatus.Discovery)
            {
                var newRecipe = new Recipe
                {
                    Name = $"{potion.Student.Name}'s Discovery #{CountUserRecipes(potion.Student)}",
                    Ingredients = potion.UsedIngredients,
                    Student = potion.Student
                };
                await AddRecipe(newRecipe);
                potion.Recipe = newRecipe;
            }
        }

        await SaveChangesAsync();
    }

    public Task<List<Potion>> GetAllPotions()
    {
        return Task.Run(() => Potions
            .Include(p => p.UsedIngredients)
            .Include(p => p.Student)
            .Include(p => p.Recipe)
            .ToListAsync());
    }

    public async Task AddPotion(Potion potion)
    {
        await Task.Run(() => Potions.Add(potion));
    }

    public Task<Potion> GetPotion(long potionId)
    {
        return Task.Run(() => Potions
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
            Potions.Remove(potion);
        }
    }

    #endregion

    #region IngredientOperations

    public Task<List<Ingredient>> GetAllIngredients()
    {
        return Task.Run(() => Ingredients
            .ToListAsync());
    }

    public async Task AddIngredient(Ingredient ingredient)
    {
        await Task.Run(() => Ingredients.Add(ingredient));
    }

    public Task<Ingredient> GetIngredient(long id)
    {
        return Task.Run(() => Ingredients
            .FirstOrDefaultAsync(ingredient => ingredient.Id == id));
    }

    public Task UpdateIngredient(Ingredient updatedIngredient)
    {
        return Task.Run(() => Ingredients.Update(updatedIngredient));
    }

    public async Task DeleteIngredient(long id)
    {
        var ingredientToDelete = await GetIngredient(id);
        if (ingredientToDelete != null)
        {
            Ingredients.Remove(ingredientToDelete);
        }
    }

    #endregion

    #region RecipeOperations

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
        return Recipes.Count(r => r.Student == student) + 1;
    }

    public BrewingStatus CheckBrewingStatus(Potion potion)
    {
        if (potion.UsedIngredients.Count < MaxIngredientsForPotions)
        {
            return BrewingStatus.Brew;
        }

        var recipes =  GetAllRecipe().Result;
        var newRecipeIngredients = potion.UsedIngredients;
        return recipes.Select(recipe => recipe.Ingredients)
            .Any(ingredients => ingredients
                .SetEquals(newRecipeIngredients)) ? BrewingStatus.Replica : BrewingStatus.Discovery;
    }

    public Task<List<Recipe>> GetAllRecipe()
    {
        return Task.Run(() => Recipes
            .Include(r => r.Ingredients)
            .Include(r => r.Student)
            .ToListAsync());
    }

    public async Task AddRecipe(Recipe recipe)
    {
        await Task.Run(() => Recipes.Add(recipe));
    }

    public Task<Recipe> GetRecipe(long id)
    {
        return Task.Run(() => Recipes
            .Include(r => r.Ingredients)
            .Include(r => r.Student)
            .FirstOrDefaultAsync(recipe => recipe.Id == id));
    }

    public Task UpdateRecipe(Recipe updatedRecipe)
    {
        return Task.Run(() => Recipes.Update(updatedRecipe));
    }

    public async Task DeleteRecipe(long id)
    {
        var recipeToDelete = await GetRecipe(id);
        if (recipeToDelete != null)
        {
            Recipes.Remove(recipeToDelete);
        }
    }

    #endregion
}