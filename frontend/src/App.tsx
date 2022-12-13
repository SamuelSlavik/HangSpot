import React, {useState, useEffect} from 'react';
import {Route, Routes} from "react-router";
import Navigation from "./components/Navigation";
import Homepage from "./pages/homepage/Homepage";

import UserContext from "./context/userContext";
import SearchContext from "./context/searchContext";
import MapContext from "./context/mapContext";
import ReloadContext from "./context/reloadContext";

import axios from "axios";

import {toggleSidePanelOff} from "./functions/toggleSidePanel";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import GamesMenu from "./pages/games/GamesMenu";
import PlaceDetail from "./pages/place/PlaceDetail";
import CreatePlace from "./pages/place/CreatePlace";
import {useLoadScript} from "@react-google-maps/api";

function App() {
  // User context
  const [userData, setUserData] = useState({
    token: undefined,
    id: undefined,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA71RHhLabJaCTd4oYQwZGAcF2Luxcnf5s",
  });

  const [forceReload, setForceReload] = useState<number>(0)

  console.log(isLoaded)

  const [searchType, setSearchType] = useState<string>("all")

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("token");
      if (token === null) {
        localStorage.setItem("token", " ");
        token = " ";
      }
      const tokenRes = await axios.get(
        "http://localhost:8000/api/users/token/check/",
        { headers: { "Authorization": "Bearer " + token } }
      );
      if (tokenRes.data && token != null) {
        // @ts-ignore
        setUserData({
          // @ts-ignore
          token: localStorage.getItem("token"),
          // @ts-ignore
          id: localStorage.getItem("id"),
        });
      }
    };
    checkLoggedIn().catch(console.error);
    }, []);


  return (
    <div className="App">
      <UserContext.Provider value={{userData, setUserData}}>
        <SearchContext.Provider value={{searchType, setSearchType}}>
          <MapContext.Provider value={{isLoaded}}>
            <ReloadContext.Provider value={{forceReload, setForceReload}}>
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
            </ReloadContext.Provider>
          </MapContext.Provider>
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
