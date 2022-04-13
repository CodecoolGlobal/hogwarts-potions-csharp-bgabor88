using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models;
using HogwartsPotions.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsPotions.Controllers
{
    [ApiController, Route("/potions")]
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

        [HttpPost]
        public async Task AddPotion([FromBody] Potion potion)
        {
            await _context.AddPotion(potion);
            await _context.SaveChangesAsync();
        }

        [HttpGet("{id:long}")]
        public async Task<Potion> GetPotionById(long id)
        {
            return await _context.GetPotion(id);
        }

        [HttpPut("{id:long}")]
        public async Task UpdatePotionById(long id, [FromBody] Potion updatedPotion)
        {
            updatedPotion.Id = id;
            await _context.UpdatePotion(updatedPotion);
            await _context.SaveChangesAsync();
        }

        [HttpDelete("{id:long}")]
        public async Task DeletePotionById(long id)
        {
            await _context.DeletePotion(id);
            await _context.SaveChangesAsync();
        }
    }
}
