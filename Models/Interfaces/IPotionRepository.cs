using System.Collections.Generic;
using System.Threading.Tasks;
using HogwartsPotions.Models.Entities;

namespace HogwartsPotions.Models.Interfaces;

public interface IPotionRepository
{
    public Task ModifyPotion(Potion potion, Ingredient ingredient);
    public Task<List<Potion>> GetAllPotions();
    public void AddPotion(Potion potion);
    public Task<Potion> GetPotion(long potionId);
    public Task DeletePotion(long id);
}