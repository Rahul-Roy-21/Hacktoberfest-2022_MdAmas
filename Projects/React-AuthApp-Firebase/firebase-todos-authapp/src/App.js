import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import Todos from "./pages/Todos";
import LoggedInRedirectRoute from "./components/LoggedInRedirect";
import LoginRequiredRoute from "./components/LoginRequiredRoute";
import { createContext, useContext } from "react";
import PageNotFound from "./components/PageNotFound";
import { getDBRef, getFirebaseAuth } from "./firebase/config";

const AppContext = createContext();

function App() {
  // Variables to pass as AppContext
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  };

  const auth = getFirebaseAuth(firebaseConfig);
  const db = getDBRef(firebaseConfig);

  return (
    <AppContext.Provider value={{ auth, db }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <LoggedInRedirectRoute>
                  <Login />
                </LoggedInRedirectRoute>
              }
            />
            <Route
              path="register"
              element={
                <LoggedInRedirectRoute>
                  <Register />
                </LoggedInRedirectRoute>
              }
            />
            <Route
              path="home"
              element={
                <LoginRequiredRoute>
                  <HomePage />
                </LoginRequiredRoute>
              }
            />
            <Route
              path="todos"
              element={
                <LoginRequiredRoute>
                  <Todos />
                </LoginRequiredRoute>
              }
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

export const useAppContext = () => useContext(AppContext);
