import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Contacts from './components/contacts/Contacts';
import {Provider} from './components/context';
import Navbar from './components/navbar/Navbar';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import About from './components/pages/About';
import PageNotFound from './components/pages/PageNotFound';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  
  return (
    <Provider>
    <Router>
    <div className="App">
      <Navbar title = "contacts list"/>
      <Switch>
      <Route exact path = "/" component = {Contacts} />
      <Route exact path = "/contacts/addcontact" component = {AddContact} />
      <Route exact path = "/about/:id" component = {About} />
      <Route exact path = "/contacts/editcontact/:id" component = {EditContact} />
      <Route  component = {PageNotFound} />
      </Switch>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
