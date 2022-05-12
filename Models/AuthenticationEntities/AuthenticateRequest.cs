using System.ComponentModel.DataAnnotations;

namespace HogwartsPotions.Models.AuthenticationEntities;

public class AuthenticateRequest
{
    [Required]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}