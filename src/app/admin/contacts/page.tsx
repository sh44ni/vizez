'use client';

import { useEffect, useState, useCallback } from 'react';

/* ── Types ── */
type ContactStatus = 'new' | 'read' | 'replied' | 'archived';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  status: ContactStatus;
  date: string;
}

const STATUS_LABELS: Record<string, string> = {
  all: 'All',
  new: 'New',
  read: 'Read',
  replied: 'Replied',
  archived: 'Archived',
};

const STATUS_COLORS: Record<ContactStatus, string> = {
  new: 'admin-badge-new',
  read: 'admin-badge-read',
  replied: 'admin-badge-replied',
  archived: 'admin-badge-archived',
};

/* ── Skeleton ── */
function Skeleton() {
  return <div className="admin-skeleton admin-skeleton-chart" />;
}

/* ── Status Badge ── */
function StatusBadge({ status }: { status: ContactStatus }) {
  return (
    <span className={`admin-badge ${STATUS_COLORS[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

/* ── Contacts Page ── */
export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.set('status', filter);
      if (search.trim()) params.set('search', search.trim());
      const res = await fetch(`/api/contacts?${params.toString()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const subs = data.submissions ?? data.contacts ?? data ?? [];
        setContacts(
          Array.isArray(subs)
            ? subs.map((s: Record<string, string>) => ({
                id: s.id,
                name: s.name,
                email: s.email,
                message: s.message,
                status: (s.status || 'new') as ContactStatus,
                date: s.createdAt ?? s.date ?? '',
              }))
            : []
        );
      } else {
        setError('Failed to load contacts.');
      }
    } catch {
      setError('Network error loading contacts.');
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchContacts();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchContacts]);

  async function updateStatus(id: string, status: ContactStatus) {
    try {
      const res = await fetch('/api/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status } : c))
        );
      }
    } catch {
      /* silently fail */
    }
  }

  /* Stats */
  const totalCount = contacts.length;
  const newCount = contacts.filter((c) => c.status === 'new').length;
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weekCount = contacts.filter((c) => new Date(c.date).getTime() >= oneWeekAgo).length;

  if (error && !contacts.length) {
    return <div className="admin-error">{error}</div>;
  }

  return (
    <div className="admin-contacts">
      {/* Stats row */}
      <div className="admin-contacts-stats">
        <div className="admin-contacts-stat" id="stat-total">
          <span className="admin-contacts-stat-value">{totalCount}</span>
          <span className="admin-contacts-stat-label">Total</span>
        </div>
        <div className="admin-contacts-stat" id="stat-new">
          <span className="admin-contacts-stat-value">{newCount}</span>
          <span className="admin-contacts-stat-label">New</span>
        </div>
        <div className="admin-contacts-stat" id="stat-week">
          <span className="admin-contacts-stat-value">{weekCount}</span>
          <span className="admin-contacts-stat-label">This Week</span>
        </div>
      </div>

      {/* Filters + search */}
      <div className="admin-contacts-controls">
        <div className="admin-contacts-filters">
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <button
              key={key}
              id={`filter-${key}`}
              className={`admin-pill ${filter === key ? 'admin-pill-active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          id="contacts-search"
          type="text"
          className="admin-contacts-search"
          placeholder="Search name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      {loading ? (
        <Skeleton />
      ) : contacts.length === 0 ? (
        <div className="admin-empty-state">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="4" y="8" width="40" height="32" rx="6" stroke="#52525B" strokeWidth="2" />
            <path d="M4 16l18.4 10.22a4 4 0 003.2 0L44 16" stroke="#52525B" strokeWidth="2" />
          </svg>
          <p>No contacts found.</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table admin-contacts-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <>
                  <tr
                    key={c.id}
                    className={`admin-contacts-row ${expanded === c.id ? 'admin-contacts-row-expanded' : ''}`}
                    onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                    id={`contact-row-${c.id}`}
                  >
                    <td className="admin-contacts-name">{c.name}</td>
                    <td className="admin-contacts-email">{c.email}</td>
                    <td className="admin-contacts-subject">{c.message.slice(0, 50)}{c.message.length > 50 ? '…' : ''}</td>
                    <td>{new Date(c.date).toLocaleDateString()}</td>
                    <td><StatusBadge status={c.status} /></td>
                  </tr>
                  {expanded === c.id && (
                    <tr key={`${c.id}-detail`} className="admin-contacts-detail">
                      <td colSpan={5}>
                        <div className="admin-contacts-message">
                          <p>{c.message}</p>
                          <div className="admin-contacts-actions">
                            {c.status === 'new' && (
                              <button
                                id={`action-read-${c.id}`}
                                className="admin-action-btn"
                                onClick={(e) => { e.stopPropagation(); updateStatus(c.id, 'read'); }}
                              >
                                Mark as Read
                              </button>
                            )}
                            {c.status !== 'archived' && (
                              <button
                                id={`action-archive-${c.id}`}
                                className="admin-action-btn admin-action-btn-dim"
                                onClick={(e) => { e.stopPropagation(); updateStatus(c.id, 'archived'); }}
                              >
                                Archive
                              </button>
                            )}
                            <a
                              id={`action-reply-${c.id}`}
                              href={`mailto:${c.email}?subject=Re: Your inquiry`}
                              className="admin-action-btn admin-action-btn-accent"
                              onClick={(e) => { e.stopPropagation(); updateStatus(c.id, 'replied'); }}
                            >
                              Reply
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
