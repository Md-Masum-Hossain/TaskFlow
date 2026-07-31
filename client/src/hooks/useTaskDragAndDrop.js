import { useState } from "react";

export function useTaskDragAndDrop(updateTask, tasks, setTasks) {
  const [activeTask, setActiveTask] = useState(null);

  const resolveStatusFromOver = (overId) => {
    if (
      overId === "todo" ||
      overId === "in-progress" ||
      overId === "completed"
    ) {
      return overId;
    }

    const overTask = tasks.find((task) => task._id === overId);

    return overTask?.status || null;
  };

  const handleDragStart = ({ active }) => {
    const task = tasks.find(t => t._id === active.id);
    setActiveTask(task);
  };

  const handleDragOver = ({ active, over }) => {
    if (!over) return;

    const activeTask = tasks.find(t => t._id === active.id);

    if (!activeTask) return;

    const newStatus = resolveStatusFromOver(over.id);

    if (!newStatus) return;

    if (activeTask.status === newStatus) return;

    setTasks(prev =>
      prev.map(task =>
        task._id === active.id
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  const handleDragEnd = async ({ active, over }) => {

    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeId = active.id;
    const newStatus = resolveStatusFromOver(over.id);

    if (!newStatus) {
      setActiveTask(null);
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task._id === activeId ? { ...task, status: newStatus } : task
      )
    );

    setActiveTask(null);

    try {
        await updateTask({
            id: activeId,
            status: newStatus,
        }).unwrap();
    } catch (err) {
        console.error(err);
    }
};

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  return {
    activeTask,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  };
}