using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsPotions.Controllers;

[ApiController, Route("/[controller]")]
public class RoomController : ControllerBase
{
    private readonly IRoomRepository _roomRepository;

    public RoomController(IRoomRepository roomRepository)
    {
        _roomRepository = roomRepository;
    }

    [HttpGet]
    public async Task<List<Room>> GetAllRooms()
    {
        return await _roomRepository.GetAllRooms();
    }

    [HttpPost]
    public async Task<IActionResult> AddRoom([FromBody] Room room)
    {
        await _roomRepository.AddRoom(room);
        return CreatedAtAction("GetRoomById", new {room.Id}, room);
    }

    [HttpGet("{id:long}")]
    public async Task<Room> GetRoomById(long id)
    {
        return await _roomRepository.GetRoom(id);
    }

    [HttpPut("{id:long}")]
    public void UpdateRoomById(long id, [FromBody] Room updatedRoom)
    {
        updatedRoom.Id = id;
        _roomRepository.UpdateRoom(updatedRoom);
    }

    [HttpDelete("{id:long}")]
    public async Task DeleteRoomById(long id)
    {
        await _roomRepository.DeleteRoom(id);
    }

    [HttpGet("rat-owners")]
    public async Task<List<Room>> GetRoomsForRatOwners()
    {
        return await _roomRepository.GetRoomsForRatOwners();
    }
}