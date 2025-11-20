import { useContext } from "react";
import UsersCountChart from "./charts/UsersCountChart";
import Header from "./Header";
import ActiveRentalsTable from "./pages/admin/RentalsTable";
import { ThemeContext } from "./context/ThemeContext";
import { LayoutDashboard, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-gray-950' : 'bg-gray-50'
    }`}>
      <Header />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className={`mb-8 p-6 rounded-xl border transition-all duration-300 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900/60 border-gray-700' 
            : 'bg-gradient-to-br from-white to-blue-50/30 border-slate-100'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`${
              darkMode 
                ? 'bg-gradient-to-br from-indigo-600 to-purple-700' 
                : 'bg-gradient-to-br from-blue-600 to-indigo-600'
            } w-14 h-14 rounded-xl flex items-center justify-center shadow-lg`}>
              <LayoutDashboard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Welcome back, {user?.name || "User"}!
              </h1>
              <p className={`mt-1 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Here's what's happening with your car rental business today.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* User Chart - Takes 1 column */}
          <div>
            <UsersCountChart />
          </div>

          {/* Quick Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Active Rentals Stat */}
            <div className={`p-6 rounded-xl border transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900/60 border-gray-700' 
                : 'bg-gradient-to-br from-slate-50 to-blue-50/30 border-slate-100'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`${
                  darkMode 
                    ? 'bg-gradient-to-br from-green-600 to-emerald-700' 
                    : 'bg-gradient-to-br from-green-500 to-emerald-600'
                } w-10 h-10 rounded-lg flex items-center justify-center shadow-lg`}>
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className={`text-sm font-semibold mb-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Active Rentals
              </h3>
              <p className={`text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                --
              </p>
              <p className={`text-xs mt-2 ${
                darkMode ? 'text-green-400' : 'text-green-600'
              }`}>
                +12% from last month
              </p>
            </div>

            {/* Revenue Stat */}
            <div className={`p-6 rounded-xl border transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900/60 border-gray-700' 
                : 'bg-gradient-to-br from-slate-50 to-blue-50/30 border-slate-100'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`${
                  darkMode 
                    ? 'bg-gradient-to-br from-amber-600 to-orange-700' 
                    : 'bg-gradient-to-br from-amber-500 to-orange-600'
                } w-10 h-10 rounded-lg flex items-center justify-center shadow-lg`}>
                  <span className="text-white text-lg font-bold">$</span>
                </div>
              </div>
              <h3 className={`text-sm font-semibold mb-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Monthly Revenue
              </h3>
              <p className={`text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                --
              </p>
              <p className={`text-xs mt-2 ${
                darkMode ? 'text-amber-400' : 'text-amber-600'
              }`}>
                +8% from last month
              </p>
            </div>

            {/* Available Cars Stat */}
            <div className={`p-6 rounded-xl border transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900/60 border-gray-700' 
                : 'bg-gradient-to-br from-slate-50 to-blue-50/30 border-slate-100'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`${
                  darkMode 
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-700' 
                    : 'bg-gradient-to-br from-blue-500 to-cyan-600'
                } w-10 h-10 rounded-lg flex items-center justify-center shadow-lg`}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                  </svg>
                </div>
              </div>
              <h3 className={`text-sm font-semibold mb-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Available Cars
              </h3>
              <p className={`text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                --
              </p>
              <p className={`text-xs mt-2 ${
                darkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Ready to rent
              </p>
            </div>

            {/* Pending Requests Stat */}
            <div className={`p-6 rounded-xl border transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900/60 border-gray-700' 
                : 'bg-gradient-to-br from-slate-50 to-blue-50/30 border-slate-100'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`${
                  darkMode 
                    ? 'bg-gradient-to-br from-purple-600 to-pink-700' 
                    : 'bg-gradient-to-br from-purple-500 to-pink-600'
                } w-10 h-10 rounded-lg flex items-center justify-center shadow-lg`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className={`text-sm font-semibold mb-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Pending Requests
              </h3>
              <p className={`text-3xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                --
              </p>
              <p className={`text-xs mt-2 ${
                darkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                Needs attention
              </p>
            </div>
          </div>
        </div>

        {/* Active Rentals Table */}
        <div>
          <ActiveRentalsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;