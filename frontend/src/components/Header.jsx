import { useState, useEffect } from "react";
import { Sun, Moon, Settings, LogOut, Car, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "./services/Api";

const Header = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="flex items-center justify-between px-6 py-3.5">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Car Rent Dashboard
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              Manage your fleet efficiently
            </p>
          </div>
        </div>

        {/* Right: User Info + Actions */}
        <div className="flex items-center gap-2">
          {/* User Profile Section */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
              >
                {/* Avatar */}
                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                
                {/* User Info */}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white leading-tight">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email || "Administrator"}
                  </p>
                </div>
                
                <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {user.email || "admin@carrental.com"}
                    </p>
                  </div>
                  
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate("/settings");
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-700 mx-2" />

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group relative"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Settings Button (Mobile - shows outside dropdown) */}
          <button
            onClick={() => navigate("/settings")}
            className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Quick Logout (Mobile) */}
          <button
            onClick={handleLogout}
            className="md:hidden p-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;