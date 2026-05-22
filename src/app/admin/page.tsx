'use client';

import { useEffect, useState, useCallback } from 'react';

/* ── Type definitions ── */
interface OverviewData {
  totalVisitors: number;
  pageViews: number;
  contactSubmissions: number;
  bounceRate: number;
  visitorsTrend: number;
  pageViewsTrend: number;
  contactsTrend: number;
  bounceTrend: number;
}

interface VisitorsData {
  labels: string[];
  data: number[];
}

interface SourceItem {
  name: string;
  value: number;
  color: string;
}

interface ContactItem {
  id: string;
  name: string;
  email: string;
  date: string;
}

/* ── Skeleton components ── */
function SkeletonCard() {
  return <div className="admin-skeleton admin-skeleton-card" />;
}

function SkeletonChart() {
  return <div className="admin-skeleton admin-skeleton-chart" />;
}

/* ── KPI Card ── */
function KPICard({
  icon,
  label,
  value,
  trend,
  id,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: number;
  id: string;
}) {
  const up = trend >= 0;
  return (
    <div className="admin-kpi-card" id={id}>
      <div className="admin-kpi-icon">{icon}</div>
      <div className="admin-kpi-body">
        <span className="admin-kpi-label">{label}</span>
        <span className="admin-kpi-value">{value}</span>
      </div>
      <span className={`admin-kpi-trend ${up ? 'admin-kpi-trend-up' : 'admin-kpi-trend-down'}`}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          {up ? (
            <path d="M6 2v8M6 2l3 3M6 2L3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M6 10V2M6 10l3-3M6 10L3 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
        {Math.abs(trend)}%
      </span>
    </div>
  );
}

/* ── Visitors Area Chart ── */
function VisitorsChart({ labels, data }: VisitorsData) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; value: number } | null>(null);

  const W = 800;
  const H = 300;
  const padL = 50;
  const padR = 20;
  const padT = 20;
  const padB = 40;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const max = Math.max(...data, 1);
  const stepY = chartH / max;

  const points = data.map((v, i) => ({
    x: padL + (i / Math.max(data.length - 1, 1)) * chartW,
    y: padT + chartH - v * stepY,
    value: v,
    label: labels[i],
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1]?.x ?? padL},${padT + chartH} L${padL},${padT + chartH} Z`;

  /* Y-axis ticks */
  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => Math.round((max / yTicks) * i));

  /* X-axis labels - show ~6 */
  const xStep = Math.max(Math.floor(labels.length / 6), 1);

  return (
    <div className="admin-chart-card" id="visitors-chart">
      <h3 className="admin-card-title">Visitors — Last 30 Days</h3>
      <div className="admin-chart-wrapper">
        <svg viewBox={`0 0 ${W} ${H}`} className="admin-chart-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0388CB" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0388CB" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yTickValues.map((v) => {
            const y = padT + chartH - v * stepY;
            return (
              <g key={`gy-${v}`}>
                <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <text x={padL - 8} y={y + 4} textAnchor="end" fill="#8A8A9A" fontSize="11">{v}</text>
              </g>
            );
          })}

          {/* X labels */}
          {labels.map((l, i) =>
            i % xStep === 0 ? (
              <text key={`xl-${i}`} x={points[i]?.x ?? 0} y={H - 8} textAnchor="middle" fill="#8A8A9A" fontSize="11">
                {l}
              </text>
            ) : null
          )}

          {/* Area */}
          <path d={areaPath} fill="url(#areaGrad)" />

          {/* Line */}
          <path d={linePath} fill="none" stroke="#0388CB" strokeWidth="2" strokeLinejoin="round" />

          {/* Dots & hover targets */}
          {points.map((p, i) => (
            <circle
              key={`dot-${i}`}
              cx={p.x}
              cy={p.y}
              r="12"
              fill="transparent"
              onMouseEnter={() => setTooltip({ x: p.x, y: p.y, label: p.label, value: p.value })}
              onMouseLeave={() => setTooltip(null)}
              style={{ cursor: 'pointer' }}
            />
          ))}

          {/* Active dot */}
          {tooltip && (
            <>
              <circle cx={tooltip.x} cy={tooltip.y} r="4" fill="#0388CB" stroke="#050508" strokeWidth="2" />
              <rect x={tooltip.x - 45} y={tooltip.y - 36} width="90" height="26" rx="6" fill="#0C0C10" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x={tooltip.x} y={tooltip.y - 19} textAnchor="middle" fill="#F0F0F5" fontSize="12" fontWeight="500">
                {tooltip.label}: {tooltip.value}
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  );
}

/* ── Traffic Sources Doughnut ── */
function SourcesChart({ sources }: { sources: SourceItem[] }) {
  const total = sources.reduce((s, src) => s + src.value, 0) || 1;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="admin-sources-card" id="sources-chart">
      <h3 className="admin-card-title">Traffic Sources</h3>
      <div className="admin-sources-layout">
        <svg width="160" height="160" viewBox="0 0 160 160" className="admin-doughnut-svg">
          {sources.map((src) => {
            const pct = src.value / total;
            const dash = pct * circumference;
            const gap = circumference - dash;
            const currentOffset = offset;
            offset += dash;
            return (
              <circle
                key={src.name}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={src.color}
                strokeWidth="16"
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={-currentOffset}
                strokeLinecap="round"
                transform="rotate(-90 80 80)"
              />
            );
          })}
        </svg>
        <ul className="admin-sources-legend">
          {sources.map((src) => (
            <li key={src.name} className="admin-sources-legend-item">
              <span className="admin-sources-dot" style={{ backgroundColor: src.color }} />
              <span className="admin-sources-legend-label">{src.name}</span>
              <span className="admin-sources-legend-value">{Math.round((src.value / total) * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Recent Contacts ── */
function RecentContacts({ contacts }: { contacts: ContactItem[] }) {
  if (contacts.length === 0) {
    return (
      <div className="admin-recent-contacts" id="recent-contacts">
        <h3 className="admin-card-title">Recent Contacts</h3>
        <p className="admin-empty">No contact submissions yet.</p>
      </div>
    );
  }
  return (
    <div className="admin-recent-contacts" id="recent-contacts">
      <h3 className="admin-card-title">Recent Contacts</h3>
      <ul className="admin-recent-list">
        {contacts.map((c) => (
          <li key={c.id} className="admin-recent-item">
            <div className="admin-recent-avatar">{c.name.charAt(0).toUpperCase()}</div>
            <div className="admin-recent-info">
              <span className="admin-recent-name">{c.name}</span>
              <span className="admin-recent-email">{c.email}</span>
            </div>
            <span className="admin-recent-date">{new Date(c.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Dashboard Page ── */
export default function AdminDashboardPage() {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [visitors, setVisitors] = useState<VisitorsData | null>(null);
  const [sources, setSources] = useState<SourceItem[] | null>(null);
  const [contacts, setContacts] = useState<ContactItem[] | null>(null);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const [ovRes, visRes, srcRes, conRes] = await Promise.all([
        fetch('/api/analytics/overview', { cache: 'no-store' }),
        fetch('/api/analytics/visitors', { cache: 'no-store' }),
        fetch('/api/analytics/sources', { cache: 'no-store' }),
        fetch('/api/contacts?limit=5', { cache: 'no-store' }),
      ]);

      if (ovRes.ok) {
        const raw = await ovRes.json();
        setOverview({
          totalVisitors: raw.visitors?.value ?? 0,
          pageViews: raw.pageViews?.value ?? 0,
          contactSubmissions: raw.contacts?.value ?? 0,
          bounceRate: raw.bounceRate?.value ?? 0,
          visitorsTrend: raw.visitors?.trend ?? 0,
          pageViewsTrend: raw.pageViews?.trend ?? 0,
          contactsTrend: raw.contacts?.new ?? 0,
          bounceTrend: raw.bounceRate?.trend ?? 0,
        });
      }
      if (visRes.ok) {
        const raw = await visRes.json();
        setVisitors({ labels: raw.labels ?? [], data: raw.views ?? raw.data ?? [] });
      }
      if (srcRes.ok) {
        const srcData = await srcRes.json();
        setSources(srcData.sources ?? srcData ?? []);
      }
      if (conRes.ok) {
        const conData = await conRes.json();
        const subs = conData.submissions ?? conData.contacts ?? conData ?? [];
        setContacts(
          Array.isArray(subs)
            ? subs.map((s: Record<string, string>) => ({
                id: s.id,
                name: s.name,
                email: s.email,
                date: s.createdAt ?? s.date ?? '',
              }))
            : []
        );
      }
    } catch {
      setError('Failed to load dashboard data.');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return <div className="admin-error">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* KPI Cards */}
      <section className="admin-kpi-grid">
        {overview ? (
          <>
            <KPICard
              id="kpi-visitors"
              label="Total Visitors"
              value={overview.totalVisitors.toLocaleString()}
              trend={overview.visitorsTrend}
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
            />
            <KPICard
              id="kpi-pageviews"
              label="Page Views"
              value={overview.pageViews.toLocaleString()}
              trend={overview.pageViewsTrend}
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M1 11s4-7 10-7 10 7 10 7-4 7-10 7S1 11 1 11z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              }
            />
            <KPICard
              id="kpi-contacts"
              label="Contact Submissions"
              value={overview.contactSubmissions.toLocaleString()}
              trend={overview.contactsTrend}
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="2" y="4" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 8l8.6 4.77a2 2 0 001.8 0L21 8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              }
            />
            <KPICard
              id="kpi-bounce"
              label="Bounce Rate"
              value={`${overview.bounceRate}%`}
              trend={overview.bounceTrend}
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 18l4-6 4 3 6-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
          </>
        ) : (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </section>

      {/* Charts row */}
      <section className="admin-charts-row">
        {visitors ? (
          <VisitorsChart labels={visitors.labels} data={visitors.data} />
        ) : (
          <SkeletonChart />
        )}

        {sources ? (
          <SourcesChart sources={sources} />
        ) : (
          <SkeletonChart />
        )}
      </section>

      {/* Recent contacts */}
      <section>
        {contacts ? (
          <RecentContacts contacts={contacts} />
        ) : (
          <SkeletonChart />
        )}
      </section>
    </div>
  );
}
