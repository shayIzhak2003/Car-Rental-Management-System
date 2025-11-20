import React, { useState, useEffect, useContext } from "react";
import { updateRental } from "../../services/rentalApi";
import { ThemeContext } from "../../context/ThemeContext";
import { X, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

const UpdateRentalStatusModal = ({ show, onClose, rental, onUpdated }) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (rental) {
      setStatus(rental.status);
      setError("");
    }
  }, [rental]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      const updated = await updateRental(rental._id, { status });
      onUpdated(updated);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  const statusOptions = [
    { 
      value: "ongoing", 
      label: "Ongoing", 
      icon: Clock,
      color: darkMode ? "text-blue-400" : "text-blue-600",
      bg: darkMode ? "bg-blue-900/20 border-blue-800/30" : "bg-blue-50 border-blue-200"
    },
    { 
      value: "completed", 
      label: "Completed", 
      icon: CheckCircle,
      color: darkMode ? "text-green-400" : "text-green-600",
      bg: darkMode ? "bg-green-900/20 border-green-800/30" : "bg-green-50 border-green-200"
    },
    { 
      value: "canceled", 
      label: "Canceled", 
      icon: XCircle,
      color: darkMode ? "text-red-400" : "text-red-600",
      bg: darkMode ? "bg-red-900/20 border-red-800/30" : "bg-red-50 border-red-200"
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className={`pointer-events-auto w-full max-w-md rounded-2xl shadow-2xl border transition-all duration-300 transform ${
            darkMode 
              ? 'bg-gray-900 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`px-6 py-4 border-b flex items-center justify-between ${
            darkMode 
              ? 'border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900/60' 
              : 'border-gray-200 bg-gradient-to-br from-slate-50 to-blue-50/30'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`${
                darkMode 
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-700' 
                  : 'bg-gradient-to-br from-blue-600 to-indigo-600'
              } w-10 h-10 rounded-xl flex items-center justify-center shadow-lg`}>
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Update Rental Status
                </h3>
                <p className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {rental?.carName} - {rental?.userName}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            {error && (
              <div className={`mb-4 p-3 rounded-lg border flex items-start gap-3 ${
                darkMode 
                  ? 'bg-red-900/20 border-red-800/30 text-red-400' 
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <label className={`block text-sm font-semibold mb-3 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Select New Status
            </label>

            <div className="space-y-3">
              {statusOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = status === option.value;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => setStatus(option.value)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? option.bg
                        : darkMode 
                          ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600' 
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`${
                        isSelected 
                          ? option.color 
                          : darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold ${
                          isSelected 
                            ? option.color 
                            : darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </p>
                      </div>
                      {isSelected && (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-indigo-600' : 'bg-indigo-600'
                        }`}>
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current Status Info */}
            <div className={`mt-4 p-3 rounded-lg ${
              darkMode 
                ? 'bg-gray-800/50 border border-gray-700' 
                : 'bg-gray-50 border border-gray-200'
            }`}>
              <p className={`text-xs font-medium mb-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Current Status
              </p>
              <p className={`text-sm font-semibold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {rental?.status?.charAt(0).toUpperCase() + rental?.status?.slice(1)}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className={`px-6 py-4 border-t flex items-center justify-end gap-3 ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              onClick={onClose}
              disabled={loading}
              className={`px-4 py-2.5 rounded-lg font-semibold transition-all ${
                darkMode 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || status === rental?.status}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                loading || status === rental?.status
                  ? 'opacity-50 cursor-not-allowed'
                  : darkMode 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
              } text-white shadow-lg`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateRentalStatusModal;