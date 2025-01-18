import leetcodeLogo from "../icons/leetcode.png";
import profileLogo from "../icons/profile.png";

export default function Header({ handleProfileClick }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "black",
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginRight: 60,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          padding: "10px 20px",
        }}
      >
        <a
          href="https://leetcode.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            textDecoration: "none",
          }}
        >
          <img
            src={leetcodeLogo}
            className="logo leetcode-logo"
            alt="LeetCode logo"
            style={{ marginRight: 10 }}
          />
          <div
            style={{
              justifyContent: "flex-start",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ margin: 0, textAlign: "left" }}>Do Your Effin</h3>
            <h2 style={{ margin: 0, textAlign: "left" }}>LEETCODES</h2>
          </div>
        </a>
      </div>
      {/* Profile icon that toggles the dashboard */}
      <img
        src={profileLogo}
        className="logo profile-logo"
        alt="Profile logo"
        onClick={handleProfileClick}
        style={{
          cursor: "pointer",
          width: 30,
          height: 30,
          position: "absolute",
          right: 20,
          top: 15,
        }}
      />
    </div>
  );
}
