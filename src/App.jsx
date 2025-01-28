import react from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import MahaMumbai from "./pages/MahaMumbai";
import AboutUsPage from './pages/AboutUsPage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/project" element={<ProjectsPage />} />
        <Route path="/service" element={<ServicesPage />} />
        <Route path="/mahamumbai" element={<MahaMumbai />} />
      </Routes>
    <Footer/>
    </div>
  );
}
