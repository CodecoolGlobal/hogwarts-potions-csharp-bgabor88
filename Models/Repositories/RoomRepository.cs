using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Enums;
using HogwartsPotions.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HogwartsPotions.Models.Repositories;

public class RoomRepository : IRoomRepository
{
    public RoomRepository(HogwartsContext context)
    {
        Context = context;
    }
    public HogwartsContext Context { get; set; }

    public async Task AddRoom(Room room)
    {
        Context.Rooms.Add(room);
        await Context.SaveChangesAsync();
    }

    public Task<Room> GetRoom(long roomId)
    {
        return Task.Run(() => Context.Rooms
            .Include(r => r.Residents)
            .FirstOrDefaultAsync(room => room.Id == roomId));
    }

    public Task<List<Room>> GetAllRooms()
    {
        return Task.Run(() => Context.Rooms
            .Include(x => x.Residents)
            .ToListAsync());
    }

    public void UpdateRoom(Room room)
    {
        Context.Rooms.Update(room);
        Context.SaveChangesAsync();
    }

    public async Task DeleteRoom(long id)
    {
        var oldRoom = await GetRoom(id);
        if (oldRoom != null)
        {
            Context.Rooms.Remove(oldRoom);
            await Context.SaveChangesAsync();
        }
    }

    public Task<List<Room>> GetRoomsForRatOwners()
    {
        return Task.Run(() =>
        {
            return Context.Rooms
                .Include(r => r.Residents)
                .Where(room => room.Residents
                    .Any(student => student.PetType != PetType.Cat || student.PetType != PetType.Owl))
                .ToListAsync();
        });
    }
}