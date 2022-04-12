using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace HogwartsPotions.Models
{
    public class HogwartsContext : DbContext
    {
        public const int MaxIngredientsForPotions = 5;
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Potion> Potions { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Student> Students { get; set; }

        public HogwartsContext(DbContextOptions<HogwartsContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var roomOne = new Room() { ID = 1, Capacity = 2 };
            var roomTwo = new Room() { ID = 2, Capacity = 2 };
            var roomThree = new Room() { ID = 3, Capacity = 2 };

            modelBuilder.Entity<Room>().HasData(roomOne, roomTwo, roomThree);

            var studentOne = new Student() { HouseType = HouseType.Gryffindor, PetType = PetType.Cat, ID = 1, Name = "Marika" };
            var studentTwo = new Student() { HouseType = HouseType.Gryffindor, PetType = PetType.Cat, ID = 2, Name = "Sanyi" };
            var studentThree = new Student() { HouseType = HouseType.Gryffindor, PetType = PetType.Cat, ID = 3, Name = "Bélus" };

            modelBuilder.Entity<Student>().HasData(studentOne, studentTwo, studentThree);
        }

        public async Task AddRoom(Room room)
        {
            await Task.Run(() => Rooms.Add(room));
        }

        public Task<Room> GetRoom(long roomId)
        {
            return Task.Run(() => Rooms.FirstOrDefaultAsync(room =>room.ID == roomId));
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
    }
}
