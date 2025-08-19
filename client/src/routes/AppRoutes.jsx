import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import { LazyLoader } from "@/components/LazyLoader";
import { PrivateRoutes, PublicRoutes, VerifiedRoutes } from "./ProtectedRoutes";
import { useAuth } from "@/store";

//render pages
const RootLayout = lazy(() => import("@/layouts/RootLayout"));
const Home = lazy(() => import("@/pages/home/Home"));
const Contact = lazy(() => import("@/pages/contact/ContactUs"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const Login = lazy(() => import("@/pages/login/Login"));
const SignUp = lazy(() => import("@/pages/signup/SignUp"));
const Forgot = lazy(() => import("@/pages/forgot/Forgot-password"));
const Reset = lazy(() => import("@/pages/reset/Reset-password"));
const OnboardingLayout = lazy(() => import("@/layouts/OnboardingLayout"));
const Verify = lazy(() => import("@/pages/onboarding/VerifyOtp"));
const Patient = lazy(() => import("@/pages/onboarding/PatientOnboard"));
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"));
const Dashboard = lazy(() => import("@/pages/sidebarArea/dashboard/Dashboard"));
const Appointments = lazy(() =>
  import("@/pages/sidebarArea/appointments/Appointments")
);
const Rooms = lazy(() => import("@/pages/sidebarArea/rooms/Rooms"));
const Payments = lazy(() => import("@/pages/sidebarArea/payments/Payments"));
const Doctors = lazy(() => import("@/pages/sidebarArea/doctors/Doctors"));
const Patients = lazy(() => import("@/pages/sidebarArea/patients/Patients"));
const Inpatients = lazy(() =>
  import("@/pages/sidebarArea/inpatients/Inpatients")
);
const Users = lazy(() => import("@/pages/sidebarArea/users/Users"));
const Setting = lazy(() => import("@/pages/sidebarArea/setting/Setting"));
const Account = lazy(() =>
  import("@/pages/sidebarArea/setting/account/Account")
);
const Password = lazy(() =>
  import("@/pages/sidebarArea/setting/password/Password")
);
const Health = lazy(() =>
  import("@/pages/sidebarArea/setting/health-record/HealthRecord")
);

export default function AppRoutes() {
  const { accessToken, user } = useAuth();

  const routes = [
    {
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PublicRoutes accessToken={accessToken}>
            <RootLayout />
          </PublicRoutes>
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "contact",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Contact />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "account",
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PublicRoutes accessToken={accessToken}>
            <AuthLayout />
          </PublicRoutes>
        </Suspense>
      ),
      children: [
        {
          path: "signin",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "signup",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <SignUp />
            </Suspense>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Forgot />
            </Suspense>
          ),
        },
        {
          path: "reset-password",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Reset />
            </Suspense>
          ),
        },
      ],
    },
    {
      element: (
        <Suspense fallback={<LazyLoader />}>
          <VerifiedRoutes accessToken={accessToken} user={user}>
            <OnboardingLayout />
          </VerifiedRoutes>
        </Suspense>
      ),
      children: [
        {
          path: "/verify-account",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Verify />
            </Suspense>
          ),
        },
        {
          path: "/patient-onboard",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Patient />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <Suspense fallback={<LazyLoader />}>
          <PrivateRoutes accessToken={accessToken} user={user}>
            <DashboardLayout />
          </PrivateRoutes>
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "appointments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Appointments />
            </Suspense>
          ),
        },
        {
          path: "rooms",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Rooms />
            </Suspense>
          ),
        },
        {
          path: "payments",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Payments />
            </Suspense>
          ),
        },
        {
          path: "doctors",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Doctors />
            </Suspense>
          ),
        },
        {
          path: "patients",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Patients />
            </Suspense>
          ),
        },
        {
          path: "inpatients",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Inpatients />
            </Suspense>
          ),
        },
        {
          path: "users",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Users />
            </Suspense>
          ),
        },
        {
          path: "settings",
          element: (
            <Suspense fallback={<LazyLoader />}>
              <Setting />
            </Suspense>
          ),
          children: [
            {
              path: "account",
              element: (
                <Suspense fallback={<LazyLoader />}>
                  <Account />
                </Suspense>
              ),
            },
            {
              path: "password",
              element: (
                <Suspense fallback={<LazyLoader />}>
                  <Password />
                </Suspense>
              ),
            },
            {
              path: "health",
              element: (
                <Suspense fallback={<LazyLoader />}>
                  <Health />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
