using HogwartsPotions.Models.AuthenticationEntities;
using HogwartsPotions.Models.Entities;
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
    public DbSet<UserLoginData> UserLoginDatas { get; set; }

    #endregion

    #region Constructor

    public HogwartsContext(DbContextOptions<HogwartsContext> options) : base(options)
    {
    }

    #endregion

    #region ModelCreation
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>()
            .HasOne(u => u.UserLoginData)
            .WithOne(d => d.Student)
            .HasForeignKey<UserLoginData>(d => d.StudentId)
            .OnDelete(DeleteBehavior.Cascade);
    }

    #endregion

}