using System;
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
    public Task<List<Potion>> GetAllPotions()
    {
        return Task.Run(() => Potions
            .Include(p => p.Ingredients)
            .Include(p => p.Status)
            .Include(p => p.Student)
            .ToListAsync());
    }

    public async Task AddPotion(Potion potion)
    {
        await Task.Run(() => Potions.Add(potion));
    }

    public Task<Potion> GetPotion(long potionId)
    {
        return Task.Run(() => Potions
            .Include(p => p.Ingredients)
            .Include(p => p.Status)
            .Include(p => p.Student)
            .FirstOrDefaultAsync(potion => potion.Id == potionId));
    }

    public Task UpdatePotion(Potion updatedPotion)
    {
        return Task.Run(() => Potions.Update(updatedPotion));
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

    #region StudentOperations
    public Task<List<Student>> GetAllStudent()
    {
        return Task.Run(() => Students
            .Include(s => s.Room)
            .ToListAsync());
    }

    public async Task AddStudent(Student student)
    {
        await Task.Run(() => Students.Add(student));
    }

    public Task<Student> GetStudent(long id)
    {
        return Task.Run(() => Students
            .Include(s => s.Room)
            .FirstOrDefaultAsync(student => student.Id == id));
    }

    public Task UpdateStudent(Student updatedStudent)
    {
        return Task.Run(() => Students.Update(updatedStudent));
    }

    public async Task DeleteStudent(long id)
    {
        var studentToDelete = await GetStudent(id);
        if (studentToDelete != null)
        {
            Students.Remove(studentToDelete);
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
}