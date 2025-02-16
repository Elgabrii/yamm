"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface DashboardErrorProps {
  error: Error;
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("Dashboard error boundary caught an error:", error);
  }, [error]);

  return (
    <div className="p-4 w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
      <p className="mb-4 text-red-600">{error.message}</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Try again
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
