/*
* author: Samuel Slávik (xslavi37)
* brief: File that provides routes for pages and components, global variables. The whole app loads in this file
*/

import React, {useState, useEffect} from 'react';
import {Route, Routes} from "react-router";
import axios from "axios";
// Global context
import UserContext from "./context/userContext";
import SearchContext from "./context/searchContext";
import MapContext from "./context/mapContext";
import ReloadContext from "./context/reloadContext";
// Components
import Navigation from "./components/Navigation";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";
import GamesMenu from "./pages/games/GamesMenu";
import PlaceDetail from "./pages/place/PlaceDetail";
import CreatePlace from "./pages/place/CreatePlace";
import EditPlace from "./pages/place/EditPlace";
import SpotFinder from "./pages/games/SpotFinder";
// Google maps api
import {useLoadScript} from "@react-google-maps/api";
import User from "./pages/user/User";

function App() {
  // User context initialization
  const [userData, setUserData] = useState({
    token: undefined,
    id: undefined,
  });
  const [forceReload, setForceReload] = useState<number>(0)
  const [searchType, setSearchType] = useState<string>("all")

  // google maps api
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA71RHhLabJaCTd4oYQwZGAcF2Luxcnf5s",
  });

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
    }, []
  );

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
                  path={"/user/:userId"}
                  element={<User/>}
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
                <Route
                  path={"/edit/:id"}
                  element={<EditPlace/>}
                />
                <Route
                  path={"/games/spot-finder"}
                  element={<SpotFinder/>}
                />
              </Routes>
            </ReloadContext.Provider>
          </MapContext.Provider>
        </SearchContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
