import { lazy, Suspense, type ComponentType, type LazyExoticComponent, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/shared/components/layout/AppLayout";
import { ProtectedRoute } from "./guards";
import { PageSkeleton, RoleRedirect } from "./routeComponents";

const LandingPage = lazy(() => import("@/features/landing/pages/SupportFlowLandingPage"));
const CustomerAccessPage = lazy(() => import("@/features/landing/pages/CustomerAccessPage"));
const UnifiedLoginHubPage = lazy(() => import("@/features/landing/pages/UnifiedLoginHubPage"));
const LoginPage = lazyNamed(() => import("@/features/auth/components/LoginPage"), "LoginPage");
const RegisterPage = lazyNamed(() => import("@/features/auth/components/RegisterPage"), "RegisterPage");
const OtpVerificationPage = lazyNamed(() => import("@/features/auth/components/OtpVerificationPage"), "OtpVerificationPage");
const ForgotPasswordPage = lazyNamed(() => import("@/features/auth/components/ForgotPasswordPage"), "ForgotPasswordPage");
const VerifyResetCodePage = lazyNamed(() => import("@/features/auth/components/VerifyResetCodePage"), "VerifyResetCodePage");
const ResetPasswordPage = lazyNamed(() => import("@/features/auth/components/ResetPasswordPage"), "ResetPasswordPage");
const WorkspaceOnboardingPage = lazyNamed(() => import("@/features/workspace/pages/WorkspaceOnboardingPage"), "WorkspaceOnboardingPage");
const LiveChatDemoPage = lazy(() => import("@/features/demo/pages/LiveChatDemoPage"));
const NotFoundPage = lazy(() => import("@/shared/pages/NotFoundPage"));
const AccessDeniedPage = lazy(() => import("@/shared/pages/AccessDeniedPage"));
const DashboardPage = lazy(() => import("@/features/dashboard/pages/DashboardPage"));
const TicketsPage = lazy(() => import("@/features/tickets/pages/TicketsPage"));
const TicketDetailPage = lazy(() => import("@/features/tickets/pages/TicketDetailPage"));
const ConversationsPage = lazy(() => import("@/features/conversations/pages/ConversationsPage"));
const KnowledgeBasePage = lazy(() => import("@/features/knowledge/pages/KnowledgeBasePage"));
const AnalyticsPage = lazy(() => import("@/features/analytics/pages/AnalyticsPage"));
const AgentsPage = lazy(() => import("@/features/agents/pages/AgentsPage"));
const BusinessesPage = lazy(() => import("@/features/businesses/pages/BusinessesPage"));
const SettingsPage = lazy(() => import("@/features/settings/pages/SettingsPage"));
const WorkspaceSettingsPage = lazy(() => import("@/features/settings/pages/WorkspaceSettingsPage"));

function lazyNamed<T extends Record<string, ComponentType<object>>, K extends keyof T>(
  importer: () => Promise<T>,
  exportName: K,
): LazyExoticComponent<T[K]> {
  return lazy(async () => ({ default: (await importer())[exportName] }));
}

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<PageSkeleton />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<LandingPage />),
  },
  {
    path: "/customer",
    element: withSuspense(<CustomerAccessPage />),
  },
  {
    path: "/login",
    element: withSuspense(<UnifiedLoginHubPage />),
  },
  {
    path: "/login/workspace",
    element: withSuspense(<LoginPage />),
  },
  {
    path: "/register",
    element: withSuspense(<RegisterPage />),
  },
  {
    path: "/forgot-password",
    element: withSuspense(<ForgotPasswordPage />),
  },
  {
    path: "/verify-otp",
    element: withSuspense(<OtpVerificationPage />),
  },
  {
    path: "/verify-reset-code",
    element: withSuspense(<VerifyResetCodePage />),
  },
  {
    path: "/reset-password",
    element: withSuspense(<ResetPasswordPage />),
  },
  {
    path: "/demo",
    element: withSuspense(<LiveChatDemoPage />),
  },
  {
    path: "/onboarding",
    element: withSuspense(<WorkspaceOnboardingPage />),
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "app",
        element: <RoleRedirect />,
      },
      {
        path: "dashboard",
        element: withSuspense(<DashboardPage />),
      },
      {
        path: "businesses",
        element: withSuspense(<BusinessesPage />),
      },
      {
        path: "tickets",
        element: withSuspense(<TicketsPage />),
      },
      {
        path: "tickets/:id",
        element: withSuspense(<TicketDetailPage />),
      },
      {
        path: "conversations",
        element: withSuspense(<ConversationsPage />),
      },
      {
        path: "knowledge",
        element: withSuspense(<KnowledgeBasePage />),
      },
      {
        path: "agents",
        element: withSuspense(<AgentsPage />),
      },
      {
        path: "analytics",
        element: withSuspense(<AnalyticsPage />),
      },
      {
        path: "settings",
        element: withSuspense(<SettingsPage />),
      },
      {
        path: "workspace-settings",
        element: withSuspense(<WorkspaceSettingsPage />),
      },
    ],
  },
  {
    path: "/403",
    element: withSuspense(<AccessDeniedPage />),
  },
  {
    path: "*",
    element: withSuspense(<NotFoundPage />),
  },
]);
