import MyBarChart from "@/components/MyBarChart";
import MyAreaChart from "@/components/MyAreaChart";
import MyPieChart from "@/components/MyPieChart";
import { Button } from "@/components/ui/button";
import { statistics } from "@/constants/statistics";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BadgeDollarSign, DollarSign, Users } from "lucide-react";
import StatCard from "@/components/StatCard";
function Dashboard() {
  const [stats, setStats] = useState("lastSevenDays");
  const handleStats = (duration) => {
    setStats(duration);
  };
  return (
    <div className="mt-2 w-full">
      <div className="flex items-center justify-between py-3">
        <h1>Dashboard</h1>
        <div className="hidden items-center justify-between gap-4 sm:flex">
          <Button
            variant="outline"
            className={`hover:text-cyan-400 ${stats === "lastSevenDays" ? "border-4 text-cyan-400" : ""}`}
            onClick={() => handleStats("lastSevenDays")}
          >
            Last 7 Days
          </Button>
          <Button
            variant="outline"
            className={`hover:text-cyan-400 ${stats === "lastThirtyDays" ? "border-4 text-cyan-400" : ""}`}
            onClick={() => handleStats("lastThirtyDays")}
          >
            Last 30 Days
          </Button>
          <Button
            variant="outline"
            className={`hover:text-cyan-400 ${stats === "lastNinetyDays" ? "border-4 text-cyan-400" : ""}`}
            onClick={() => handleStats("lastNinetyDays")}
          >
            Last 90 Days
          </Button>
        </div>
      </div>
      {/* Stat cards------- */}
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <StatCard title="Orders" data={statistics[stats].orders}>
          <BadgeDollarSign size={65} />
        </StatCard>
        <StatCard title="Revenue" data={`${statistics[stats].revenue} $`}>
          <DollarSign size={65} />
        </StatCard>
        <StatCard title="New Users" data={statistics[stats].newUsers}>
          <Users size={65} />
        </StatCard>
      </div>
      {/* Grid section------- */}
      <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        <div className="bg-primary-foreground rounded-lg p-4">
          <MyBarChart />
        </div>
        <div className="bg-primary-foreground rounded-lg p-4 lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          <MyAreaChart />
        </div>
        <div className="bg-primary-foreground rounded-lg p-4">
          <MyPieChart />
        </div>
        <div className="bg-primary-foreground flex flex-col gap-4 rounded-lg p-4">
          {statistics[stats].latestOrders.map((order) => {
            let badgeColor =
              order.status === "pending"
                ? "bg-yellow-400/50"
                : "bg-green-400/50";
            if (order.status === "canceled") badgeColor = "bg-red-400/50";

            return (
              <div className="flex items-center gap-4 border p-2 sm:gap-8">
                <span
                  className={`rounded-lg border px-4 py-1 text-xs sm:text-sm ${badgeColor}`}
                >
                  {order.status}
                </span>
                <p>{order.name}</p>
                <Link
                  to={`orders/${order.id}`}
                  className="ml-auto text-sm text-gray-600 underline"
                >
                  Take action
                </Link>
              </div>
            );
          })}
        </div>
        <div className="bg-primary-foreground rounded-lg p-4 lg:col-span-2 xl:col-span-1 2xl:col-span-2">
          Test
        </div>
        <div className="bg-primary-foreground rounded-lg p-4">Test</div>
      </div>
    </div>
  );
}

export default Dashboard;
