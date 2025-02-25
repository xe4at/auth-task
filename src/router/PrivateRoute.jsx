import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login";
import Me from "../src/pages/Me";
import PageNotFound from "../src/pages/PageNotFound";
import PrivateRoute from "../router/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/me"
          element={
            <PrivateRoute>
              <Me />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
