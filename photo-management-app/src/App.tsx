import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import UploadPage from "./pages/UploadPage";
import GalleyPage from "./pages/GalleyPage";
import AlbumsPage from "./pages/AlbumsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/gallery" element={<GalleyPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
