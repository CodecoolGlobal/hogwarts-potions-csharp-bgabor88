using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace HogwartsPotions.Models;

public class HogwartsContext : DbContext
{
    #region Properties

    public const int MaxIngredientsForPotions = 5;
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Potion> Potions { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Recipe> Recipes { get; set; }


    #endregion

    #region Constructor

    public HogwartsContext(DbContextOptions<HogwartsContext> options) : base(options)
    {
    }

    #endregion

    #region ModelCreation
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }

    #endregion
    
}