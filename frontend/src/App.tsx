import React, {useState, useEffect} from 'react';
import {Route, Routes} from "react-router";
import Navigation from "./components/Navigation";
import Homepage from "./pages/homepage/Homepage";

import UserContext from "./context/userContext";
import SearchContext from "./context/searchContext";

import axios from "axios";

import {toggleSidePanelOff} from "./functions/toggleSidePanel";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import GamesMenu from "./pages/games/GamesMenu";
import PlaceDetail from "./pages/place/PlaceDetail";
import CreatePlace from "./pages/place/CreatePlace";

function App() {
  // User context
  const [userData, setUserData] = useState({
    token: undefined,
    id: undefined,
  });

  const [searchType, setSearchType] = useState<string>("all")

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("token");
      if (token === null) {
        localStorage.setItem("token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:8000/users/tokenIsValid",
        null,
        { headers: { "Authorization": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:8000/api/users/token/", {
          headers: { "Authorization": token },
        });
        setUserData({
          token: userRes.data.access,
          id: userRes.data.id,
        });
      }
    };
    checkLoggedIn();
    }, []);


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
            <Route
              path={"/create/"}
              element={<CreatePlace/>}
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
