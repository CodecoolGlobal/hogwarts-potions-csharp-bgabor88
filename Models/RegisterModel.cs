﻿using System.ComponentModel.DataAnnotations;
using HogwartsPotions.Models.Enums;

namespace HogwartsPotions.Models
{
    public class RegisterModel
    {
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }

        [Required]
        public HouseType House { get; set; }

        [Required]
        public PetType Pet { get; set; }

    }
}
