"use client";

import { Button } from "@/components/ui/button";

type DashboardProps = {
  refetch: () => void | Promise<void>;
  analytics: any;
};

const Dashboard = ({ refetch, analytics }: DashboardProps) => {
  console.log(analytics);
  return (
    <div>
      <Button type="button" onClick={refetch}>
        Refetch
      </Button>
    </div>
  );
};
export default Dashboard;
