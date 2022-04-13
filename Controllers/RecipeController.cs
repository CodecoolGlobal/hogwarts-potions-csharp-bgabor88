using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models;
using HogwartsPotions.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsPotions.Controllers
{
    [ApiController, Route("/[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly HogwartsContext _context;

        public RecipeController(HogwartsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Recipe>> GetAllRecipe()
        {
            return await _context.GetAllRecipe();
        }

        [HttpPost]
        public async  Task AddRecipe([FromBody] Recipe recipe)
        {
            await _context.AddRecipe(recipe);
            await _context.SaveChangesAsync();
        }

        [HttpGet("{id:long}")]
        public async Task<Recipe> GetRecipeById(long id)
        {
            return await _context.GetRecipe(id);
        }

        [HttpPut("{id:long}")]
        public async Task UpdateRecipeById(long id, [FromBody] Recipe updatedRecipe)
        {
            updatedRecipe.Id = id;
            await _context.UpdateRecipe(updatedRecipe);
            await _context.SaveChangesAsync();
        }

        [HttpDelete("{id:long}")]
        public async Task DeleteRecipeById(long id)
        {
            await _context.DeleteRecipe(id);
            await _context.SaveChangesAsync();
        }
    }
}
