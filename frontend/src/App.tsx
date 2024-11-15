import React from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Nav from './components/ui/Nav';
import AddContact from './components/AddContact/AddContact';
import EditContact from './components/EditContact/EditContact';

function App() {
  return (
    <div className="App">
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<AddContact />} path='/addcontact' />
          <Route path="/edit-contact/:contactId" element={<EditContact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
