"use client";

import Image from "next/image";

interface NotificationMessageProps {
  message?: string;
  type?: "error" | "success";
}

export default function NotificationMessage({ message, type }: NotificationMessageProps) {
  if (!message) return null;

  const bgColor = type === "error" ? "bg-red-400" : "bg-green-400";

  return (
    <div className={`flex gap-2 p-2 rounded text-white ${bgColor}`}>
      <Image
        className="h-5 w-5"
        alt={`${type}_icon`}
        title={type === "error" ? "Error" : "Success"}
        src={type === "error" ? "/notification-error.svg" : "/notification-verified.svg"}
        width={20}
        height={20}
      />
      {message}
    </div>
  );
}
