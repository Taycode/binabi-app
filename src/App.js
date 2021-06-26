import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { AdminPanel } from "./pages/admin/admin";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/admin">
            <AdminPanel />
          </Route>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
