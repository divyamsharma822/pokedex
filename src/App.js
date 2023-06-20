import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Home } from "./components";
import FilteredData from "./components/FilteredData";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/*' element={<Home />} />
                {/* <Route path='/filter/:type' element={<FilteredData />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
