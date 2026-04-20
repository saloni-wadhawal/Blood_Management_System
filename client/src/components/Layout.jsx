import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer"
export default function Layout({ children }) {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="ml-64 w-full">
        
        {/* ✅ Navbar added here */}
        <Navbar />

        {/* Page Content */}
        <div className="p-6 bg-gray-100 min-h-screen">
          {children}
        </div>
         
         <Footer />
      </div>
    </div>
  );
}