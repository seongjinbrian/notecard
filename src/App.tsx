import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loading from "./pages/Loading";
import Auth from "./container/Auth";
import {authentication} from "./fb"
import Home from "../src/components/Home"
export interface User {
  name: string | null;
  photo: string | null;
  email: string | null;
  uid?: string;
  updateProfile?: ((args:any) => void) | undefined
}
export type UserType = User | null;
function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<UserType>(null);
  let routes;

  useEffect(() => {
    const init = authentication.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photo: user.photoURL,
          email: user.email,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        })
      } else {
        setUser(null);
      }
      setLogin(true);
    });
    return () => init();
  }, []);

  let directory = user ? <Route path="/" exact component={Home} /> : <Route path="/" exact component={Auth} />;

  return (
    <div>
      <Suspense fallback={Loading()}>
        <BrowserRouter>
          <Switch>
            {directory}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
