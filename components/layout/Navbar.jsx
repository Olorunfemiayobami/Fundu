import Link from "next/link";
import Image from "next/image";
import "../../styles/navbar.css";

export default function Navbar() {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        {/* LEFT CONTAINER: Logo and Navigation Links */}
        <div className="nav-left-group">
          <Link href="/" className="logo-container">
            <Image
              src="/logo.svg"
              alt="Fundu Logo"
              width={64}
              height={64}
              priority
            />
          </Link>

          <div className="nav-links">
            <Link href="/dashboard" className="nav-link active">
              Dashboard
            </Link>
            <Link href="/explore" className="nav-link">
              Explore
            </Link>
            <Link href="/campaigns" className="nav-link">
              Campaigns
            </Link>
            <Link href="/settings" className="nav-link">
              Settings
            </Link>
            <Link href="/notifications" className="nav-link">
              Notifications <span className="notif-badge">10</span>
            </Link>
          </div>
        </div>

        {/* RIGHT CONTAINER: Icon, Create Button, and Profile */}
        <div className="nav-right-group">
          <button className="icon-btn">
            {/* Notification Bell Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#667085"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>

          {/* CONNECTED: Create Campaign Link */}
          <Link href="/campaigns">
            <button className="nav-btn-primary">Create Campaign</button>
          </Link>

          <div className="user-avatar">AY</div>
        </div>
      </nav>
    </header>
  );
}
