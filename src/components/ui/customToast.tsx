import { toast } from "sonner";
import React from "react";
import { CustomToast as ctTypes } from "@/types/toast.types";

const colors = {
  success: {
    bg: "#41b06e",
    text: "#f2efe5",
  },
  warning: {
    bg: "#ffc94a",
    text: "#31363f",
  },
  error: {
    bg: "#d24545",
    text: "#f2efe5",
  },
};

const CustomToast = ({ type, title, message }: ctTypes) => {
  const theme = colors[type];

  const description = message
    ? React.createElement("span", { style: { color: theme.text } }, message)
    : undefined;

  const toastOptions = {
    description,
    style: {
      background: theme.bg,
      color: theme.text,
      borderRadius: "8px",
      padding: "12px",
      transition: "background 0.3s ease",
      border: "none",
    },
    duration: 3000,
    visible: true,
    className: "animate-slide",
  };

  if (type === "success") {
    toast.success(`${title}!`, toastOptions);
  } else if (type === "warning") {
    toast.warning(`${title}!`, toastOptions);
  } else {
    toast.error(`${title}!`, toastOptions);
  }
};

export { CustomToast };
