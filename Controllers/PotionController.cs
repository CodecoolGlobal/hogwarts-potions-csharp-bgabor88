using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Enums;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsPotions.Controllers
{
    [ApiController, Route("/[controller]")]
    public class PotionController : ControllerBase
    {
        private readonly HogwartsContext _context;

        public PotionController(HogwartsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Potion>> GetAllPotions()
        {
            return await _context.GetAllPotions();
        }

        [HttpPost("{studentId:long}")]
        public async Task AddPotion(long studentId, [FromBody] Potion potion)
        {
            var student = await _context.GetStudent(studentId);
            if (student != null)
            {
                potion.Student = student;
                await _context.AddPotion(potion);
                await _context.SaveChangesAsync();
            }
        }

        [HttpGet("{id:long}")]
        public async Task<Potion> GetPotionById(long id)
        {
            return await _context.GetPotion(id);
        }

        [HttpPut("{potionId:long}/add-ingredient/{ingredientId:long}")]
        public async Task<Potion> AddIngredientToPotion(long potionId, long ingredientId)
        {
            var potion = await _context.GetPotion(potionId);
            var ingredient = await _context.GetIngredient(ingredientId);
            if (potion != null && ingredient != null && potion.UsedIngredients.Count < 5)
            {
                potion.UsedIngredients.Add(ingredient);
                potion.Status = _context.CheckBrewingStatus(potion);
                if (potion.Status == BrewingStatus.Discovery)
                {
                    var newRecipe = new Recipe
                    {
                        Name = $"{potion.Student.Name} Discovery #{_context.CountUserRecipes(potion.Student)}",
                        Ingredients = potion.UsedIngredients,
                        Student = potion.Student
                    };
                    await _context.AddRecipe(newRecipe);
                    potion.Recipe = newRecipe;
                }
            }
            await _context.SaveChangesAsync();
            return await Task.Run(() => potion);
        }

        [HttpDelete("{id:long}")]
        public async Task DeletePotionById(long id)
        {
            await _context.DeletePotion(id);
            await _context.SaveChangesAsync();
        }
    }
}
