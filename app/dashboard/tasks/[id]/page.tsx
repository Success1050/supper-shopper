// app/dashboard/tasks/[id]/page.jsx or page.tsx

import TaskExecution from "@/Components/TaskExecution";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ⬅️ FIX: await it

  return <TaskExecution productId={parseInt(id, 10)} />;
}
