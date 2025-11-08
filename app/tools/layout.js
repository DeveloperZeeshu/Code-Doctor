import { ProtectedRoute } from "../components/ProtectedRoute";

export default function ToolLayout({ children }) {
    return <ProtectedRoute>{children}</ProtectedRoute>
}
