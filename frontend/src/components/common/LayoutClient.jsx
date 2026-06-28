"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "./Navbar";

function LayoutContent({ children }) {
  const searchParams = useSearchParams();

  const isPdf = searchParams.get("pdf") === "true";

  return (
    <>
      {!isPdf && <Navbar />}
      {children}
    </>
  );
}

export default function LayoutClient({ children }) {
  return (
    <Suspense fallback={null}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}