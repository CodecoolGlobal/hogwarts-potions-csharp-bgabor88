using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using HogwartsPotions.Models.Enums;

namespace HogwartsPotions.Models.Entities;

public class Student
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    [Required] public string Name { get; set; } = null!;

    public HouseType HouseType { get; set; }
    public PetType PetType { get; set; }

    public Room Room { get; set; }

    public Student()
    {
    }
}