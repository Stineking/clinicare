import {
  RiBankCardLine,
  RiCalendarLine,
  RiDashboardLine,
  RiGroup3Line,
  RiGroupLine,
  RiHotelBedFill,
  RiSettingsLine,
  RiStethoscopeFill,
  RiUserLine,
} from "@remixicon/react";
import dayjs from "dayjs";

export const bloodGroup = {
  "A+": "A-positive",
  "A-": "A-negative",
  "B+": "B-positive",
  "B-": "B-negative",
  "AB+": "AB-positive",
  "AB-": "AB-negative",
  "O+": "O-positive",
  "O-": "O-negative",
};

export const sidebarLinks = [
  {
    title: "Menu",
    links: [
      { id: 1, label: "Dashboard", to: "/dashboard", icon: RiDashboardLine },
      {
        id: 2,
        label: "Apppointments",
        to: "appointments",
        icon: RiCalendarLine,
      },
      { id: 3, label: "Rooms", to: "rooms", icon: RiHotelBedFill },
      { id: 4, label: "Payments", to: "payments", icon: RiBankCardLine },
    ],
  },
  {
    title: "Management",
    links: [
      { id: 5, label: "Doctors", to: "doctors", icon: RiStethoscopeFill },
      { id: 6, label: "Patients", to: "patients", icon: RiGroupLine },
      { id: 7, label: "Inpatients", to: "inpatients", icon: RiGroup3Line },
    ],
  },
  {
    title: "Setting",
    links: [
      { id: 8, label: "Users", to: "users", icon: RiUserLine },
      { id: 9, label: "Setting", to: "settings", icon: RiSettingsLine },
    ],
  },
];

export const headers = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export const formatDate = (item, format = "display") => {
  if (format === "input") {
    return dayjs(item).format("YYYY-MM-DD");
  }
  return dayjs(item).format("DD/MM/YYYY");
};

export const settingsLink = [
  {
    id: "account",
    href: "/dashboard/settings/account",
    name: "Account",
  },
  {
    id: "password",
    href: "/dashboard/settings/password",
    name: "Password",
  },
  {
    id: "health",
    href: "/dashboard/settings/health",
    name: "Health Record",
  },
];