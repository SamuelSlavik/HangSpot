import React from 'react';
import {Route, Routes} from "react-router";
import Navigation from "./components/Navigation";
import Homepage from "./pages/homepage/Homepage";

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
    </div>
  );
}

export default App;
