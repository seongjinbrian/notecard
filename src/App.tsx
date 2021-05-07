import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loading from "./pages/Loading";
import Auth from "./container/Auth";
import { authentication } from "./fb";
import { UserType } from "./model/profle";
import Archive from "./pages/Archive";
import Home from "./pages/Home";
import Trash from "./pages/Trash";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<UserType>(null);
  const theme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#ffffff",
        dark: "#484848",
        light: "#cacaca",
      },
      secondary: {
        main: "#212121",
        dark: "#484848",
      },
    },
    typography: {
      fontFamily: "Poppins",
    },
  });
  useEffect(() => {
    const init = authentication.onAuthStateChanged((user) => {
      user
        ? setUser({
            name: user.displayName,
            photo: user.photoURL,
            email: user.email,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
          })
        : setUser(null);
      setLogin(true);
    });
    return () => init();
  }, []);

  let directory = user ? (
    <>
      <ThemeProvider theme={theme}>
      <Route path="/" exact component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/archive" component={Archive} />
      <Route exact path="/trash" component={Trash} />
      </ThemeProvider>
    </>
  ) : (
    <Route path="/" exact component={Auth} />
  );

  return (
    <div>
      {login ? (
        <Suspense fallback={Loading()}>
          <BrowserRouter>
            <Switch>{directory}</Switch>
          </BrowserRouter>
        </Suspense>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
