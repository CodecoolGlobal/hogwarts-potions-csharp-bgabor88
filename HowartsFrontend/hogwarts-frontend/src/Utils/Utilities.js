export const stateUpdater = async (newElement, setter) => {
  await setter((collection) =>
    collection.map((element) => {
      return element.id === newElement.id ? newElement : element;
    })
  );
};
