import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ServiceList from './components/ServiceList';
import Booking from './components/Booking';
import ServiceDetails from './components/ServiceDetails';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Hero} />
                    <Route path="/services" exact component={ServiceList} />
                    <Route path="/services/:id/book" component={Booking} />
                    <Route path="/services/:id" component={ServiceDetails} />
                    <Route path="/admin" component={AdminDashboard} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
