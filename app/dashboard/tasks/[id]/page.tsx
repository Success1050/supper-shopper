// import TaskExecution from "@/components/TaskExecution";
import TaskExecution from "@/Components/TaskExecution";

export default function TaskPage({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) return;

  return <TaskExecution productId={parseInt(id, 10)} />;
}
