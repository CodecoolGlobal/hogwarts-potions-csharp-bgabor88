using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models.AuthenticationEntities;
using HogwartsPotions.Models.Entities;

namespace HogwartsPotions.Models.Interfaces;

public interface IStudentRepository
{
    public Task<List<Student>> GetAllStudent();
    public Task<List<Potion>> GetAllPotionsByStudent(Student student);
    public Task AddStudent(Student student);
    public Task<Student> GetStudent(long id);
    public Task<Student> UpdateStudent(Student updatedStudent);
    public Task DeleteStudent(long id);
    AuthenticateResponse Authenticate(AuthenticateRequest model);
}