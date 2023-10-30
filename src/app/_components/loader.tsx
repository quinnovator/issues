"use client";

import { ThreeDots } from "react-loader-spinner";

export default function Loader({ className }: { className?: string }) {
  return (
    <div className={`${className} flex h-8 items-center justify-center`}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#371d35"
        visible={true}
      />
    </div>
  );
}
