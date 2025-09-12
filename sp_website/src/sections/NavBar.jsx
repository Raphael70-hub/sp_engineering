import React, {useEffect, useState} from "react";
import { navImg } from "../constants/index.js";
import {Menu, ShoppingCart, User2, X} from "lucide-react";
import {NavLink} from "react-router-dom";
import AccountMenu from "../components/AccountMenu.jsx";
import {getCurrentUser} from "../api/index.js";
import PlainNavBar from "../components/PlainNavBar.jsx";
import Footer from "./Footer.jsx";

const NavBar = ({ title, subtitle, showButton = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };
    loadUser();
  }, [user]);

  // if (!user) {
  //   return (
  //       <>
  //         <div className="flex items-center justify-center min-h-[60vh]">
  //           <p className="text-gray-500">Loading ...</p>
  //         </div>
  //         <Footer />
  //       </>
  //   );
  // }

  return (
      <div
          className="relative bg-cover bg-center h-screen"
          style={{
            backgroundImage: `url(${navImg})`,
          }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Navbar */}
        <div className="relative flex pt-10 px-10 justify-between items-center text-white">
          <p className="text-3xl font-bold">Sp Engineering</p>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                }
            >
              Home
            </NavLink>

            <NavLink
                to="/services"
                className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                }
            >
              Services
            </NavLink>

            <NavLink
                to="/products"
                className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                }
            >
              Products
            </NavLink>

            <NavLink
                to="/contact"
                className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                }
            >
              Contact
            </NavLink>

            <NavLink
                to="/about"
                className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                }
            >
              About
            </NavLink>

            <NavLink
                to="/cart"
                className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                }
            >
              <ShoppingCart className="w-6 h-6 inline-flex mx-3" />
              Cart
            </NavLink>

              <AccountMenu/>

            {user && user.role === "admin" && (
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                    }
                >
                  <User2 className="w-6 h-6 inline-flex mx-3" />
                  Admin
                </NavLink>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
            <div className="md:hidden z-10 absolute top-20 left-0 w-full bg-white/80 text-black flex flex-col items-center space-y-6 py-6">
              <NavLink
                  to="/"
                  className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                  }
              >
                Home
              </NavLink>

              <NavLink
                  to="/services"
                  className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                  }
              >
                Services
              </NavLink>

              <NavLink
                  to="/products"
                  className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                  }
              >
                Products
              </NavLink>

              <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                  }
              >
                Contact
              </NavLink>

              <NavLink
                  to="/about"
                  className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                  }
              >
                About
              </NavLink>

              <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                  }
              >
                <ShoppingCart className="w-6 h-6 inline-flex mx-3" />
                Cart
              </NavLink>
                <AccountMenu/>

              {user.role === "admin" && (
                  <NavLink
                      to="/admin/dashboard"
                      className={({ isActive }) =>
                          isActive ? "nav-link active-link" : "nav-link"
                      }
                  >
                    <User2 className="w-6 h-6 inline-flex mx-3" />
                    Admin
                  </NavLink>
              )}

            </div>
        )}

        {/* Hero Content */}
        <div className="relative flex flex-col items-start px-10 justify-center h-full text-left text-white">
          <h1 className="text-5xl font-bold">{title}</h1>
          {subtitle && <p className="mt-4 text-lg">{subtitle}</p>}
          {showButton && (
              <NavLink to="/products" className="btn mt-6">
                Shop Now
              </NavLink>
          )}
        </div>
      </div>
  );
};

export default NavBar;
