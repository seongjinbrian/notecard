import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//alice
import { authorization } from "./fb";
import Loading from "./components/Loading";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Archive from "./pages/Archive";
import Trash from "./pages/Trash";
<!-- import Loading from "./pages/Loading";
import Auth from "./container/Auth";
import {authentication} from "./fb"
import Home from "../src/components/Home"
import {UserType} from "./model/profle" -->

function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<UserType>(null);
  let routes;

  useEffect(() => {
    const init = authentication.onAuthStateChanged((user) => {
      user ? setUser({ name: user.displayName, photo: user.photoURL, email: user.email, uid: user.uid, updateProfile: (args) => user.updateProfile(args)}) : setUser(null)
      setLogin(true);
    });
    return () => init();
  }, []);

//   let directory = user ? <Route path="/" exact component={Home} /> : <Route path="/" exact component={Auth} />;

  return (
    <div>
      {login ? (
        <Suspense fallback={Loading()}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/archive" component={Archive} />
            <Route exact path="/trash" component={Trash} />
          </Switch>
        </BrowserRouter>
      </Suspense>
      ) :(
        <Loading />
      )    
      }

    </div>
  );
}

export default App;
