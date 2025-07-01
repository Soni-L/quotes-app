import useNetworkStatus from "@/hooks/useNetworkStatus";
import React from "react";

export default function OfflineStatusIndicator() {
  const { isOnline } = useNetworkStatus();
  return (
    <>
      {!isOnline && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#ff9800",
            color: "white",
            padding: "12px",
            textAlign: "center",
            fontWeight: "bold",
            zIndex: 1000,
          }}
        >
          You are offline. Connect to the internet to receive a fuller
          compilation of quotes and pimping capabilities!
        </div>
      )}
    </>
  );
}
