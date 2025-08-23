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

export const data = [
  {
    id: 1,
    fullname: "Sussana",
    email: "sussanobi1999@gmail.com",
    role: "Patient",
    phone: "N/A",
    joined: "22/07/2025",
    avatar: "",
  },
  {
    id: 2,
    fullname: "Joseph Gift",
    email: "jgifted13@gmail.com",
    role: "Patient",
    phone: "N/A",
    joined: "21/07/2025",
    avatar: "",
  },
  {
    id: 3,
    fullname: "Eric Fullstack",
    email: "cobimbachu@gmail.com",
    role: "Patient",
    phone: "0123456789",
    joined: "11/07/2025",
    avatar: "",
  },
  {
    id: 4,
    fullname: "Mubarak Tech",
    email: "charlesmutob@gmail.com",
    role: "Doctor",
    phone: "N/A",
    joined: "11/07/2025",
    avatar: "",
  },
  {
    id: 5,
    fullname: "Dizzy Gilepsy",
    email: "ceenobi@icloud.com",
    role: "Admin",
    phone: "09061987800",
    joined: "20/06/2025",
    avatar: "",
  },
];
