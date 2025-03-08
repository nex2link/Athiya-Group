
import { Routes, Route } from 'react-router-dom';
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import MahaMumbai from "./pages/MahaMumbai";
import AboutUsPage from './pages/AboutUsPage';
import ProjectsPage from './pages/ProjectsPage';
import ServicePage from './pages/ServicePage';
import ScrollToTop from './components/ScrollToTop';
import ContactUsPage from './pages/ContactusPage';
import GalleryPage from "./components/GalleryPage"


export default function App() {
  return (
    <div>
      <Navbar />
        <ScrollToTop/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/project" element={<ProjectsPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/mahamumbai" element={<MahaMumbai />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    <Footer/>
    </div>
  );
}
