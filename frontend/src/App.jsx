import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Personalpg from './components/Personalpg';
import Resume from './components/Resume';
import Homepage from './components/Homepage';
import Homepg from './components/Homepg';
import Educationpg from './components/Educationpg';
import Skillpg from './components/Skillpg';
import Projectpg from './components/Projectpg';
import ExperiencePage from './components/ExperiencePage';
import ContactUs from './components/ContactUs';

const App = () => {
  return (
    <Router>
      <Routes>
       
      
        
        <Route path="/Personalpg" element={<Personalpg />} />
        <Route path="/Resume" element={<Resume />} />
        <Route path="/" element={< Homepage/>} />
        <Route path="/Homepg" element={< Homepg/>} />
        <Route path="/Educationpage" element={<Educationpg/>} />
        <Route path="/Skillpg" element={<Skillpg/>} />
        <Route path="/Projectpg" element={<Projectpg/>} />
        <Route path="/experiencepg" element={<ExperiencePage/>} />
        <Route path="/ContactUs" element={<ContactUs/>} />
        

      
       
       
        
      </Routes>
    </Router>
  );
};

export default App;
