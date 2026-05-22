'use client';

import { useEffect, useState, useCallback } from 'react';

/* ── Types ── */
interface VisitorPageData {
  labels: string[];
  visitors: number[];
  pageViews: number[];
}

interface DeviceData {
  devices: { name: string; value: number }[];
  browsers: { name: string; value: number; color: string }[];
}

interface PageRow {
  page: string;
  views: number;
  uniqueVisitors: number;
}

type SortKey = 'page' | 'views' | 'uniqueVisitors';
type SortDir = 'asc' | 'desc';

/* ── Skeleton ── */
function Skeleton() {
  return <div className="admin-skeleton admin-skeleton-chart" />;
}

/* ── Dual-line Chart ── */
function DualLineChart({ labels, visitors, pageViews }: VisitorPageData) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; v: number; pv: number } | null>(null);
  const W = 800;
  const H = 320;
  const padL = 55;
  const padR = 20;
  const padT = 20;
  const padB = 40;
  const cW = W - padL - padR;
  const cH = H - padT - padB;

  const allVals = [...visitors, ...pageViews];
  const max = Math.max(...allVals, 1);
  const sy = cH / max;
  const n = labels.length;

  function pts(data: number[]) {
    return data.map((v, i) => ({
      x: padL + (i / Math.max(n - 1, 1)) * cW,
      y: padT + cH - v * sy,
    }));
  }

  const vPts = pts(visitors);
  const pvPts = pts(pageViews);
  const vLine = vPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const pvLine = pvPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  const yTicks = 5;
  const yVals = Array.from({ length: yTicks + 1 }, (_, i) => Math.round((max / yTicks) * i));
  const xStep = Math.max(Math.floor(n / 6), 1);

  return (
    <div className="admin-chart-card" id="analytics-dual-chart">
      <h3 className="admin-card-title">Visitors vs Page Views</h3>
      <div className="admin-chart-legend-row">
        <span className="admin-chart-legend-item"><span className="admin-chart-legend-dot" style={{ backgroundColor: '#0388CB' }} />Visitors</span>
        <span className="admin-chart-legend-item"><span className="admin-chart-legend-dot" style={{ backgroundColor: '#8B5CF6' }} />Page Views</span>
      </div>
      <div className="admin-chart-wrapper">
        <svg viewBox={`0 0 ${W} ${H}`} className="admin-chart-svg" preserveAspectRatio="xMidYMid meet">
          {/* Grid */}
          {yVals.map((v) => {
            const y = padT + cH - v * sy;
            return (
              <g key={v}>
                <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="rgba(255,255,255,0.06)" />
                <text x={padL - 8} y={y + 4} textAnchor="end" fill="#8A8A9A" fontSize="11">{v}</text>
              </g>
            );
          })}
          {/* X labels */}
          {labels.map((l, i) =>
            i % xStep === 0 ? (
              <text key={i} x={vPts[i]?.x ?? 0} y={H - 8} textAnchor="middle" fill="#8A8A9A" fontSize="11">{l}</text>
            ) : null
          )}
          {/* Lines */}
          <path d={vLine} fill="none" stroke="#0388CB" strokeWidth="2" strokeLinejoin="round" />
          <path d={pvLine} fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinejoin="round" />
          {/* Hover targets */}
          {vPts.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="14"
              fill="transparent"
              onMouseEnter={() => setTooltip({ x: p.x, y: Math.min(p.y, pvPts[i]!.y), label: labels[i]!, v: visitors[i]!, pv: pageViews[i]! })}
              onMouseLeave={() => setTooltip(null)}
              style={{ cursor: 'pointer' }}
            />
          ))}
          {tooltip && (
            <>
              <line x1={tooltip.x} y1={padT} x2={tooltip.x} y2={padT + cH} stroke="rgba(255,255,255,0.1)" strokeDasharray="4" />
              <rect x={tooltip.x - 60} y={tooltip.y - 46} width="120" height="38" rx="6" fill="#0C0C10" stroke="rgba(255,255,255,0.1)" />
              <text x={tooltip.x} y={tooltip.y - 30} textAnchor="middle" fill="#0388CB" fontSize="11">Visitors: {tooltip.v}</text>
              <text x={tooltip.x} y={tooltip.y - 15} textAnchor="middle" fill="#8B5CF6" fontSize="11">Page Views: {tooltip.pv}</text>
            </>
          )}
        </svg>
      </div>
    </div>
  );
}

/* ── Horizontal Bar Chart ── */
function DeviceBarChart({ devices }: { devices: { name: string; value: number }[] }) {
  const max = Math.max(...devices.map((d) => d.value), 1);
  return (
    <div className="admin-analytics-device-card" id="device-breakdown">
      <h3 className="admin-card-title">Device Breakdown</h3>
      <div className="admin-bar-list">
        {devices.map((d) => (
          <div key={d.name} className="admin-bar-item">
            <div className="admin-bar-header">
              <span className="admin-bar-label">{d.name}</span>
              <span className="admin-bar-value">{d.value.toLocaleString()}</span>
            </div>
            <div className="admin-bar-track">
              <div
                className="admin-bar-fill"
                style={{ width: `${(d.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Browser Pie Chart ── */
function BrowserPieChart({ browsers }: { browsers: { name: string; value: number; color: string }[] }) {
  const total = browsers.reduce((s, b) => s + b.value, 0) || 1;
  const radius = 55;
  const circ = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="admin-analytics-browser-card" id="browser-breakdown">
      <h3 className="admin-card-title">Browser Breakdown</h3>
      <div className="admin-sources-layout">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {browsers.map((b) => {
            const pct = b.value / total;
            const dash = pct * circ;
            const gap = circ - dash;
            const cur = offset;
            offset += dash;
            return (
              <circle
                key={b.name}
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke={b.color}
                strokeWidth="14"
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={-cur}
                transform="rotate(-90 70 70)"
              />
            );
          })}
        </svg>
        <ul className="admin-sources-legend">
          {browsers.map((b) => (
            <li key={b.name} className="admin-sources-legend-item">
              <span className="admin-sources-dot" style={{ backgroundColor: b.color }} />
              <span className="admin-sources-legend-label">{b.name}</span>
              <span className="admin-sources-legend-value">{Math.round((b.value / total) * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Top Pages Table ── */
function TopPagesTable({ pages }: { pages: PageRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('views');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  const sorted = [...pages].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  const arrow = (key: SortKey) =>
    sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : '';

  return (
    <div className="admin-analytics-pages-card" id="top-pages-table">
      <h3 className="admin-card-title">Top Pages</h3>
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th id="sort-page" onClick={() => handleSort('page')} className="admin-table-sortable">Page{arrow('page')}</th>
              <th id="sort-views" onClick={() => handleSort('views')} className="admin-table-sortable">Views{arrow('views')}</th>
              <th id="sort-unique" onClick={() => handleSort('uniqueVisitors')} className="admin-table-sortable">Unique Visitors{arrow('uniqueVisitors')}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <tr key={p.page}>
                <td>{p.page}</td>
                <td>{p.views.toLocaleString()}</td>
                <td>{p.uniqueVisitors.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {sorted.length === 0 && <p className="admin-empty">No page data available.</p>}
      </div>
    </div>
  );
}

/* ── Analytics Page ── */
export default function AdminAnalyticsPage() {
  const [days, setDays] = useState(30);
  const [visitorData, setVisitorData] = useState<VisitorPageData | null>(null);
  const [deviceData, setDeviceData] = useState<DeviceData | null>(null);
  const [pages, setPages] = useState<PageRow[] | null>(null);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    setVisitorData(null);
    setDeviceData(null);
    setPages(null);
    setError('');

    try {
      const [visRes, devRes, pgRes] = await Promise.all([
        fetch(`/api/analytics/visitors?days=${days}`, { cache: 'no-store' }),
        fetch(`/api/analytics/devices?days=${days}`, { cache: 'no-store' }),
        fetch(`/api/analytics/pages?days=${days}`, { cache: 'no-store' }),
      ]);

      if (visRes.ok) {
        const d = await visRes.json();
        setVisitorData({
          labels: d.labels ?? [],
          visitors: d.visitors ?? [],
          pageViews: d.views ?? [],
        });
      }
      if (devRes.ok) {
        const raw = await devRes.json();
        const browserColors: Record<string, string> = {
          Chrome: '#4285F4',
          Safari: '#5AC8FA',
          Firefox: '#FF7139',
          Edge: '#0078D7',
          Opera: '#FF1B2D',
          Other: '#8B5CF6',
        };
        setDeviceData({
          devices: raw.devices ?? [],
          browsers: (raw.browsers ?? []).map((b: { name: string; value: number }) => ({
            ...b,
            color: browserColors[b.name] || '#8B5CF6',
          })),
        });
      }
      if (pgRes.ok) {
        const pgData = await pgRes.json();
        const rawPages = pgData.pages ?? pgData ?? [];
        setPages(
          rawPages.map((p: Record<string, unknown>) => ({
            page: (p.path ?? p.page ?? '/') as string,
            views: (p.views ?? 0) as number,
            uniqueVisitors: (p.uniqueVisitors ?? 0) as number,
          }))
        );
      }
    } catch {
      setError('Failed to load analytics data.');
    }
  }, [days]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const dayOptions = [7, 30, 90];

  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="admin-analytics">
      {/* Date range pills */}
      <div className="admin-analytics-pills">
        {dayOptions.map((d) => (
          <button
            key={d}
            id={`pill-${d}d`}
            className={`admin-pill ${days === d ? 'admin-pill-active' : ''}`}
            onClick={() => setDays(d)}
          >
            {d}d
          </button>
        ))}
      </div>

      {/* Dual line chart */}
      {visitorData ? (
        <DualLineChart labels={visitorData.labels} visitors={visitorData.visitors} pageViews={visitorData.pageViews} />
      ) : (
        <Skeleton />
      )}

      {/* Device + Browser row */}
      <div className="admin-analytics-row">
        {deviceData ? (
          <>
            <DeviceBarChart devices={deviceData.devices} />
            <BrowserPieChart browsers={deviceData.browsers} />
          </>
        ) : (
          <>
            <Skeleton />
            <Skeleton />
          </>
        )}
      </div>

      {/* Top pages */}
      {pages ? <TopPagesTable pages={pages} /> : <Skeleton />}
    </div>
  );
}
