import Navbar from "./Navbar"; 
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mb-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;