import React, { useEffect, useState } from "react";

type ErrorSnackbarProps = {
  error: boolean;
  errorMessage: string;
};

const snackbarStyles: React.CSSProperties = {
  position: "fixed",
  top: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#f44336",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  zIndex: 9999,
  fontSize: "16px",
  maxWidth: "80%",
  textAlign: "center",
  transition: "opacity 0.3s ease-in-out",
};

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ error, errorMessage }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // Show for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!visible) return null;

  return <div style={snackbarStyles}>{errorMessage}</div>;
};

export default ErrorSnackbar;
