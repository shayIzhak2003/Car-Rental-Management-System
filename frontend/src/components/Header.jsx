import { useState, useEffect, useContext } from "react";
import { Sun, Moon, Settings, LogOut, Car, ChevronDown, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "./services/Api";
import { ThemeContext } from "./context/ThemeContext";

const Header = () => {
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header
      className={`${
        darkMode 
          ? 'bg-gray-900/95 border-gray-800' 
          : 'bg-white/95 border-gray-200'
      } border-b sticky top-0 z-50 backdrop-blur-md shadow-sm transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo & Brand */}
          <div className="flex items-center gap-3">
            <div 
              className={`${
                darkMode 
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-700' 
                  : 'bg-gradient-to-br from-blue-600 to-indigo-600'
              } w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200`}
            >
              <Car className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 
                className={`text-xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                } transition-colors duration-200`}
              >
                Car Rent Dashboard
              </h1>
              <p 
                className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } transition-colors duration-200`}
              >
                Manage your fleet efficiently
              </p>
            </div>
          </div>

          {/* Right: Actions & User Menu */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-lg ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              } transition-all duration-200 group`}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Divider */}
            <div 
              className={`hidden md:block w-px h-8 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-300'
              } transition-colors duration-200`}
            />

            {/* User Profile & Menu */}
            {user && (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                    darkMode 
                      ? 'hover:bg-gray-800' 
                      : 'hover:bg-gray-100'
                  } transition-all duration-200 group`}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md ring-2 ring-offset-2 ring-transparent group-hover:ring-purple-400 transition-all duration-200">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    {/* Online Status Indicator */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  </div>

                  {/* User Info */}
                  <div className="hidden md:block text-left">
                    <p 
                      className={`text-sm font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      } leading-tight transition-colors duration-200`}
                    >
                      {user.name}
                    </p>
                    <p 
                      className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      } transition-colors duration-200`}
                    >
                      {user.email || "Administrator"}
                    </p>
                  </div>

                  {/* Dropdown Arrow */}
                  <ChevronDown
                    className={`w-4 h-4 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    } transition-all duration-300 ${
                      showUserMenu ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div 
                    className={`${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    } absolute right-0 mt-2 w-64 rounded-xl shadow-2xl border overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-top-2`}
                  >
                    {/* User Info Header */}
                    <div 
                      className={`px-4 py-4 ${
                        darkMode 
                          ? 'border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900' 
                          : 'border-gray-200 bg-gradient-to-br from-gray-50 to-white'
                      } border-b transition-colors duration-200`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <p 
                            className={`font-semibold ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            } transition-colors duration-200`}
                          >
                            {user.name}
                          </p>
                          <p 
                            className={`text-xs ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            } transition-colors duration-200`}
                          >
                            {user.email || "admin@carrental.com"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => {
                          navigate("/settings");
                          setShowUserMenu(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm ${
                          darkMode 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        } transition-all duration-200 group`}
                      >
                        <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                        <span className="font-medium">Settings</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm ${
                          darkMode 
                            ? 'text-red-400 hover:bg-red-900/20' 
                            : 'text-red-600 hover:bg-red-50'
                        } transition-all duration-200 group`}
                      >
                        <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile: Quick Settings & Logout */}
            <button
              onClick={() => navigate("/settings")}
              className={`md:hidden p-2.5 rounded-lg ${
                darkMode 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              } transition-all duration-200`}
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;