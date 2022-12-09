import React from 'react';
import {Route, Routes} from "react-router";
import Navigation from "./components/Navigation";
import Homepage from "./pages/homepage/Homepage";

import {toggleSidePanelOff} from "./functions/toggleSidePanel";

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route
          path={"/"}
          element={<Homepage/>}
        />
      </Routes>
      <div
        className={"sidepanel__overlay"}
        id={"sidePanelOverlay"}
        onClick={toggleSidePanelOff}
      ><></></div>
    </div>
  );
}

export default App;
