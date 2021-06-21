import "./App.css";
import BodySection from "./components/body-content/BodySection";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contact from "./components/body-content/ContactForm/Contact";
import LogInForm from "./components/body-content/LogInDetails/LogInForm";
import ServiceSection from "./components/body-content/services/ServiceSection";
import Dashboard from "./components/body-content/dashboard/Dashboard";
import PlaceOrder from "./components/body-content/placeorder/PlaceOrder";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div style={{paddingTop: '50px'}}>
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/service" exact component={ServiceSection} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/login" exact component={LogInForm} />
            <Route path="/placeorder" exact component={PlaceOrder} />
            <Route path="/" exact component={BodySection} />
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
