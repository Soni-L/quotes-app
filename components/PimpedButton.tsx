type Mode = "pimped" | "scholarly";

const PimpedButton: React.FC<{
  onClick?: () => void;
  loading?: boolean;
  mode?: Mode;
}> = ({ onClick, loading = false, mode = "pimped" }) => {
  const isPimped = mode === "pimped";

  const buttonStyle: React.CSSProperties = isPimped
    ? {
        background: "linear-gradient(135deg, #ffd700, #ffa500)",
        color: "#000",
        maxWidth: "200px",
        padding: "0.6rem 1.4rem",
        fontSize: "0.9rem",
        fontWeight: 600,
        border: "2px solid #fff",
        borderRadius: "999px",
        textTransform: "uppercase",
        boxShadow: "0 0 15px #ffd70088, 0 0 30px #ffa50066",
        letterSpacing: "1px",
        cursor: loading ? "not-allowed" : "pointer",
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        opacity: loading ? 0.6 : 1,
      }
    : {
        background: "#f5f5f5",
        color: "#333",
        padding: "0.6rem 1.2rem",
        fontSize: "0.9rem",
        fontWeight: 500,
        border: "1px solid #ccc",
        borderRadius: "6px",
        textTransform: "none",
        boxShadow: "none",
        fontFamily: "'Georgia', serif",
        cursor: loading ? "not-allowed" : "pointer",
        transition: "background-color 0.3s ease",
        opacity: loading ? 0.5 : 1,
      };

  const spinnerStyle: React.CSSProperties = {
    border: "2px solid rgba(0,0,0,0.1)",
    borderTop: isPimped ? "2px solid #fff" : "2px solid #333",
    borderRadius: "50%",
    width: "14px",
    height: "14px",
    animation: "spin 0.8s linear infinite",
  };

  const spanStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    position: "relative",
    zIndex: 1,
  };

  const shineStyle: React.CSSProperties = {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
    animation: "shine 3s infinite linear",
    zIndex: 0,
    pointerEvents: "none",
  };

  return (
    <>
      <style>{`
        @keyframes shine {
          0% { transform: rotate(0deg) translateX(0); }
          50% { transform: rotate(360deg) translateX(20px); }
          100% { transform: rotate(720deg) translateX(0); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <button
        onClick={!loading ? onClick : undefined}
        style={buttonStyle}
        disabled={loading}
        onMouseEnter={(e) => {
          if (!loading && isPimped) {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0 0 20px #ffd700aa, 0 0 40px #ffa50088";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading && isPimped) {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 0 15px #ffd70088, 0 0 30px #ffa50066";
          }
        }}
      >
        {isPimped && <div style={shineStyle}></div>}
        <span style={spanStyle}>
          {loading && <div style={spinnerStyle}></div>}
          {isPimped ? "Pimp my Quote" : "Keep it Scholarly"}
        </span>
      </button>
    </>
  );
};

export default PimpedButton;
