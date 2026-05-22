'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Login page should not have the shell (sidebar/topbar)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className={`admin-shell ${collapsed ? 'admin-shell-collapsed' : ''}`}>
      <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="admin-main">
        <AdminTopBar />
        <div className="admin-main-content">
          {children}
        </div>
      </div>
    </div>
  );
}
