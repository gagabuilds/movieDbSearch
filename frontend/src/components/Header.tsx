import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

function safeAvatarUrl(url: string | null): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return null;
    return url;
  } catch {
    return null;
  }
}

export default function Header() {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const avatarUrl = user ? safeAvatarUrl(user.avatarUrl) : null;

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="brand-icon">🎬</span>
          <span className="brand-name">MovieSearch</span>
        </div>

        <nav className="header-nav">
          {user ? (
            <div className="user-menu">
              <div className="user-avatar">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={user.username} />
                ) : (
                  <span>{user.username.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <span className="user-name">{user.username}</span>
              <button className="btn-outline" onClick={logout}>
                Sign Out
              </button>
            </div>
          ) : (
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              Sign In
            </button>
          )}
        </nav>
      </div>

      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </header>
  );
}
