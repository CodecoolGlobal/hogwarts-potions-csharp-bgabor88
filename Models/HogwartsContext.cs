using System;
using System.Collections.Generic;
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
            throw new NotImplementedException();
        }

        public Task<Room> GetRoom(long roomId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Room>> GetAllRooms()
        {
            return Task.Run(() => Rooms.ToListAsync());
        }

        public async Task UpdateRoom(Room room)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteRoom(long id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Room>> GetRoomsForRatOwners()
        {
            throw new NotImplementedException();
        }
    }
}
