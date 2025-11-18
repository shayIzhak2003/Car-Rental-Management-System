import React, { useState, useEffect, useContext } from 'react';
import { Users } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { getAllUsers } from '../services/Api';
import { ThemeContext } from '../context/ThemeContext';

const UsersChart = () => {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers();
        const users = response.data || response;
        setUserCount(Array.isArray(users) ? users.length : 0);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Simple pie chart data
  const maxCapacity = Math.max(userCount * 2, 100);
  const chartData = [
    { name: 'Active Users', value: userCount },
    { name: 'Available Capacity', value: maxCapacity - userCount }
  ];

  const COLORS = {
    activeUsers: darkMode ? '#8b5cf6' : '#4f46e5',
    available: darkMode ? '#374151' : '#e2e8f0'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
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
            {payload[0].value.toLocaleString()} users
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
        <div className="flex items-center justify-center h-56">
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
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`${
            darkMode 
              ? 'bg-gradient-to-br from-indigo-600 to-purple-700' 
              : 'bg-gradient-to-br from-blue-600 to-indigo-600'
          } w-8 h-8 rounded-lg flex items-center justify-center shadow-lg`}>
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className={`text-sm font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Total Users
            </h3>
          </div>
        </div>
        <div className={`text-2xl font-bold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {userCount.toLocaleString()}
        </div>
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="pieGradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={darkMode ? "#8b5cf6" : "#4f46e5"} stopOpacity={0.9}/>
                <stop offset="100%" stopColor={darkMode ? "#06b6d4" : "#06b6d4"} stopOpacity={0.7}/>
              </linearGradient>
              <filter id="pieShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" 
                  floodColor={darkMode ? "#8b5cf6" : "#4f46e5"} 
                  floodOpacity="0.3"/>
              </filter>
            </defs>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="75%"
              paddingAngle={3}
              dataKey="value"
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? (darkMode ? "url(#pieGradient1)" : "url(#pieGradient1)") : COLORS.available}
                  stroke={darkMode ? '#1F2937' : '#FFFFFF'}
                  strokeWidth={3}
                  filter={index === 0 ? "url(#pieShadow)" : "none"}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsersChart;