import React, { useState, useEffect, useContext } from "react";
import { getActiveRentals } from "../../services/rentalApi";
import { ThemeContext } from "../../context/ThemeContext";
import { Eye, Edit, XCircle, Car, ChevronUp, ChevronDown, Calendar } from "lucide-react";
import UpdateRentalStatusModal from "./UpdateRentalModal";

const ActiveRentalsTable = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("startDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const itemsPerPage = 5;
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        const response = await getActiveRentals();
        setRentals(response);
        console.log("Fetched Rentals:", response);
      } catch (err) {
        console.error("Failed to fetch rentals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  useEffect(() => {
    console.log("Updated rentals state:", rentals);
  }, [rentals]);

  // Sorting function
  const sortedRentals = [...rentals].sort((a, b) => {
    if (sortOrder === "asc") return a[sortBy] > b[sortBy] ? 1 : -1;
    else return a[sortBy] < b[sortBy] ? 1 : -1;
  });

  // Pagination
  const totalPages = Math.ceil(sortedRentals.length / itemsPerPage);
  const paginatedRentals = sortedRentals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // Modal functions
  const handleOpenUpdateModal = (rental) => {
    setSelectedRental(rental);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedRental(null);
  };

  const handleRentalUpdated = (updatedRental) => {
    // Update the rental in the list
    setRentals(rentals.map(rental => 
      rental._id === updatedRental._id ? updatedRental : rental
    ));
  };

  if (loading) {
    return (
      <div className={`rounded-xl p-6 border transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900/60 border-gray-700' 
          : 'bg-gradient-to-br from-slate-50 to-blue-50/30 border-slate-100'
      }`}>
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`rounded-xl border transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900/60 border-gray-700' 
          : 'bg-gradient-to-br from-slate-50 to-blue-50/30 border-slate-100'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`${
                darkMode 
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-700' 
                  : 'bg-gradient-to-br from-blue-600 to-indigo-600'
              } w-10 h-10 rounded-xl flex items-center justify-center shadow-lg`}>
                <Car className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className={`text-lg font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  Active Rentals
                </h2>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {rentals.length} total rentals
                </p>
              </div>
            </div>
            <div className={`px-3 py-1.5 rounded-lg ${
              darkMode 
                ? 'bg-green-900/30 text-green-400' 
                : 'bg-green-100 text-green-700'
            }`}>
              <span className="text-sm font-semibold">Live</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${
                darkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'
              }`}>
                {[
                  { label: "User", key: "name" },
                  { label: "Car", key: "car" },
                  { label: "Start Date", key: "startDate" },
                  { label: "End Date", key: "endDate" },
                  { label: "Status", key: "status" },
                  { label: "Actions", key: null }
                ].map((col) => (
                  <th
                    key={col.label}
                    onClick={() => col.key && toggleSort(col.key)}
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                      col.key ? 'cursor-pointer hover:bg-opacity-75' : ''
                    } ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    <div className="flex items-center gap-2">
                      {col.label}
                      {col.key && sortBy === col.key && (
                        sortOrder === "asc" 
                          ? <ChevronUp className="w-4 h-4" /> 
                          : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${
              darkMode ? 'divide-gray-700/50' : 'divide-gray-200/50'
            }`}>
              {paginatedRentals.map((rental) => (
                <tr 
                  key={rental._id} 
                  className={`transition-colors duration-150 ${
                    darkMode 
                      ? 'hover:bg-gray-800/30' 
                      : 'hover:bg-white/50'
                  }`}
                >
                  <td className={`px-6 py-4 ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                        darkMode 
                          ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white' 
                          : 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white'
                      }`}>
                        {rental?.user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span className="font-medium">{rental?.user?.name || 'Unknown User'}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}>
                    {rental?.car?.brand} {rental?.car?.model}
                  </td>
                  <td className={`px-6 py-4 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(rental.startDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(rental.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center ${
                      rental.status === "active" 
                        ? darkMode 
                          ? "bg-green-900/30 text-green-400 border border-green-800/30" 
                          : "bg-green-100 text-green-700 border border-green-200"
                        : rental.status === "pending" 
                        ? darkMode 
                          ? "bg-yellow-900/30 text-yellow-400 border border-yellow-800/30" 
                          : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        : darkMode 
                          ? "bg-red-900/30 text-red-400 border border-red-800/30" 
                          : "bg-red-100 text-red-700 border border-red-200"
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        rental.status === "active" ? "bg-green-500" :
                        rental.status === "pending" ? "bg-yellow-500" : "bg-red-500"
                      }`}></div>
                      {rental.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode 
                            ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        }`}
                        title="View details"
                      >
                        <Eye className="w-4 h-4"/>
                      </button>
                      <button
                        onClick={() => handleOpenUpdateModal(rental)} 
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode 
                            ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        }`}
                        title="Edit rental"
                      >
                        <Edit className="w-4 h-4"/>
                      </button>
                      <button 
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode 
                            ? 'hover:bg-red-900/20 text-red-400 hover:text-red-300' 
                            : 'hover:bg-red-50 text-red-600 hover:text-red-700'
                        }`}
                        title="Cancel rental"
                      >
                        <XCircle className="w-4 h-4"/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`px-6 py-4 border-t flex items-center justify-between ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, rentals.length)} of {rentals.length} rentals
          </div>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 1
                  ? darkMode 
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Previous
            </button>
            <span className={`px-4 py-2 rounded-lg font-semibold ${
              darkMode 
                ? 'bg-indigo-600 text-white' 
                : 'bg-indigo-600 text-white'
            }`}>
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === totalPages
                  ? darkMode 
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      <UpdateRentalStatusModal
        show={openUpdateModal}
        onClose={handleCloseUpdateModal}
        rental={selectedRental}
        onUpdated={handleRentalUpdated}
      />
    </>
  );
};

export default ActiveRentalsTable;