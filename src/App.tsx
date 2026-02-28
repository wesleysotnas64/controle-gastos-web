import { BrowserRouter, Routes, Route } from "react-router-dom";
import PeopleManagerPage from "./pages/PeopleManagerPage/PeopleManagerPage";
import Header from "./components/Header/Header";
import CategoryManagerPage from "./pages/CategoryManagerPage/CategoryManagerPage";
import TransactionManagerPage from "./pages/TransactionManagerPage/TransactionManagerPage";
import DashboardManagerPage from "./pages/DashboardManagerPage/DashboardManagerPage";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {

  return (
    <BrowserRouter>
      <div className="main-page">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<DashboardManagerPage />} />
            <Route path="/transacoes" element={<TransactionManagerPage />} />
            <Route path="/pessoas" element={<PeopleManagerPage />} />
            <Route path="/categorias" element={<CategoryManagerPage />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App
