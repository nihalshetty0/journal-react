import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";

import JournalState from "./context/journal/JournalState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <>
      <AuthState>
        <JournalState>
          <AlertState>
            <BrowserRouter>
              <Routes>
                <Route
                  exact
                  path='/'
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                ></Route>
                <Route exact path='/signup' element={<Signup />}></Route>
                <Route exact path='/login' element={<Login />}></Route>
              </Routes>
            </BrowserRouter>
          </AlertState>
        </JournalState>
      </AuthState>
    </>
  );
}

export default App;

// https://lifesaver.codes/answer/loading-html-content-into-editor-41
