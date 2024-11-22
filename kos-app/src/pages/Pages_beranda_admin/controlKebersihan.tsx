// pages/admin/TaskPage.tsx
import React from "react";
import TaskTable from "../../../my-frontend/src/components/TaskTable";

const TaskPage: React.FC = () => {
  return (
    <div>
      <h1>Manajemen Tugas</h1>
      <TaskTable />
    </div>
  );
};

export default TaskPage;
