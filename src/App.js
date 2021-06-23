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
        <Header />
        <div className="content-holder">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/services" exact component={OurServices} />
            <Route path="/contact-us" exact component={ContactUs} />
            <Route path="/order" exact component={PlaceAnOrder} />
            <Route path="/admin" component={AdminPanel} />
            <Route path="/login" exact component={AdminLogin} />
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
