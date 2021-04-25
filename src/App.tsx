import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { authorization } from "./fb";
import Loading from "./view/Loading";
import Auth from "./components/Auth";
function App() {
  return (
    <div>
      <Suspense fallback={Loading()}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Auth} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
