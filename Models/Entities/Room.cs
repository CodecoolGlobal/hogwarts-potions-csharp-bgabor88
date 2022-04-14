using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HogwartsPotions.Models.Entities
{
    public class Room
    {
        public Room()
        {
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public int Capacity { get; set; }

        // Navigation properties
        public HashSet<Student> Residents { get; set; } = new();
    }
}
