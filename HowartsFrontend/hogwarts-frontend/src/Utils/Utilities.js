export const stateUpdater = (newElement, setter) => {
  setter((collection) =>
    collection.map((element) => {
      return element.id === newElement.id ? newElement : element;
    })
  );
};
