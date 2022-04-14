using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HogwartsPotions.Models;
using HogwartsPotions.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsPotions.Controllers;

[ApiController, Route("/[controller]")]
public class PotionController : ControllerBase
{
    private readonly HogwartsContext _context;

    public PotionController(HogwartsContext context)
    {
        _context = context;
    }

    #region Get Requests

    [HttpGet]
    public async Task<List<Potion>> GetAllPotions()
    {
        return await _context.GetAllPotions();
    }

    [HttpGet("{id:long}")]
    public async Task<Potion> GetPotionById(long id)
    {
        return await _context.GetPotion(id);
    }

    [HttpGet("{potionId:long}/help")]
    public async Task<List<Recipe>> GetRecipesByIngredients(long potionId)
    {
        var potion = await _context.GetPotion(potionId);
        if (potion.UsedIngredients.Count < 5)
        {
            return await _context.GetRecipesByIngredients(potion.UsedIngredients);
        }

        return await Task.FromCanceled<List<Recipe>>(new CancellationToken(true));
    }

    #endregion

    #region Post Requests

    [HttpPost("{studentId:long}")]
    public async Task<Potion> AddPotion(long studentId, [FromBody] Potion potion)
    {
        var student = await _context.GetStudent(studentId);
        if (student != null)
        {
            potion.Student = student;
            await _context.AddPotion(potion);
            await _context.SaveChangesAsync();
        }

        return await Task.Run(() => potion);
    }

    #endregion

    #region Put Requests

    [HttpPut("{potionId:long}/add-ingredient")]
    public async Task<Potion> AddIngredientToPotion(long potionId, [FromBody] Ingredient ingredient)
    {
        var potion = await _context.GetPotion(potionId);

        await _context.AddIngredient(ingredient);
        await _context.ModifyPotion(potion, ingredient);

        return await Task.Run(() => potion);
    }

    [HttpPut("{potionId:long}/add-ingredient/{ingredientId:long}")]
    public async Task<Potion> AddIngredientToPotion(long potionId, long ingredientId)
    {
        var potion = await _context.GetPotion(potionId);
        var ingredient = await _context.GetIngredient(ingredientId);

        await _context.ModifyPotion(potion, ingredient);

        return await Task.Run(() => potion);
    }

    #endregion

    #region Delete Requests

    [HttpDelete("{id:long}")]
    public async Task DeletePotionById(long id)
    {
        await _context.DeletePotion(id);
        await _context.SaveChangesAsync();
    }

    #endregion
}