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
        modelBuilder.Entity<Student>()
            .HasOne(s => s.Room)
            .WithMany(r => r.Residents)
            .HasForeignKey(s => s.RoomId)
            .OnDelete(DeleteBehavior.SetNull);

        //modelBuilder.Entity<PotionIngredient>()
        //    .HasKey(pi => new { pi.PotionId, pi.IngredientId });

        //modelBuilder.Entity<PotionIngredient>()
        //    .HasOne(pi => pi.Ingredient)
        //    .WithMany(i => i.PotionIngredients)
        //    .HasForeignKey(pi => pi.PotionId);

        //modelBuilder.Entity<PotionIngredient>()
        //    .HasOne(pi => pi.Potion)
        //    .WithMany(p => p.PotionIngredients)
        //    .HasForeignKey(pi => pi.IngredientId);

        //modelBuilder.Entity<Potion>()
        //    .HasMany<Ingredient>(p => p.Ingredients)
        //    .WithMany(p => p.Potions);

        //modelBuilder.Entity<Potion>()
        //    .Navigation(p => p.Ingredients)
        //    .UsePropertyAccessMode(PropertyAccessMode.PreferProperty);

        //modelBuilder.Entity<Student>().HasKey(p => p.RoomFk);
        //modelBuilder.Entity<Student>().HasOne(p => p.Room).WithOne();

        var studentOne = new Student() { HouseType = HouseType.Gryffindor, PetType = PetType.Cat, ID = 1, Name = "Marika" };
        var studentTwo = new Student() { HouseType = HouseType.Gryffindor, PetType = PetType.Cat, ID = 2, Name = "Sanyi" };
        var studentThree = new Student() { HouseType = HouseType.Gryffindor, PetType = PetType.Cat, ID = 3, Name = "Bélus" };

        modelBuilder.Entity<Student>().HasData(studentOne, studentTwo, studentThree);

        var roomOne = new Room() { ID = 1, Capacity = 2 };
        //roomOne.Residents.Add(studentOne);
        //studentOne.RoomId = roomOne.ID;
        var roomTwo = new Room() { ID = 2, Capacity = 2 };
        var roomThree = new Room() { ID = 3, Capacity = 2 };

        modelBuilder.Entity<Room>().HasData(roomOne, roomTwo, roomThree);

        var ingredientOne = new Ingredient() { ID = 1, Name = "Unicorn fart" };
        var ingredientTwo = new Ingredient() { ID = 2, Name = "Frog leg" };
        var ingredientThree = new Ingredient() { ID = 3, Name = "Eternal flame" };
        var ingredientFour = new Ingredient() { ID = 4, Name = "Moonstone" };
        var ingredientFive = new Ingredient() { ID = 5, Name = "Fat-Man fat" };

        modelBuilder.Entity<Ingredient>()
            .HasData(ingredientOne, ingredientTwo, ingredientThree, ingredientFour, ingredientFive);

        var potionOne = new Potion() { ID = 2, Name = "Burning fat", Status = BrewingStatus.Brew};

        //var piOne = new PotionIngredient
        //{
        //    PotionId = potionOne.ID, IngredientId = ingredientThree.ID
        //};

        //var piTwo = new PotionIngredient
        //{
        //    PotionId = potionOne.ID, IngredientId = ingredientFive.ID
        //};

        //modelBuilder.Entity<PotionIngredient>().HasData(piOne, piTwo);

        modelBuilder.Entity<Potion>().HasData(potionOne);
    }

    #endregion

    #region RoomOperations
    public async Task AddRoom(Room room)
    {
        await Task.Run(() => Rooms.Add(room));
    }

    public Task<Room> GetRoom(long roomId)
    {
        return Task.Run(() => Rooms.FirstOrDefaultAsync(room => room.ID == roomId));
    }

    public Task<List<Room>> GetAllRooms()
    {
        return Task.Run(() => Rooms.ToListAsync());
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
            return Rooms.Where(room => room.Residents.Any(student =>
                student.PetType != PetType.Cat || student.PetType != PetType.Owl)).ToListAsync();
        });
    }

    #endregion

    #region PotionOperations
    public Task<List<Potion>> GetAllPotions()
    {
        return Task.Run(() => Potions.ToListAsync());
    }

    public async Task AddPotion(Potion potion)
    {
        await Task.Run(() => Potions.Add(potion));
    }

    public Task<Potion> GetPotion(long potionId)
    {
        return Task.Run(() => Potions.FirstOrDefaultAsync(potion => potion.ID == potionId));
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
}