using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsPotions.Controllers;

[ApiController, Route("/[controller]")]
public class IngredientController : ControllerBase
{
    private readonly IIngredientRepository _ingredientRepository;

    public IngredientController(IIngredientRepository ingredientRepository)
    {
        _ingredientRepository = ingredientRepository;
    }

    [HttpGet]
    public async Task<List<Ingredient>> GetAllIngredients()
    {
        return await _ingredientRepository.GetAllIngredients();
    }

    [HttpPost]
    public IActionResult AddIngredient([FromBody] Ingredient ingredient)
    {
        _ingredientRepository.AddIngredient(ingredient);
        return CreatedAtAction("GetIngredientById", new { ingredient.Id }, ingredient);
    }

    [HttpGet("{id:long}")]
    public async Task<Ingredient> GetIngredientById(long id)
    {
        return await _ingredientRepository.GetIngredient(id);
    }

    [HttpPut("{id:long}")]
    public IActionResult UpdateIngredientById(long id, [FromBody] Ingredient updatedIngredient)
    {
        updatedIngredient.Id = id; 
        _ingredientRepository.UpdateIngredient(updatedIngredient);
        return Ok();
    }

    [HttpDelete("{id:long}")]
    public IActionResult DeleteIngredientById(long id)
    {
        _ingredientRepository.DeleteIngredient(id);
        return Ok();
    }
}