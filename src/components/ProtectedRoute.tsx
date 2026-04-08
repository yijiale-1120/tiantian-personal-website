"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../hooks/use-auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, isReady } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isReady && !token) {
      router.replace(`/login?from=${encodeURIComponent(pathname ?? "/")}`);
    }
  }, [isReady, token, pathname, router]);

  if (!isReady || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 text-slate-600 text-sm">
        加载中…
      </div>
    );
  }

  return <>{children}</>;
}
