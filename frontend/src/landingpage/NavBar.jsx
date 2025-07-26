import { useState ,useEffect} from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../authCheckfunction/AuthProvider";


export default function Navbar() {
  const auth=useContext(AuthContext);
  if(!auth) return null;
  const {isLoggedIn,setIsLoggedIn,checkAuth}=auth;
  const [isOpen, setIsOpen] = useState(false);
 


  

  const navigater=useNavigate();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#" },
    { name: "Features", href: "#" },
  ];

  const  handleLoginbtn=()=>{
    navigater('/login');

  }
  const  handleSingupbtn=()=>{
    navigater('/signup');



  }

  // handleLogoutBtn
  const handleLogoutBtn=async()=>{
try{

    const res =await fetch("http://localhost:8000/logout",{method:"POST",credentials:"include"})

if(res.ok){
  setIsLoggedIn(false);

  navigater("/");
}
}catch(error){

  console.error("Logout failed:",error);
}

  };

  

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto   grid grid-cols-2 sm:grid-cols-2 items-center">
        
        {/* Left: Logo + Brand */}
        <div className="flex items-center gap-2">
          <img src="../src/assets/MainLogo.png" alt="Logo" className="h-26 w-26" />
          
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:flex justify-end items-center space-x-6">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-gray-700 hover:text-teal-600 font-medium">
              {link.name}
            </a>
          ))}

          
          {!isLoggedIn ?(

<>
            <button className="text-red-50 font-medium bg-teal-600 p-1 hover:bg-teal-700 " style={{borderRadius:'5px'}} onClick={handleLoginbtn} >Log in</button>
            <button className="text-red-50 font-medium bg-teal-600 p-1 hover:bg-teal-700 "style={{borderRadius:'5px'}} onClick={handleSingupbtn}>Sign up</button>
</>
          ):(<button className="text-red-50 font-medium bg-teal-600 p-1 hover:bg-teal-700 "style={{borderRadius:'5px'}} onClick={handleLogoutBtn}>Log Out</button>)}


        </div>

        {/* Mobile Menu Button */}
        <div className="flex justify-end sm:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden overflow-hidden bg-white border-t"
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-700 font-medium">
                  {link.name}
                </a>
              ))}
              
              
              {!isLoggedIn &&(
                <>
              
              <button className="text-gray-50 font-medium bg-teal-600 p-1 " onClick={handleLoginbtn} style={{borderRadius:'5px'}}>Log in</button>
              <button className="text-gray-50 font-medium bg-teal-600 p-1  " onClick={handleSingupbtn} style={{borderRadius:'5px'}}>Sign up</button>

              
              
              </>)}
{isLoggedIn &&( 


                 <button className="text-gray-50 font-medium bg-teal-600 p-1  " onClick={handleLogoutBtn} style={{borderRadius:'5px'}}>Logout</button>
)}
              

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

