import React, { useState, useEffect, useContext } from 'react';
import { Users, Shield, User } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { getAdminCount, getRegularUserCount } from '../services/Api';
import { ThemeContext } from '../context/ThemeContext';

const UsersCountChart = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [regularUserCount, setRegularUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const [adminsResponse, usersResponse] = await Promise.all([
        getAdminCount(),
        getRegularUserCount()
      ]);

      const admins = adminsResponse?.count ?? 0;
      const users = usersResponse?.count ?? 0;

      // * test block
      console.log('Fetched Admin Count:', admins);
      console.log('Fetched Regular User Count:', users);

      setAdminCount(admins);
      setRegularUserCount(users);
      // * test block
      console.log('Admin Count:', admins);
      console.log('Regular User Count:', users);

    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);


  const totalUsers = adminCount + regularUserCount;

  // Chart data - Admin vs Regular Users
  const chartData = [
    { name: 'Administrators', value: adminCount, type: 'admin' },
    { name: 'Regular Users', value: regularUserCount, type: 'user' }
  ];

  const COLORS = {
    admin: darkMode ? '#f59e0b' : '#f59e0b', // Amber for admins
    user: darkMode ? '#8b5cf6' : '#4f46e5'   // Purple/Indigo for users
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / totalUsers) * 100).toFixed(1);
      return (
        <div style={{
          backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          border: darkMode ? '1px solid #374151' : '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: darkMode 
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' 
            : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          backdropFilter: 'blur(8px)'
        }}>
          <p style={{ 
            color: darkMode ? '#f9fafb' : '#1e293b', 
            fontWeight: '600',
            marginBottom: '4px',
            fontSize: '14px'
          }}>
            {payload[0].name}
          </p>
          <p style={{ 
            color: darkMode ? '#f3f4f6' : '#1e293b',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {payload[0].value.toLocaleString()} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className={`w-full max-w-sm rounded-xl p-4 border transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900/60 border-gray-700' 
          : 'bg-gradient-to-br from-slate-50 to-blue-50/30 border-slate-100'
      }`}>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-sm rounded-xl p-4 border transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900/60 border-gray-700' 
        : 'bg-gradient-to-br from-slate-50 to-blue-50/30 border-slate-100'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`${
            darkMode 
              ? 'bg-gradient-to-br from-indigo-600 to-purple-700' 
              : 'bg-gradient-to-br from-blue-600 to-indigo-600'
          } w-9 h-9 rounded-lg flex items-center justify-center shadow-lg`}>
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`text-sm font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              User Distribution
            </h3>
            <p className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              System users breakdown
            </p>
          </div>
        </div>
      </div>

      {/* Total Users Card */}
      <div className={`mb-4 p-3 rounded-lg border ${
        darkMode 
          ? 'bg-gray-800/50 border-gray-700' 
          : 'bg-white/50 border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Total Users
          </span>
          <span className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {totalUsers.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-center gap-4 mb-4">
        {/* Pie Chart */}
        <div className="h-40 w-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <filter id="solidShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" 
                    floodColor={darkMode ? "#000000" : "#000000"} 
                    floodOpacity="0.25"/>
                </filter>
              </defs>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="0%"
                outerRadius="100%"
                paddingAngle={2}
                dataKey="value"
                animationDuration={1200}
                animationEasing="ease-out"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.type === 'admin' ? COLORS.admin : COLORS.user}
                    stroke={darkMode ? '#1F2937' : '#FFFFFF'}
                    strokeWidth={3}
                    filter="url(#solidShadow)"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats on the side */}
        <div className="flex-1 space-y-3">
          {/* Total Users */}
          <div className={`p-2.5 rounded-lg border ${
            darkMode 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/50 border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Users
              </span>
              <span className={`text-lg font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {totalUsers.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Admins */}
          <div className={`p-2.5 rounded-lg border ${
            darkMode 
              ? 'bg-amber-900/20 border-amber-800/30' 
              : 'bg-amber-50 border-amber-200'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <Shield className={`w-3.5 h-3.5 ${
                darkMode ? 'text-amber-400' : 'text-amber-600'
              }`} />
              <span className={`text-xs font-medium ${
                darkMode ? 'text-amber-300' : 'text-amber-700'
              }`}>
                Admins
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-lg font-bold ${
                darkMode ? 'text-amber-400' : 'text-amber-600'
              }`}>
                {adminCount.toLocaleString()}
              </span>
              <span className={`text-xs ${
                darkMode ? 'text-amber-400/70' : 'text-amber-600/70'
              }`}>
                ({((adminCount / totalUsers) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>

          {/* Regular Users */}
          <div className={`p-2.5 rounded-lg border ${
            darkMode 
              ? 'bg-purple-900/20 border-purple-800/30' 
              : 'bg-indigo-50 border-indigo-200'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <User className={`w-3.5 h-3.5 ${
                darkMode ? 'text-purple-400' : 'text-indigo-600'
              }`} />
              <span className={`text-xs font-medium ${
                darkMode ? 'text-purple-300' : 'text-indigo-700'
              }`}>
                Users
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-lg font-bold ${
                darkMode ? 'text-purple-400' : 'text-indigo-600'
              }`}>
                {regularUserCount.toLocaleString()}
              </span>
              <span className={`text-xs ${
                darkMode ? 'text-purple-400/70' : 'text-indigo-600/70'
              }`}>
                ({((regularUserCount / totalUsers) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={`p-3 rounded-lg border ${
        darkMode 
          ? 'bg-gray-800/30 border-gray-700/50' 
          : 'bg-white/30 border-gray-200/50'
      }`}>
        <div className={`text-xs font-medium mb-2 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Distribution Summary
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-amber-500"></div>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Admins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-sm ${darkMode ? 'bg-purple-500' : 'bg-indigo-500'}`}></div>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Users</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersCountChart;