import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";

function AppLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center px-6 pt-24">
              <div className="text-center max-w-sm">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  404
                </h1>
                <p className="text-sm text-gray-500 mb-6">
                  Page not found.
                </p>
                <a
                  href="/"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 underline underline-offset-2"
                >
                  Back to home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
