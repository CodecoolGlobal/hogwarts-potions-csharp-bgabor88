import { useFetchWrapper } from "../_helpers/fetch-wrapper";

export { useIngredientActions };

function useIngredientActions() {
  const baseUrl = "/ingredient";
  const fetchWrapper = useFetchWrapper();

  return {
    add,
    remove,
  };

  function add(ingredientData, setIngredients) {
    fetchWrapper.post(baseUrl, ingredientData).then((ingredient) => {
      setIngredients((ingredients) => [...ingredients, ingredient]);
    });
  }

  function remove(id, setIngredients) {
    fetchWrapper.delete(`${baseUrl}/${id}`).then(() => {
      setIngredients((ingredients) => ingredients.filter((ingredient) => ingredient.id !== id));
    });
  }
}
