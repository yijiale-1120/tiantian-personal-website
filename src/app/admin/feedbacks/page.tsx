import ProtectedRoute from "@/components/ProtectedRoute";
import AdminFeedbacks from "@/views/adminFeedbacks";

export default function AdminFeedbacksPage() {
  return (
    <ProtectedRoute>
      <AdminFeedbacks />
    </ProtectedRoute>
  );
}
