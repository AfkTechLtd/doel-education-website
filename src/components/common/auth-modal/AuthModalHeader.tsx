"use client";

import { useAuthModal } from "./AuthModalProvider";

export default function AuthModalHeader() {
  const { view } = useAuthModal();

  const isLogin = view === "login";

  return (
    <div className="mb-8 pr-10">
      <h3 className="text-2xl font-bold text-slate-900">
        {isLogin ? "Login Into Portal" : "Create Account"}
      </h3>
      <p className="mt-2 text-gray-500">
        {isLogin
          ? "Welcome back. Sign in to continue your journey."
          : "Register as a student to begin your US study journey."}
      </p>
    </div>
  );
}
