//#region Imports
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Students from "./Components/Students";
import Rooms from "./Components/Rooms";
import Potions from "./Components/Potions";
import Ingredients from "./Components/Ingredients";
import Recipes from "./Components/Recipes";
import { StudentsProvider } from "./DAL/ContextProviders/StudentContext";
import { RoomsProvider } from "./DAL/ContextProviders/RoomsContext";
import { PotionsProvider } from "./DAL/ContextProviders/PotionsContext";
import { RecipesProvider } from "./DAL/ContextProviders/RecipesContext";
import { IngredientsProvider } from "./DAL/ContextProviders/IngredientsContext";
//#endregion

function App() {
  const [activePage, setActivePage] = useState(window.location.pathname.substring(1));

  return (
    <StudentsProvider>
      <RoomsProvider>
        <PotionsProvider>
          <RecipesProvider>
            <IngredientsProvider>
              <div className="App">
                <Navbar getActive={activePage} setActive={setActivePage} />
                <div className="App-body">
                  <Routes>
                    <Route path="/Ingredients" element={<Ingredients />}></Route>
                    <Route path="/Potions" element={<Potions />}></Route>
                    <Route path="/Recipes" element={<Recipes />}></Route>
                    <Route path="/Students" element={<Students />}></Route>
                    <Route path="/Rooms" element={<Rooms />}></Route>
                    <Route path="/" element={<Rooms />}></Route>
                  </Routes>
                </div>
              </div>
            </IngredientsProvider>
          </RecipesProvider>
        </PotionsProvider>
      </RoomsProvider>
    </StudentsProvider>
  );
}

export default App;
