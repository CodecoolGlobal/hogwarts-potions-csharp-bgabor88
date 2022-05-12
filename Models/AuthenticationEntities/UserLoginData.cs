using System.ComponentModel.DataAnnotations.Schema;
using HogwartsPotions.Models.Entities;

namespace HogwartsPotions.Models.AuthenticationEntities
{
    public class UserLoginData
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Password { get; set; }

        public long? StudentId { get; set; }
        public Student Student { get; set; }

        public UserLoginData()
        {
            
        }
    }
}
