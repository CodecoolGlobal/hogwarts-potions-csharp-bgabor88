using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsPotions.Controllers;

[ApiController, Route("/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly IRecipeRepository _recipeRepository;

    public RecipeController(IRecipeRepository recipeRepository)
    {
        _recipeRepository = recipeRepository;
    }

    [HttpGet]
    public async Task<List<Recipe>> GetAllRecipe()
    {
        return await _recipeRepository.GetAllRecipe();
    }

    [HttpPost]
    public void AddRecipe([FromBody] Recipe recipe)
    {
        _recipeRepository.AddRecipe(recipe);
    }

    [HttpGet("{id:long}")]
    public async Task<Recipe> GetRecipeById(long id)
    {
        return await _recipeRepository.GetRecipe(id);
    }

    [HttpPut("{id:long}")]
    public async Task UpdateRecipeById(long id, [FromBody] Recipe updatedRecipe)
    {
        updatedRecipe.Id = id;
        await _recipeRepository.UpdateRecipe(updatedRecipe);
    }

    [HttpDelete("{id:long}")]
    public IActionResult DeleteRecipeById(long id)
    {
        _recipeRepository.DeleteRecipe(id);
        return Ok();
    }
}