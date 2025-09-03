import React, { useState } from "react";
import { navImg } from "../constants/index.js";
import {Menu, ShoppingCart, X} from "lucide-react";
import {NavLink} from "react-router-dom";
import AccountMenu from "../components/AccountMenu.jsx";

const NavBar = ({ title, subtitle, showButton = true }) => {
  const [isOpen, setIsOpen] = useState(false);

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
