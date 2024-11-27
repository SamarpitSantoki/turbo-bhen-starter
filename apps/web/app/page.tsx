"use client";

import { Button } from "@repo/ui/components/ui/button";
import Confetti, { ConfettiButton } from "@repo/ui/components/ui/confetti";
import React from "react";

function page() {
  return (
    <div className="font-bold text-2xl flex flex-col gap-4 items-center justify-center h-screen relative">
      <h1>Hello World</h1>
      <ConfettiButton
        options={{
          useWorker: true,
          particleCount: 100,
          ticks: 1000,
          spread: 180,
          origin: {
            y: 0.7,
          },
          // decay: 0.94,
          // scalar: 1.2,
          // drift: 1,
          shapes: ["circle", "star", "square"],
        }}
      >
        Greet Me
      </ConfettiButton>
    </div>
  );
}

export default page;
