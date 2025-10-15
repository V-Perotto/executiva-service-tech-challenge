import { redirect, useNavigate } from "react-router";
import { getToken, isLogged } from "../auth/authService";
import { useEffect } from "react";

export function useRequireAuth() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }
  }, []);
}
