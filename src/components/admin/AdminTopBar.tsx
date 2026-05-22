'use client';

import { usePathname } from 'next/navigation';

const titleMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/analytics': 'Analytics',
  '/admin/contacts': 'Contact Submissions',
};

export default function AdminTopBar() {
  const pathname = usePathname();
  const title = titleMap[pathname] || 'Dashboard';

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      /* proceed to redirect */
    }
    window.location.href = '/admin/login';
  }

  return (
    <header className="admin-topbar">
      <h1 className="admin-topbar-title">{title}</h1>

      <div className="admin-topbar-actions">
        <button id="topbar-notifications" className="admin-topbar-btn" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2a5 5 0 00-5 5v3l-1.29 1.29A1 1 0 004.41 13h11.18a1 1 0 00.7-1.71L15 10V7a5 5 0 00-5-5z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M8 13v1a2 2 0 004 0v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <button id="topbar-logout" className="admin-topbar-btn admin-topbar-btn-logout" onClick={handleLogout}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 2H4a2 2 0 00-2 2v12a2 2 0 002 2h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14 13l3-3-3-3M7 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
