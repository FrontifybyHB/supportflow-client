import { Navigate } from "react-router-dom";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { useAppSelector } from "@/lib/redux/hooks";
import { getDefaultRouteForRole } from "./roleRoutes";

export function PageSkeleton() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <Skeleton className="h-10 w-64 rounded-xl" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    </main>
  );
}

export function RoleRedirect() {
  const role = useAppSelector((state) => state.auth.user?.role);
  return <Navigate to={getDefaultRouteForRole(role)} replace />;
}
