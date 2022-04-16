using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models;
using HogwartsPotions.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsPotions.Controllers
{
    [ApiController, Route("/[controller]")]
    public class IngredientController : ControllerBase
    {
        private readonly HogwartsContext _context;

        public IngredientController(HogwartsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Ingredient>> GetAllIngredients()
        {
            return await _context.GetAllIngredients();
        }

        [HttpPost]
        public async Task<IActionResult> AddIngredient([FromBody] Ingredient ingredient)
        {
            await _context.AddIngredient(ingredient);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetIngredientById", new { ingredient.Id }, ingredient);
        }

        [HttpGet("{id:long}")]
        public async Task<Ingredient> GetIngredientById(long id)
        {
            return await _context.GetIngredient(id);
        }

        [HttpPut("{id:long}")]
        public async Task UpdateIngredientById(long id, [FromBody] Ingredient updatedIngredient)
        {
            updatedIngredient.Id = id;
            await _context.UpdateIngredient(updatedIngredient);
            await _context.SaveChangesAsync();
        }

        [HttpDelete("{id:long}")]
        public async Task DeleteIngredientById(long id)
        {
            await _context.DeleteIngredient(id);
            await _context.SaveChangesAsync();
        }
    }
}
