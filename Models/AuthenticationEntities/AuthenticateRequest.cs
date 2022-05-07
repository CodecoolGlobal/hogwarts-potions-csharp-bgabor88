using System.ComponentModel.DataAnnotations;

namespace HogwartsPotions.Models.AuthenticationEntities;

public class AuthenticateRequest
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string Password { get; set; }
}