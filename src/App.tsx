import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { authorization } from "./fb";
import Loading from "./components/Loading";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Archive from "./pages/Archive";
function App() {
  return (
    <div>
      <Suspense fallback={Loading()}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/archive" component={Archive} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
