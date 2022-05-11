using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using HogwartsPotions.Helper;
using HogwartsPotions.Models.AuthenticationEntities;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace HogwartsPotions.Models.Repositories;

public class StudentRepository : IStudentRepository
{
    private readonly AppSettings _appSettings;

    public StudentRepository(HogwartsContext context, IOptions<AppSettings> appSettings)
    {
        _context = context;
        _appSettings = appSettings.Value;
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

    public AuthenticateResponse Authenticate(AuthenticateRequest model)
    {
        var loginData = _context.UserLoginDatas
            .Include(e => e.Student)
            .SingleOrDefault(
                x => x.Student.Email == model.Email && x.Password == model.Password);

        // return null if student not found
        if (loginData == null) return null;
        var user = loginData.Student;

        // authentication successful so generate jwt token
        var token = generateJwtToken(user);

        return new AuthenticateResponse(user, token);
    }

    public async Task<Student> OccupyRoom(long studentId, Room room)
    {
        var student = await GetStudent(studentId);
        if (student != null && room != null)
        {
            student.Room = room;
            await _context.SaveChangesAsync();
        }

        return student;
    }


    private string generateJwtToken(Student student)
    {
        // generate token that is valid for 7 days
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] {new Claim("id", student.Id.ToString())}),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}