import UsersCountChart from "./charts/UsersCountChart";
import Header from "./Header";
import ActiveRentalsTable from "./pages/admin/RentalsTable";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-1">
        <Header/>
      <h1 className="text-3xl font-bold">Welcome, {user?.name || "User"}!</h1>
      <p className="mt-4">This is your dashboard.</p>
      <UsersCountChart/>
      <ActiveRentalsTable/>
    </div>
  );
};

export default Dashboard;
