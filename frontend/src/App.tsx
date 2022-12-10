import React, {useState} from 'react';
import {Route, Routes} from "react-router";
import Navigation from "./components/Navigation";
import Homepage from "./pages/homepage/Homepage";

import UserContext from "./context/userContext";

import {toggleSidePanelOff} from "./functions/toggleSidePanel";
import Login from "./pages/user/Login";
import Profile from "./pages/user/Profile";

function App() {
  // User context
  const [userData, setUserData] = useState({
    token: undefined,
    name: undefined,
  });

  return (
    <div className="App">
      <UserContext.Provider value={{userData, setUserData}}>
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
        </Routes>
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
