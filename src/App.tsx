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

function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<UserType>(null);

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
      <Route path="/" exact component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/archive" component={Archive} />
      <Route exact path="/trash" component={Trash} />
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
