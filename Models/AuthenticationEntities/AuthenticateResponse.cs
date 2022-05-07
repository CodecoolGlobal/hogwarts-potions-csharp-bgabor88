using HogwartsPotions.Models.Entities;

namespace HogwartsPotions.Models.AuthenticationEntities;

public class AuthenticateResponse
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Token { get; set; }

    public AuthenticateResponse(Student student, string token)
    {
        Id = student.Id;
        Name = student.Name;
        Token = token;
    }
}