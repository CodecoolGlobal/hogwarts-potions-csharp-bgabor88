using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HogwartsPotions.Models.Repositories;

public class StudentRepository : IStudentRepository
{
    public StudentRepository(HogwartsContext context)
    {
        _context = context;
    }

    public HogwartsContext _context { get; set; }

    public Task<List<Student>> GetAllStudent()
    {
        return Task.Run(() => _context.Students
            .Include(s => s.Room)
            .Include(s => s.Recipes)
            .Include(s => s.Potions)
            .ToListAsync());
    }
    public Task<List<Potion>> GetAllPotionsByStudent(Student student)
    {
        return Task.Run(() => _context.Potions
            .Where(p => p.Student == student)
            .ToListAsync());
    }

    public async Task AddStudent(Student student)
    {
        await Task.Run(() => _context.Students.Add(student));
        await _context.SaveChangesAsync();
    }

    public Task<Student> GetStudent(long id)
    {
        return Task.Run(() => _context.Students
            .Include(s => s.Room)
            .Include(s => s.Potions)
            .Include(s => s.Recipes)
            .FirstOrDefaultAsync(student => student.Id == id));
    }

    public Task<Student> UpdateStudent(Student updatedStudent)
    {
        _context.Students.Update(updatedStudent);
        _context.SaveChangesAsync();
        return Task.Run(() => updatedStudent);
    }

    public async Task DeleteStudent(long id)
    {
        var studentToDelete = await GetStudent(id);
        if (studentToDelete != null)
        {
            _context.Students.Remove(studentToDelete);
            await _context.SaveChangesAsync();
        }
    }
}