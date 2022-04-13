using System;
using System.Collections.Generic;
using System.Diagnostics;
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

        [HttpDelete("{id:long}")]
        public async Task DeleteStudentById(long id)
        {
            await _context.DeleteStudent(id);
            await _context.SaveChangesAsync();
        }
    }
}
