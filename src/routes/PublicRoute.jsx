import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { auth } = useAuth();
  console.log(auth?.user);
  return <> {auth?.user ? <Navigate to="/" /> : <Outlet />}</>;
}
