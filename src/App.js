import "./App.css";
import BodySection from "./components/body-content/BodySection";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LogInForm from "./components/body-content/LogInDetails/LogInForm";
import ServiceSection from "./components/body-content/services/ServiceSection";
import Dashboard from "./components/body-content/dashboard/Dashboard";
import PlaceOrder from "./components/body-content/placeorder/PlaceOrder";
import { ContactUs } from "./components/contact-us/Contact";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div class="content-holder">
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/Binabi" exact>
              <Redirect to="/" />
            </Route>
            <Route path="/services" exact component={ServiceSection} />
            <Route path="/contact-us" exact component={ ContactUs } />
            <Route path="/login" exact component={LogInForm} />
            <Route path="/order" exact component={PlaceOrder} />
            <Route path="/" exact component={BodySection} />
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
