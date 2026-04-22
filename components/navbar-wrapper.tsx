"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

// Routes where navbar should be HIDDEN
const HIDDEN_NAVBAR_ROUTES = ["/", "/signin", "/signup"];

export function NavbarWrapper() {
  const pathname = usePathname();
  
  // Check if current path should hide navbar
  const shouldHideNavbar = HIDDEN_NAVBAR_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  
  if (shouldHideNavbar) {
    return null;
  }
  
  return <Navbar />;
}