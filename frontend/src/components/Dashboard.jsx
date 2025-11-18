import UsersChart from "./charts/UsersChart";
import Header from "./Header";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-1">
        <Header/>
      <h1 className="text-3xl font-bold">Welcome, {user?.name || "User"}!</h1>
      <p className="mt-4">This is your dashboard.</p>
      <UsersChart/>
    </div>
  );
};

export default Dashboard;
