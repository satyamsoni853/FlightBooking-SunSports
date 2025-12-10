import React, { Suspense } from "react";
import FlightPayment from "@/components/FlightPayment";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightPayment />
    </Suspense>
  );
}
