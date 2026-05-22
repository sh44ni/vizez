'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navLinks = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: '/admin/analytics',
    label: 'Analytics',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 17V10M8 17V7M13 17V11M18 17V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/admin/contacts',
    label: 'Contacts',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 7l7.29 4.05a2 2 0 002.42 0L18 7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    href: '/admin/chats',
    label: 'Chats',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M17 9.5C17 13.64 13.64 17 9.5 17C8.14 17 6.86 16.64 5.74 16L2 17L3 13.26C2.36 12.14 2 10.86 2 9.5C2 5.36 5.36 2 9.5 2C13.64 2 17 5.36 17 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6.5" cy="9.5" r="0.75" fill="currentColor" />
        <circle cx="9.5" cy="9.5" r="0.75" fill="currentColor" />
        <circle cx="12.5" cy="9.5" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
];

export default function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  return (
    <aside className={`admin-sidebar ${collapsed ? 'admin-sidebar-collapsed' : ''}`}>
      <div className="admin-sidebar-top">
        <Link href="/admin" className="admin-sidebar-logo" id="sidebar-logo">
          <img src="/logo.svg" alt="VizEz" className="admin-sidebar-logo-img" />
          {!collapsed && <span className="admin-sidebar-logo-text">Admin</span>}
        </Link>
      </div>

      <nav className="admin-sidebar-nav">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            id={`sidebar-link-${link.label.toLowerCase()}`}
            className={`admin-sidebar-link ${isActive(link.href) ? 'admin-sidebar-link-active' : ''}`}
          >
            <span className="admin-sidebar-link-icon">{link.icon}</span>
            {!collapsed && <span className="admin-sidebar-link-label">{link.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar-bottom">
        <button
          id="sidebar-toggle"
          className="admin-sidebar-toggle"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {collapsed ? (
              <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </div>
    </aside>
  );
}
