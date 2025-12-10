import React, { Suspense } from "react";
import FlightUsername from "@/components/FlightUsername";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightUsername />
    </Suspense>
  );
}
