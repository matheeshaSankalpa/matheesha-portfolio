import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import WorkPage from './pages/WorkPage'
import VideosPage from './pages/VideosPage'
import BlogsPage from './pages/BlogsPage'
import SkillsPage from './pages/SkillsPage'
import ContactPage from './pages/ContactPage'
import TimelinePage from './pages/TimelinePage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}