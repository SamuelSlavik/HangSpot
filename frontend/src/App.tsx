import React, {useState} from 'react';
import {Route, Routes} from "react-router";
import Navigation from "./components/Navigation";
import Homepage from "./pages/homepage/Homepage";

import UserContext from "./context/userContext";
import SearchContext from "./context/searchContext";

import {toggleSidePanelOff} from "./functions/toggleSidePanel";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import GamesMenu from "./pages/games/GamesMenu";
import PlaceDetail from "./pages/place/PlaceDetail";

function App() {
  // User context
  const [userData, setUserData] = useState({
    token: undefined,
    name: undefined,
  });

  const [searchType, setSearchType] = useState<string>("all")

  return (
    <div className="App">
      <UserContext.Provider value={{userData, setUserData}}>
        <SearchContext.Provider value={{searchType, setSearchType}}>
          <Navigation/>
          <Routes>
            <Route
              path={"/"}
              element={<Homepage/>}
            />
            <Route
              path={"/login"}
              element={<Login/>}
            />
            <Route
              path={"/profile"}
              element={<Profile/>}
            />
            <Route
              path={"/games"}
              element={<GamesMenu/>}
            />
            <Route
              path={"/detail/:id"}
              element={<PlaceDetail/>}
            />
          </Routes>
        </SearchContext.Provider>
      </UserContext.Provider>
      <div
        className={"sidepanel__overlay"}
        id={"sidePanelOverlay"}
        onClick={toggleSidePanelOff}
      ><></></div>
    </div>
  );
}

export default App;
