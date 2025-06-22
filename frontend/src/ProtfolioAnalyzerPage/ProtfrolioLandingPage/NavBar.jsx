import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // optional, or use SVGs

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-white relative z-50">
      {/* Logo */}
      <div className="pl-4 md:pl-20 flex items-center">
      <a href="/">
        <img src="../../src/assets/MainLogo.png" alt="Logo" className="w-24 h-24" />
        
        </a>  
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 pr-4 md:pr-20">
        <a href="#" className="text-gray-700 hover:text-teal-500">Dashboard</a>
        <a href="#" className="text-gray-700 hover:text-teal-500">Portfolio</a>
        <a href="#" className="text-gray-700 hover:text-teal-500">Watchlist</a>
        <a href="#" className="text-gray-700 hover:text-teal-500">Orders</a>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden pr-4 z-50">
        <button onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sliding Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="p-6 space-y-4">
          <button className="mb-4" onClick={toggleMenu}><X size={24} /></button>
          <a href="#" className="block text-gray-700 hover:text-teal-500">Dashboard</a>
          <a href="#" className="block text-gray-700 hover:text-teal-500">Portfolio</a>
          <a href="#" className="block text-gray-700 hover:text-teal-500">Watchlist</a>
          <a href="#" className="block text-gray-700 hover:text-teal-500">Orders</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
