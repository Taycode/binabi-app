import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { PlaceAnOrder } from "./pages/order/order";
import { ContactUs } from "./pages/contact-us/Contact";
import { OurServices } from "./pages/services/services";
import { AdminLogin } from "./pages/login/login";
import { AdminPanel } from "./pages/admin/admin";

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path="/admin" component={AdminPanel} />
            <div className="content-holder">
              <Header />
              <Route path="/" exact component={Home} />
              <Route path="/services" exact component={OurServices} />
              <Route path="/contact-us" exact component={ContactUs} />
              <Route path="/order" exact component={PlaceAnOrder} />
              <Route path="/login" exact component={AdminLogin} />
              <Footer />
            </div>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
