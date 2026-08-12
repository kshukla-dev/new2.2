'use client'

import React from 'react'
import Link from 'next/link'
import { SlideIn } from '@/components/animations/SlideIn'
import about from '@/data/about-us.json'
import ghg from '@/data/global-hiring.json'

const allCountries = (ghg as any).countries
const available = allCountries.filter((c: any) => c.status?.toLowerCase() !== 'coming soon')
const comingSoon = allCountries.filter((c: any) => c.status?.toLowerCase() === 'coming soon')

const getCountryImage = (name: string) => {
  return (about as any).countryImages[name] || '/countries/eor-spain.webp'
}

const getFlagUrl = (name: string) => {
  return (about as any).flagUrls[name] || ''
}

const getFlag = (name: string) => {
  return (about as any).flags[name] || '🌍'
}

export function OfficeCarousel({ showComingSoon = false }: { showComingSoon?: boolean }) {
  const scrollOffices = (direction: number) => {
    const container = document.querySelector('.all-offices-carousel-wrap .office-slides')
    if (container) {
      const scrollAmount = 260
      container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <>
      <style>{`
        .all-offices-carousel-wrap .carousel-container {
          display: flex;
          align-items: center;
          position: relative;
        }
        .all-offices-carousel-wrap .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          cursor: pointer;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .all-offices-carousel-wrap .nav-btn.prev {
          left: -20px;
        }
        .all-offices-carousel-wrap .nav-btn.next {
          right: -20px;
        }
        .all-offices-carousel-wrap .nav-btn:hover {
          background: #f1f5f9;
          color: #0E0F3B;
        }
        .all-offices-carousel-wrap .office-slides {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 24px;
          width: 100%;
          scrollbar-width: none; /* hide scrollbar for Firefox */
        }
        .all-offices-carousel-wrap .office-slides::-webkit-scrollbar {
          display: none; /* hide scrollbar for Chrome/Safari */
        }
        .all-offices-carousel-wrap .office-slide {
          flex: 0 0 240px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .all-offices-carousel-wrap .office-slide:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.06);
        }
        .all-offices-carousel-wrap .slide-img {
          height: 140px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .all-offices-carousel-wrap .slide-flag,
        .all-offices-carousel-wrap .slide-flag-emoji {
          position: absolute;
          top: 12px;
          left: 12px;
          width: 32px;
          height: 24px;
          border-radius: 4px;
          object-fit: cover;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          border: 1px solid rgba(255,255,255,0.8);
        }
        .all-offices-carousel-wrap .slide-content {
          padding: 20px;
        }
        .all-offices-carousel-wrap .slide-content h4 {
          font-size: 15px;
          font-weight: 700;
          color: #0E0F3B;
          margin-bottom: 4px;
        }
        .all-offices-carousel-wrap .slide-address {
          font-size: 11px;
          color: #64748b;
          margin-bottom: 20px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 30px;
        }
        .all-offices-carousel-wrap .slide-link {
          font-size: 13px;
          color: #0E59F2;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .all-offices-carousel-wrap .coming-soon-wrap {
          margin-top: 40px;
        }
        .all-offices-carousel-wrap .office-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }
        @media (max-width: 1200px) {
          .all-offices-carousel-wrap .office-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 900px) {
          .all-offices-carousel-wrap .office-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .all-offices-carousel-wrap .office-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .all-offices-carousel-wrap .office-card {
          position: relative;
          background-size: cover;
          background-position: center;
          border-radius: 12px;
          overflow: hidden;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .all-offices-carousel-wrap .office-card:hover {
          transform: translateY(-4px);
        }
        .all-offices-carousel-wrap .office-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(14, 15, 59, 0.4), rgba(14, 15, 59, 0.9));
          z-index: 1;
        }
        .all-offices-carousel-wrap .office-card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 16px;
        }
        .all-offices-carousel-wrap .office-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .all-offices-carousel-wrap .office-icon-wrap {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .all-offices-carousel-wrap .office-country-name {
          font-size: 15px;
          font-weight: 700;
          color: white;
        }
        .all-offices-carousel-wrap .office-card-address {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.85);
          margin-top: 12px;
          margin-bottom: 24px;
          line-height: 1.4;
          flex-grow: 1;
        }
        .all-offices-carousel-wrap .office-learn-more {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 700;
          color: white;
        }
        .all-offices-carousel-wrap .blur-card .office-card-overlay {
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          transition: all 0.4s ease;
        }
        .all-offices-carousel-wrap .blur-card:hover .office-card-overlay {
          backdrop-filter: blur(0);
          -webkit-backdrop-filter: blur(0);
        }
        .all-offices-carousel-wrap .coming-soon-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-family: var(--sans);
          font-size: 15px;
          font-weight: 700;
          text-align: center;
          z-index: 5;
          transition: opacity 0.4s ease;
          pointer-events: none;
          background: rgba(14, 15, 59, 0.7);
          padding: 15px 4px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .all-offices-carousel-wrap .blur-card:hover .coming-soon-label {
          opacity: 0;
        }
        .all-offices-carousel-wrap .subsection-title {
          font-family: var(--serif);
          font-size: 22px;
          font-weight: 700;
          color: #0E0F3B;
          margin-bottom: 24px;
        }
      `}</style>
      <SlideIn direction="fade-up" delay={0.1} className="all-offices-carousel-wrap">
        <div className="carousel-container">
          <div className="nav-btn prev" onClick={() => scrollOffices(-1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
          <div className="office-slides">
            {available.map((c: any) => (
              <Link key={c.name} href={c.href || '/'} className="office-slide">
                <div className="slide-img" style={{ backgroundImage: `url(${getCountryImage(c.name)})` }}>
                  {getFlagUrl(c.name) ? (
                    <img src={getFlagUrl(c.name)} className="slide-flag" alt={`${c.name} flag`} />
                  ) : (
                    <span className="slide-flag-emoji">{getFlag(c.name)}</span>
                  )}
                </div>
                <div className="slide-content">
                  <h4>{c.name}</h4>
                  <p className="slide-address" title={c.address}>{c.address}</p>
                  <div className="slide-link">
                    View office{' '}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="nav-btn next" onClick={() => scrollOffices(1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>

        {showComingSoon && comingSoon.length > 0 && (
          <SlideIn direction="fade-up" delay={0.2} className="coming-soon-wrap">
            <h3 className="subsection-title">Coming soon</h3>
            <div className="office-grid">
              {comingSoon.map((c: any) => (
                <div key={c.name} className="office-card blur-card" style={{ backgroundImage: `url(${getCountryImage(c.name)})` }}>
                  <div className="office-card-overlay"></div>
                  <div className="coming-soon-label">Coming soon</div>
                  <div className="office-card-content">
                    <div className="office-card-header">
                      <div className="office-icon-wrap">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <span className="office-country-name">{c.name}</span>
                    </div>
                    <p className="office-card-address" dangerouslySetInnerHTML={{ __html: c.address.replace('Launch', '<br>Launch') }}></p>
                    <div className="office-learn-more">
                      Contact us to plan ahead
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SlideIn>
        )}
      </SlideIn>
    </>
  )
}
