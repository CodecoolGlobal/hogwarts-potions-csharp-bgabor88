using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HogwartsPotions.Models.Entities;
using HogwartsPotions.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HogwartsPotions.Controllers;

[ApiController, Route("/[controller]")]
public class PotionController : ControllerBase
{
    private readonly IPotionRepository _potionRepository;
    private readonly IRecipeRepository _recipeRepository;
    private readonly IStudentRepository _studentRepository;
    private IIngredientRepository _ingredientRepository;

    public PotionController(IPotionRepository potionRepository, 
        IRecipeRepository recipeRepository, 
        IStudentRepository studentRepository, 
        IIngredientRepository ingredientRepository)
    {
        _potionRepository = potionRepository;
        _recipeRepository = recipeRepository;
        _studentRepository = studentRepository;
        _ingredientRepository = ingredientRepository;
    }

    #region Get Requests

    [HttpGet]
    public async Task<List<Potion>> GetAllPotions()
    {
        return await _potionRepository.GetAllPotions();
    }

    [HttpGet("{id:long}")]
    public async Task<Potion> GetPotionById(long id)
    {
        return await _potionRepository.GetPotion(id);
    }

    [HttpGet("{potionId:long}/help")]
    public async Task<List<Recipe>> GetRecipesByIngredients(long potionId)
    {
        var potion = await _potionRepository.GetPotion(potionId);
        if (potion.UsedIngredients.Count < 5)
        {
            return await _recipeRepository.GetRecipesByIngredients(potion.UsedIngredients);
        }

        return await Task.FromCanceled<List<Recipe>>(new CancellationToken(true));
    }

    #endregion

    #region Post Requests

    [HttpPost("{studentId:long}")]
    public async Task<Potion> AddPotion(long studentId, [FromBody] Potion potion)
    {
        var student = await _studentRepository.GetStudent(studentId);
        if (student != null)
        {
            potion.Student = student;
            _potionRepository.AddPotion(potion);
        }

        return await Task.Run(() => potion);
    }

    #endregion

    #region Put Requests

    [HttpPut("{potionId:long}/add-ingredient")]
    public async Task<Potion> AddIngredientToPotion(long potionId, [FromBody] Ingredient ingredient)
    {
        var potion = await _potionRepository.GetPotion(potionId);
        
        _ingredientRepository.AddIngredient(ingredient);
        await _potionRepository.ModifyPotion(potion, ingredient);

        return await Task.Run(() => potion);
    }

    [HttpPut("{potionId:long}/add-ingredient/{ingredientId:long}")]
    public async Task<Potion> AddIngredientToPotion(long potionId, long ingredientId)
    {
        var potion = await _potionRepository.GetPotion(potionId);
        var ingredient = await _ingredientRepository.GetIngredient(ingredientId);

        await _potionRepository.ModifyPotion(potion, ingredient);

        return await Task.Run(() => potion);
    }

    #endregion

    #region Delete Requests

    [HttpDelete("{id:long}")]
    public async Task DeletePotionById(long id)
    {
        await _potionRepository.DeletePotion(id);
    }

    #endregion
}