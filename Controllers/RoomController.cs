using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models;
using HogwartsPotions.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsPotions.Controllers
{
    [ApiController, Route("/[controller]")]
    public class RoomController : ControllerBase
    {
        private readonly HogwartsContext _context;

        public RoomController(HogwartsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Room>> GetAllRooms()
        {
            return await _context.GetAllRooms();
        }

        [HttpPost]
        public async Task<IActionResult> AddRoom([FromBody] Room room)
        {
            await _context.AddRoom(room);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetRoomById", new {room.Id}, room);
        }

        [HttpGet("{id:long}")]
        public async Task<Room> GetRoomById(long id)
        {
            return await _context.GetRoom(id);
        }

        [HttpPut("{id:long}")]
        public async Task UpdateRoomById(long id, [FromBody] Room updatedRoom)
        {
            updatedRoom.Id = id;
            await _context.UpdateRoom(updatedRoom);
            await _context.SaveChangesAsync();
        }

        [HttpDelete("{id:long}")]
        public async Task DeleteRoomById(long id)
        {
            await _context.DeleteRoom(id);
            await _context.SaveChangesAsync();
        }

        [HttpGet("rat-owners")]
        public async Task<List<Room>> GetRoomsForRatOwners()
        {
            return await _context.GetRoomsForRatOwners();
        }
    }
}
