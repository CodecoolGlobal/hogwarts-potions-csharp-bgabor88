using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models;
using HogwartsPotions.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsPotions.Controllers
{
    [ApiController, Route("/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly HogwartsContext _context;

        public StudentController(HogwartsContext context)
        {
            _context = context;
        }

        [HttpGet("{studentId:long}/potions")]
        public async Task<List<Potion>> GetPotionsByStudent(long studentId)
        {
            return await _context.GetAllPotionsByStudent(await _context.GetStudent(studentId));
        }

        [HttpGet]
        public async Task<List<Student>> GetAllStudents()
        {
            return await _context.GetAllStudent();
        }

        [HttpPost]
        public async  Task AddStudent([FromBody] Student student)
        {
            await _context.AddStudent(student);
            await _context.SaveChangesAsync();
        }

        [HttpGet("{id:long}")]
        public async Task<Student> GetStudentById(long id)
        {
            return await _context.GetStudent(id);
        }

        [HttpPut("{id:long}")]
        public async Task UpdateStudentById(long id, [FromBody] Student updatedStudent)
        {
            updatedStudent.Id = id;
            await _context.UpdateStudent(updatedStudent);
            await _context.SaveChangesAsync();
        }

        [HttpPut("{studentId:long}/occupy/{roomId:long}")]
        public async Task OccupyRoom(long studentId, long roomId)
        {
            var student = await _context.GetStudent(studentId);
            var room = await _context.GetRoom(roomId);
            if (student != null && room != null)
            {
                student.Room = room;
            }

            await _context.SaveChangesAsync();
        }

        [HttpDelete("{id:long}")]
        public async Task DeleteStudentById(long id)
        {
            await _context.DeleteStudent(id);
            await _context.SaveChangesAsync();
        }
    }
}
