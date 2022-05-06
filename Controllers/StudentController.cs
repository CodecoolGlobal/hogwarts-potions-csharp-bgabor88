using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsPotions.Controllers;

[ApiController, Route("/[controller]")]
public class StudentController : ControllerBase
{
    private readonly IStudentRepository _studentRepository;
    private readonly IRoomRepository _roomRepository;

    public StudentController(IStudentRepository studentRepository, IRoomRepository roomRepository)
    {
        _studentRepository = studentRepository;
        _roomRepository = roomRepository;
    }

    [HttpGet("{studentId:long}/potions")]
    public async Task<List<Potion>> GetPotionsByStudent(long studentId)
    {
        return await _studentRepository.GetAllPotionsByStudent(await _studentRepository.GetStudent(studentId));
    }

    [HttpGet]
    public async Task<List<Student>> GetAllStudents()
    {
        return await _studentRepository.GetAllStudent();
    }

    [HttpPost]
    public async Task<IActionResult> AddStudent([FromBody] Student student)
    {
        await _studentRepository.AddStudent(student);
        return CreatedAtAction("GetStudentById", new { student.Id }, student);
    }

    [HttpGet("{id:long}")]
    public async Task<Student> GetStudentById(long id)
    {
        return await _studentRepository.GetStudent(id);
    }

    [HttpPut("{id:long}")]
    public async Task UpdateStudentById(long id, [FromBody] Student updatedStudent)
    {
        updatedStudent.Id = id;
        await _studentRepository.UpdateStudent(updatedStudent);
    }

    [HttpPut("{studentId:long}/occupy/{roomId:long}")]
    public async Task<IActionResult> OccupyRoom(long studentId, long roomId)
    {
        var student = await _studentRepository.GetStudent(studentId);
        var room = await _roomRepository.GetRoom(roomId);
        if (student != null && room != null)
        {
            student.Room = room;
            return CreatedAtAction("GetStudentById", new { student.Id }, student);
        }

        return NoContent();
    }

    [HttpDelete("{id:long}")]
    public async Task DeleteStudentById(long id)
    {
        await _studentRepository.DeleteStudent(id);
    }

    [HttpPut("{studentId:long}/leave/{roomId:long}")]
    public async Task<IActionResult> LeaveRoom(long studentId, long roomId)
    {
        var student = await _studentRepository.GetStudent(studentId);
        var room = await _roomRepository.GetRoom(roomId);
        if (student != null && room != null)
        {
            room.Residents.Remove(student);
            return CreatedAtAction("GetStudentById", new { student.Id }, student);
        }

        return NoContent();
    }
}