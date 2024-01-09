import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";
import AdminDashboard from './Pages/AdminDashboard.tsx';
import LandingPage from "./Pages/LandingPage.tsx";
import BookStorePage from "./Pages/BookStorePage.tsx"
import AddBooksPage from "./Pages/AddBooksPage.tsx";
import UserBookListPage from "./Pages/UserBookListPage.tsx";
import UserListPage from "./Pages/UserListPage.tsx";
import MyBooksPage from "./Pages/MyBooksPage.tsx";
import BookDetailsPage from "./Pages/BookDetailsPage.tsx";
import CheckOutPage from "./Pages/CheckOutPage.tsx";

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
        <Route exact path="/home" element={<LandingPage />} />
        <Route exact path="/bookstore" element={<BookStorePage />} />
        <Route exact path="/addbooks" element={<AddBooksPage />} />
        <Route exact path="/mybooks" element={<MyBooksPage />} />
        <Route exact path="/userbooklist" element={<UserBookListPage />} />
        <Route exact path="/userlist" element={<UserListPage />} />
        <Route exact path="/bookdetails/:id" element={<BookDetailsPage />} />
        <Route exact path="/details/:id" element={<CheckOutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
