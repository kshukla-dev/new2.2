'use client'
import React from 'react'

export interface ComparisonRow {
  feature: string
  jf: React.ReactNode
  competitor: React.ReactNode
  gmbh: React.ReactNode
}

interface CampaignComparisonTableProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  disclaimer?: string
  headers: string[]
  rows: ComparisonRow[]
}

export default function CampaignComparisonTable({
  eyebrow = 'COMPARE YOUR OPTIONS',
  title = 'Why companies choose J&F over setting up their own entity.',
  subtitle = 'See the difference between a dedicated country partner, a platform and doing everything yourself.',
  disclaimer = '*Competitor pricing is based on public information as of 2026.',
  headers,
  rows
}: CampaignComparisonTableProps) {
  return (
    <section id="comparison-table" style={{ padding: '40px 0', background: '#f8fafc', borderTop: '1px solid #e8edf2', borderBottom: '1px solid #e8edf2' }}>
      <style>{`
        .cct-section-header { margin-bottom: 44px; }
        .cct-eyebrow {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F7931E;
          margin-bottom: 12px;
        }
        .cct-title {
          font-family: "IBM Plex Serif", Georgia, serif;
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 700;
          color: #0f1f3d;
          line-height: 1.2;
          margin: 0 0 12px 0;
          letter-spacing: -0.01em;
        }
        .cct-subtitle {
          font-size: 16px;
          color: #64748b;
          line-height: 1.6;
          max-width: 640px;
          margin: 0;
        }
        /* Scroll container */
        .cct-scroll {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 12px rgba(15,31,61,0.06);
          background: #fff;
        }
        .cct-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 680px;
          table-layout: fixed;
        }
        /* Header row */
        .cct-thead-tr { background: #0e1f3d; }
        .cct-th-feature {
          padding: 18px 20px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          width: 28%;
        }
        .cct-th-jf {
          padding: 18px 20px;
          text-align: center;
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          background: #143369;
          width: 24%;
          position: relative;
        }
        
        .cct-th-other {
          padding: 18px 20px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          width: 24%;
        }
        /* Body rows */
        .cct-tbody-tr {
          border-bottom: 1px solid #f1f5f9;
          transition: background 0.15s;
        }
        .cct-tbody-tr:last-child { border-bottom: none; }
        .cct-tbody-tr:hover { background: #fafbfd; }
        .cct-td-feature {
          padding: 15px 20px;
          font-size: 13.5px;
          font-weight: 600;
          color: #334155;
          vertical-align: middle;
          border-right: 1px solid #f1f5f9;
        }
        .cct-td-jf {
          padding: 15px 20px;
          font-size: 13.5px;
          text-align: center;
          vertical-align: middle;
          background: rgba(20, 51, 105, 0.03);
          border-right: 1px solid #f1f5f9;
        }
        .cct-td-other {
          padding: 15px 20px;
          font-size: 13.5px;
          color: #64748b;
          text-align: center;
          vertical-align: middle;
          border-right: 1px solid #f1f5f9;
        }
        .cct-td-other:last-child { border-right: none; }
        .cct-disclaimer {
          font-size: 12px;
          color: #94a3b8;
          font-style: italic;
          margin-top: 16px;
          text-align: left;
        }
      `}</style>

      <div className="jaf-container">
        <div className="cct-section-header">
          <span className="cct-eyebrow">{eyebrow}</span>
          <h2 className="cct-title">{title}</h2>
          {subtitle && <p className="cct-subtitle">{subtitle}</p>}
        </div>

        <div className="cct-scroll">
          <table className="cct-table">
            <thead>
              <tr className="cct-thead-tr">
                <th className="cct-th-feature">{headers[0] || 'Feature'}</th>
                <th className="cct-th-jf">{headers[1] || 'Jackson & Frank'}</th>
                <th className="cct-th-other">{headers[2] || 'Deel / Remote'}</th>
                <th className="cct-th-other" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>{headers[3] || 'Set up a GmbH yourself'}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="cct-tbody-tr">
                  <td className="cct-td-feature">{row.feature}</td>
                  <td className="cct-td-jf">{row.jf}</td>
                  <td className="cct-td-other">{row.competitor}</td>
                  <td className="cct-td-other">{row.gmbh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {disclaimer && <p className="cct-disclaimer">{disclaimer}</p>}
      </div>
    </section>
  )
}
