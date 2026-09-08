import { useState, useEffect, useRef } from "react";
import { Button, InputField, TextareaField, SelectField, ButtonGroup } from "@figma/astraui";
import {
  Phone, Mail, MapPin, Clock, ChevronDown, ArrowRight, Menu, X,
  CheckCircle2, Wrench, Building2, HardHat, Flame, Shield,
  Zap, Home, Store, Church, Factory, HeartHandshake, Users, ShieldCheck,
  Star, ExternalLink, ChevronLeft, ChevronRight, Award,
} from "lucide-react";

/* ─── Images ─────────────────────────────────────────── */
const IMG = {
  hero:             "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1800&h=1000&fit=crop&auto=format",
  plumber1:         "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?w=900&h=700&fit=crop&auto=format",
  plumber2:         "https://images.unsplash.com/photo-1676210133055-eab6ef033ce3?w=900&h=700&fit=crop&auto=format",
  waterHeater:      "https://images.unsplash.com/photo-1676210134190-3f2c0d5cf58d?w=900&h=700&fit=crop&auto=format",
  toiletWork:       "https://images.unsplash.com/photo-1676210134050-6f12c6898395?w=900&h=700&fit=crop&auto=format",
  pipesInWall:      "https://images.unsplash.com/photo-1768321916212-17ae334a3d63?w=900&h=700&fit=crop&auto=format",
  industrialPipes:  "https://images.unsplash.com/photo-1785306589604-1c6ebaee741f?w=900&h=700&fit=crop&auto=format",
  construction:     "https://images.unsplash.com/photo-1693639767415-27ff64ce4da2?w=900&h=700&fit=crop&auto=format",
  constructionSite: "https://images.unsplash.com/photo-1693639056346-49cd9529378a?w=1200&h=700&fit=crop&auto=format",
  bathroomShower:   "https://images.unsplash.com/photo-1638799869566-b17fa794c4de?w=900&h=700&fit=crop&auto=format",
  commercialKitchen:"https://images.unsplash.com/photo-1771360963016-1408c2de12c4?w=900&h=700&fit=crop&auto=format",
  bathtub2:         "https://images.unsplash.com/photo-1521783593447-5702b9bfd267?w=900&h=700&fit=crop&auto=format",
  pipes:            "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=900&h=700&fit=crop&auto=format",
  grayscalePipes:   "https://images.unsplash.com/photo-1538474705339-e87de81450e8?w=900&h=700&fit=crop&auto=format",
};

/* ─── Counter hook ───────────────────────────────────── */
function useCounter(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const ran = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !ran.current) {
        ran.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setCount(Math.floor(p * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return { count, ref };
}

/* ─── Scroll reveal ──────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const sel = "[data-reveal], [data-reveal-left]";
    const els = Array.from(document.querySelectorAll<HTMLElement>(sel));
    if (!("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("in-view")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Hiring Banner ──────────────────────────────────── */
function HiringBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div style={{ background: "#D92B36", padding: "9px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", position: "relative", zIndex: 100 }}>
      <span style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: "#fff", animation: "khpPulse 1.6s ease-out infinite" }} />
      <span style={{ color: "#fff", fontSize: "13px", fontWeight: 600, letterSpacing: "0.02em" }}>
        We're Hiring! — Health, Vision, Dental &amp; SIMPLE IRA · TN Drug Free Workplace
      </span>
      <a href="mailto:employees@khppro.com?subject=Employment Application" style={{ color: "#fff", fontSize: "12px", fontWeight: 700, background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.45)", borderRadius: "4px", padding: "4px 12px", textDecoration: "none" }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.38)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
      >Apply Now</a>
      {/* using <button> instead of <Button>: icon-only dismiss, no text, incompatible with Astra Button's pill shape */}
      <button onClick={() => setVisible(false)} aria-label="Dismiss" style={{ position: "absolute", right: "16px", background: "transparent", border: "none", color: "rgba(255,255,255,0.65)", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center" }}>
        <X size={15} />
      </button>
    </div>
  );
}

/* ─── Header ─────────────────────────────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav = [
    { label: "Residential", href: "#residential" },
    { label: "Commercial",  href: "#commercial"  },
    { label: "Construction",href: "#construction" },
    { label: "Services",    href: "#services"     },
    { label: "About",       href: "#about"        },
  ];

  return (
    <>
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "background 0.3s, box-shadow 0.3s", background: scrolled ? "rgba(10,34,22,0.97)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.05)" : "none" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }} aria-label="Keith Hodge Plumbing — home">
            <div className="khp-mark" style={{ width: "42px", height: "42px", background: "#fff", boxShadow: "0 4px 14px rgba(86,189,119,0.25)" }}>
              <img src="https://khppro.com/favicon.ico" alt="KHP" style={{ width: "28px", height: "28px", objectFit: "contain" }} />
            </div>
            <div>
              <div className="khp-wordmark" style={{ fontSize: "17px", color: "#fff", lineHeight: 1 }}>Keith Hodge Plumbing</div>
              <div className="khp-tagline" style={{ fontSize: "9px", color: "var(--khp-copper)", marginTop: "3px" }}>The Plumbing Professionals</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden-mobile" style={{ display: "flex", gap: "2px" }}>
            {nav.map(l => (
              <a key={l.label} href={l.href} style={{ color: "rgba(255,255,255,0.72)", textDecoration: "none", fontSize: "14px", fontWeight: 500, padding: "8px 13px", borderRadius: "6px", transition: "color 0.15s, background 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.72)"; e.currentTarget.style.background = "transparent"; }}
              >{l.label}</a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden-mobile" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <a href="https://www.facebook.com/khppro/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
              style={{ width: "34px", height: "34px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.65)", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="tel:4234543556" style={{ display: "flex", alignItems: "center", gap: "7px", color: "rgba(255,255,255,0.82)", textDecoration: "none", fontSize: "14px", fontWeight: 500, padding: "8px 14px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.16)", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)"; }}
            ><Phone size={14} /> (423) 454-3556</a>
            <a href="#contact" className="btn-khp-primary" style={{ padding: "9px 20px", fontSize: "14px" }}>Get a Quote</a>
          </div>

          {/* Mobile right */}
          <div className="show-mobile" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <a href="tel:4234543556" aria-label="Call KHP" style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--khp-copper)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><Phone size={16} /></a>
            {/* using <button> instead of <Button>: hamburger toggle, icon-only, incompatible with Astra pill shape */}
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen} style={{ width: "40px", height: "40px", borderRadius: "6px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", cursor: "pointer" }}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="show-mobile" style={{ position: "fixed", top: "72px", left: 0, right: 0, zIndex: 49, background: "var(--khp-green)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "16px 24px 28px" }}>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {nav.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ color: "rgba(255,255,255,0.82)", textDecoration: "none", fontSize: "16px", fontWeight: 500, padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{l.label}</a>
            ))}
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
            <a href="tel:4234543556" className="btn-khp-secondary" style={{ justifyContent: "center" }}><Phone size={15} /> Call (423) 454-3556</a>
            <a href="#contact" className="btn-khp-primary" onClick={() => setMenuOpen(false)} style={{ justifyContent: "center" }}>Get a Quote <ArrowRight size={15} /></a>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Hero ───────────────────────────────────────────── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }} aria-label="Hero">
      {/* BG */}
      <div style={{ position: "absolute", inset: 0, background: "var(--khp-dark)" }}>
        <img src={IMG.hero} alt="Luxury bathroom — professional plumbing by Keith Hodge Plumbing"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease" }}
          loading="eager" onLoad={() => setLoaded(true)} />
        {/* Deep gradient: left heavy for text legibility */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(8,21,33,0.96) 0%, rgba(8,21,33,0.82) 45%, rgba(11,31,51,0.5) 75%, rgba(23,74,115,0.25) 100%)" }} />
        {/* Copper warmth accent top-left */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "40%", height: "60%", background: "radial-gradient(ellipse at top left, rgba(86,189,119,0.1) 0%, transparent 65%)" }} />
      </div>

      <div style={{ position: "relative", maxWidth: "1320px", margin: "0 auto", padding: "120px 24px 100px", width: "100%", display: "grid", gridTemplateColumns: "1fr auto", gap: "40px", alignItems: "center" }} className="hero-inner">
        {/* Left: copy */}
        <div style={{ maxWidth: "680px" }}>
          {/* Eyebrow */}
          <div className="anim-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(86,189,119,0.15)", border: "1px solid rgba(86,189,119,0.4)", borderRadius: "4px", padding: "6px 14px", marginBottom: "28px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--khp-copper)", display: "inline-block", animation: "khpPulse 2s infinite" }} />
            <span style={{ color: "var(--khp-copper)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Locally Owned · Chattanooga, TN · Est. 2008
            </span>
          </div>

          {/* Headline */}
          <h1 className="anim-fade-up" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(52px, 7.5vw, 100px)", fontWeight: 400, color: "#fff", lineHeight: 0.95, letterSpacing: "-0.01em", marginBottom: "20px", animationDelay: "0.08s" }}>
            Keith Hodge
            <br />
            <span style={{ color: "var(--khp-copper)" }}>Plumbing</span>
          </h1>

          {/* Tagline */}
          <p className="anim-fade-up" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 1.5vw, 16px)", fontWeight: 400, color: "rgba(255,255,255,0.5)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "24px", animationDelay: "0.14s" }}>
            The Plumbing Professionals
          </p>

          {/* Sub copy */}
          <p className="anim-fade-up" style={{ fontSize: "clamp(16px, 1.5vw, 19px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.65, maxWidth: "520px", marginBottom: "40px", fontWeight: 400, animationDelay: "0.18s" }}>
            Professional residential, commercial, and construction plumbing throughout Chattanooga and the surrounding area — backed by 100+ years of combined experience.
          </p>

          {/* CTAs */}
          <div className="anim-fade-up" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "44px", animationDelay: "0.23s" }}>
            {/* using <a> instead of <Button>: copper brand CTA incompatible with Astra neutral/primary color scheme */}
            <a href="#contact" className="btn-khp-primary" style={{ fontSize: "16px", padding: "15px 32px" }}>
              Get a Free Quote <ArrowRight size={18} />
            </a>
            <a href="tel:4234543556" className="btn-khp-secondary" style={{ fontSize: "16px", padding: "14px 32px" }}>
              <Phone size={17} /> (423) 454-3556
            </a>
          </div>

          {/* Trust badges */}
          <div className="anim-fade-up" style={{ display: "flex", flexWrap: "wrap", gap: "20px", animationDelay: "0.28s" }}>
            {[
              { icon: <CheckCircle2 size={14} />, text: "100+ Yrs Combined Experience" },
              { icon: <Shield size={14} />, text: "TN Lic. #65086 · CMC-A · MU-A" },
              { icon: <Award size={14} />, text: "Fully Insured" },
            ].map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <span style={{ color: "var(--khp-copper)" }}>{b.icon}</span>
                <span style={{ color: "rgba(255,255,255,0.52)", fontSize: "12px", fontWeight: 500 }}>{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: floating call card (desktop only) */}
        <div className="hidden-mobile anim-fade-in" style={{ animationDelay: "0.4s" }}>
          <div style={{ width: "240px", background: "rgba(11,31,51,0.85)", backdropFilter: "blur(20px)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}>
            {/* Copper header strip */}
            <div style={{ background: "var(--khp-copper)", padding: "16px 20px" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", marginBottom: "4px" }}>Call us now</div>
              <a href="tel:4234543556" style={{ fontSize: "20px", fontWeight: 800, color: "#fff", textDecoration: "none", fontFamily: "var(--font-body)", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={17} /> (423) 454-3556
              </a>
            </div>
            {/* Info rows */}
            <div style={{ padding: "20px" }}>
              {[
                { icon: <Clock size={13} />, label: "Office Hours", value: "Mon–Fri 7:30–3:30" },
                { icon: <MapPin size={13} />, label: "Location", value: "Ooltewah, TN 37363" },
                { icon: <Mail size={13} />, label: "Service Email", value: "service@khppro.com" },
              ].map((r, i) => (
                <div key={i} style={{ marginBottom: i < 2 ? "16px" : 0 }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--khp-copper)", marginTop: "2px", flexShrink: 0 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "2px" }}>{r.label}</div>
                      <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.82)", fontWeight: 500 }}>{r.value}</div>
                    </div>
                  </div>
                </div>
              ))}
              <a href="#contact" className="btn-khp-primary" style={{ justifyContent: "center", width: "100%", marginTop: "20px", fontSize: "13px", padding: "11px 16px" }}>
                Request a Quote <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll line */}
      <div className="hidden-mobile" style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, rgba(86,189,119,0.7), transparent)", animation: "fadeIn 1.5s ease 1s both" }} />
        <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Scroll</span>
      </div>

      <style>{`
        @media (max-width: 860px) { .hero-inner { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ─── Stats Strip ─────────────────────────────────────── */
function StatsStrip() {
  const yrs  = useCounter(100);
  const proj = useCounter(500);
  const svc  = useCounter(6);

  const stats = [
    { refObj: yrs,  suffix: "+", label: "Years Combined Experience", icon: <Award size={20} /> },
    { refObj: proj, suffix: "+", label: "Projects Completed",        icon: <CheckCircle2 size={20} /> },
    { refObj: svc,  suffix: "",  label: "Service Disciplines",       icon: <Wrench size={20} /> },
  ];

  return (
    <section style={{ background: "var(--khp-copper)", padding: "0 24px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }} className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} style={{ padding: "40px 32px", display: "flex", alignItems: "center", gap: "20px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.2)" : "none" }} className="stat-item">
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 400, color: "#fff", lineHeight: 1, letterSpacing: "-0.01em" }}>
                <span ref={s.refObj.ref as React.RefObject<HTMLSpanElement>}>{s.refObj.count}</span>{s.suffix}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", fontWeight: 500, marginTop: "4px" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 680px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .stat-item  { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.2); padding: 28px 24px !important; }
          .stat-item:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}

/* ─── About / Local Trust ─────────────────────────────── */
function LocalTrust() {
  return (
    <section id="about" style={{ background: "#fff", padding: "var(--sec-pad)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="grid-1col">
          {/* Text */}
          <div data-reveal-left>
            <p className="khp-eyebrow">About KHP</p>
            <h2 className="khp-h2">Local experience.<br />Professional plumbing.</h2>
            <p style={{ fontSize: "17px", color: "var(--khp-text-secondary)", lineHeight: 1.75, marginBottom: "18px" }}>
              KHP is a locally owned, family-managed plumbing company serving Chattanooga, Tennessee and surrounding communities, including North Georgia. Our clients include homeowners, national chains, restaurants, hotels, churches, and general contractors.
            </p>
            {/* Quote callout */}
            <div style={{ borderLeft: "3px solid var(--khp-copper)", paddingLeft: "20px", marginBottom: "32px" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "18px", color: "var(--khp-navy)", lineHeight: 1.4, fontStyle: "normal" }}>
                "Trust your family to the true professionals!"
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "36px" }}>
              {[
                { icon: <Shield size={18} />, title: "Licensed & Insured", sub: "TN Lic. #65086 · CMC-A · MU-A" },
                { icon: <Users size={18} />, title: "Family Managed", sub: "Locally owned, community-first" },
                { icon: <CheckCircle2 size={18} />, title: "One Labor Rate", sub: "Same rate for residential & commercial" },
                { icon: <HardHat size={18} />, title: "All Project Types", sub: "Service calls to new construction" },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(86,189,119,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--khp-copper)", flexShrink: 0 }}>{p.icon}</div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--khp-navy)", marginBottom: "2px" }}>{p.title}</div>
                    <div style={{ fontSize: "12px", color: "var(--khp-text-secondary)", lineHeight: 1.45 }}>{p.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-khp-navy">Talk to Our Team <ArrowRight size={15} /></a>
          </div>

          {/* Image stack */}
          <div style={{ position: "relative" }} data-reveal>
            <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", aspectRatio: "4/5", background: "#c8d8e8" }}>
              <img src={IMG.plumber1} alt="KHP plumber at work" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
            </div>
            {/* Floating stat card */}
            <div style={{ position: "absolute", bottom: "28px", left: "-28px", background: "var(--khp-navy)", borderRadius: "16px", padding: "20px 24px", boxShadow: "0 16px 48px rgba(11,31,51,0.3)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "40px", color: "var(--khp-copper)", lineHeight: 1 }}>100+</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "4px", lineHeight: 1.5 }}>Years of combined<br />plumbing expertise</div>
            </div>
            {/* Badge */}
            <div className="hidden-mobile" style={{ position: "absolute", top: "24px", right: "-20px", background: "var(--khp-copper)", borderRadius: "12px", padding: "12px 16px", boxShadow: "0 8px 24px rgba(86,189,119,0.4)" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>Est. 2008</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.85)", marginTop: "2px" }}>Ooltewah, TN</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services ────────────────────────────────────────── */
function ServicesSection() {
  const [active, setActive] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 860);
    check(); window.addEventListener("resize", check); return () => window.removeEventListener("resize", check);
  }, []);

  const services = [
    {
      id: "residential", num: "01", label: "Residential",
      desc: '"The things in your home should work!" — from minor drips to full repipes, our dedicated technicians handle it all.',
      items: ["Leaking Faucets & Clogged Drains", "Toilet, Tub & Shower Service", "Water Heater Repair/Replacement", "Water Filters & Softeners", "Gas Lines & Outdoor Kitchens", "Dishwasher & Disposal Hookup"],
      img: IMG.bathroomShower, href: "#contact", cta: "Residential Plumbing",
    },
    {
      id: "commercial", num: "02", label: "Commercial",
      desc: "Restaurants, hotels, national chains, churches, storefronts — same labor rate as residential. Professional service every time.",
      items: ["Restaurants & Food Service", "Hotels & National Chains", "Churches & Storefronts", "Hydro-Jetting & Camera", "Grease Traps & Backflow", "Boilers & Water Heaters"],
      img: IMG.commercialKitchen, href: "#commercial", cta: "Commercial Plumbing",
    },
    {
      id: "construction", num: "03", label: "Construction",
      desc: "In-house estimating, digital takeoffs, professional install with no additional change orders. True craftsmanship becomes apparent.",
      items: ["In-House Estimating Dept.", "Digital Blueprint Takeoff", "Site Work & Underground", "Interior Rough-In & Trim-Out", "Close-Out Documentation", "TN Lic. #65086 · CMC-A · MU-A"],
      img: IMG.construction, href: "#construction", cta: "Construction Plumbing",
    },
  ];

  /* Mobile accordion */
  if (isMobile) {
    return (
      <section id="services" style={{ background: "var(--khp-warm-white)", padding: "var(--sec-pad-sm)" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <p className="khp-eyebrow">Our Services</p>
          <h2 className="khp-h2" style={{ marginBottom: "32px" }}>Plumbing for every stage of your property.</h2>
          {services.map((s, i) => (
            <div key={i} id={s.id} style={{ marginBottom: "10px", borderRadius: "14px", overflow: "hidden", border: `1px solid ${active === i ? "var(--khp-copper)" : "var(--khp-border)"}`, transition: "border-color 0.2s" }}>
              {/* using <button> instead of <Button>: full-width accordion trigger, incompatible with Astra Button */}
              <button onClick={() => setActive(active === i ? null : i)} aria-expanded={active === i}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px", background: active === i ? "var(--khp-navy)" : "#fff", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: active === i ? "var(--khp-copper)" : "var(--khp-text-secondary)", letterSpacing: "0.08em" }}>{s.num}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", color: active === i ? "#fff" : "var(--khp-navy)" }}>{s.label}</span>
                </div>
                <ChevronDown size={18} color={active === i ? "#fff" : "var(--khp-text-secondary)"} style={{ transform: active === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              {active === i && (
                <div style={{ padding: "20px", background: "var(--khp-warm-white)" }}>
                  <img src={s.img} alt={s.label} style={{ width: "100%", borderRadius: "10px", aspectRatio: "16/9", objectFit: "cover", marginBottom: "16px" }} loading="lazy" />
                  <p style={{ fontSize: "15px", color: "var(--khp-text-secondary)", lineHeight: 1.65, marginBottom: "16px" }}>{s.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, marginBottom: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {s.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--khp-text)" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--khp-copper)", flexShrink: 0, display: "inline-block" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href={s.href} className="btn-khp-navy" style={{ fontSize: "14px" }}>{s.cta} <ArrowRight size={14} /></a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* Desktop: large cards */
  return (
    <section id="services" style={{ background: "var(--khp-warm-white)", padding: "var(--sec-pad)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px", flexWrap: "wrap", gap: "24px" }}>
          <div data-reveal>
            <p className="khp-eyebrow">Our Services</p>
            <h2 className="khp-h2">Plumbing for every stage<br />of your property.</h2>
          </div>
          <p style={{ fontSize: "15px", color: "var(--khp-text-secondary)", lineHeight: 1.65, maxWidth: "340px" }} data-reveal>
            From everyday repairs to complex commercial systems and new construction — experienced professionals on every job.
          </p>
        </div>

        {/* Featured card (first) + two stacked cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "14px", alignItems: "stretch" }}>
          {/* Featured large card */}
          <div id={services[0].id} className="service-card" style={{ position: "relative", borderRadius: "var(--radius-card)", overflow: "hidden", minHeight: "600px", cursor: "pointer" }}
            onMouseEnter={() => setActive(0)} onMouseLeave={() => setActive(null)}>
            <div style={{ position: "absolute", inset: 0, background: "#1a3040" }}>
              <img src={services[0].img} alt={services[0].label} className="service-card-img" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} loading="lazy" />
            </div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,21,33,0.95) 0%, rgba(8,21,33,0.4) 55%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "36px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--khp-copper)", letterSpacing: "0.1em", marginBottom: "8px", display: "block" }}>{services[0].num}</span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "38px", color: "#fff", lineHeight: 1, marginBottom: "14px", transform: active === 0 ? "translateY(-4px)" : "none", transition: "transform 0.3s" }}>{services[0].label}</h3>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.72)", lineHeight: 1.6, marginBottom: "20px", maxHeight: active === 0 ? "80px" : "0", overflow: "hidden", opacity: active === 0 ? 1 : 0, transition: "max-height 0.35s, opacity 0.3s" }}>{services[0].desc}</p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px", maxHeight: active === 0 ? "120px" : "0", overflow: "hidden", opacity: active === 0 ? 1 : 0, transition: "max-height 0.35s 0.05s, opacity 0.3s 0.05s" }}>
                {services[0].items.map((item, j) => (
                  <li key={j} style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", padding: "4px 10px" }}>{item}</li>
                ))}
              </ul>
              <a href={services[0].href} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--khp-copper)", textDecoration: "none", fontSize: "14px", fontWeight: 600, transition: "gap 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.gap = "12px")} onMouseLeave={e => (e.currentTarget.style.gap = "6px")}>
                {services[0].cta} <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Two stacked cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {services.slice(1).map((s, i) => {
              const idx = i + 1;
              return (
                <div key={idx} id={s.id} className="service-card" style={{ position: "relative", borderRadius: "var(--radius-card)", overflow: "hidden", flex: 1, minHeight: "290px", cursor: "pointer" }}
                  onMouseEnter={() => setActive(idx)} onMouseLeave={() => setActive(null)}>
                  <div style={{ position: "absolute", inset: 0, background: "#1a3040" }}>
                    <img src={s.img} alt={s.label} className="service-card-img" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} loading="lazy" />
                  </div>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,21,33,0.95) 0%, rgba(8,21,33,0.35) 55%, transparent 100%)" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "28px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--khp-copper)", letterSpacing: "0.1em", marginBottom: "6px", display: "block" }}>{s.num}</span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "#fff", lineHeight: 1, marginBottom: "10px", transform: active === idx ? "translateY(-3px)" : "none", transition: "transform 0.3s" }}>{s.label}</h3>
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.55, marginBottom: "16px", maxHeight: active === idx ? "70px" : "0", overflow: "hidden", opacity: active === idx ? 1 : 0, transition: "max-height 0.3s, opacity 0.25s" }}>{s.desc}</p>
                    <a href={s.href} style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--khp-copper)", textDecoration: "none", fontSize: "13px", fontWeight: 600, transition: "gap 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.gap = "10px")} onMouseLeave={e => (e.currentTarget.style.gap = "6px")}>
                      {s.cta} <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Work Gallery ────────────────────────────────────── */
function WorkGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos = [
    { src: IMG.plumber1,        caption: "Pipe installation — residential service call",   wide: false },
    { src: IMG.plumber2,        caption: "Cabinet plumbing — fixture replacement",         wide: true  },
    { src: IMG.waterHeater,     caption: "Tankless water heater installation",             wide: false },
    { src: IMG.pipesInWall,     caption: "Rough-in plumbing — new construction",          wide: false },
    { src: IMG.toiletWork,      caption: "Toilet service & installation",                 wide: true  },
    { src: IMG.industrialPipes, caption: "Commercial pipe systems",                       wide: false },
    { src: IMG.constructionSite,caption: "New construction build-out",                    wide: false },
    { src: IMG.bathtub2,        caption: "Bathroom renovation — freestanding tub",        wide: false },
  ];

  return (
    <section style={{ background: "var(--khp-dark)", padding: "var(--sec-pad)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "24px" }}>
          <div data-reveal>
            <p className="khp-eyebrow" style={{ color: "var(--khp-copper)" }}>Our Work</p>
            <h2 className="khp-h2 khp-h2-white">Real jobs.<br />Real results.</h2>
          </div>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.45)", maxWidth: "320px", lineHeight: 1.65 }} data-reveal>
            Residential service calls, commercial installations, new construction — craftsmanship across every project type.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "220px", gap: "10px" }} className="gallery-grid gal-resp">
          {photos.map((p, i) => (
            <div key={i} style={{ gridColumn: p.wide ? "span 2" : "span 1", borderRadius: "14px", overflow: "hidden", background: "#1a3040", position: "relative", cursor: "pointer" }}
              onClick={() => setLightbox(i)}
              onMouseEnter={e => {
                const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                if (img) img.style.transform = "scale(1.06)";
                const ov = e.currentTarget.querySelector(".gov") as HTMLElement;
                if (ov) ov.style.opacity = "1";
              }}
              onMouseLeave={e => {
                const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                if (img) img.style.transform = "scale(1)";
                const ov = e.currentTarget.querySelector(".gov") as HTMLElement;
                if (ov) ov.style.opacity = "0";
              }}>
              <img src={`${p.src.split("?")[0]}?w=700&h=500&fit=crop&auto=format`} alt={p.caption}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} loading="lazy" />
              <div className="gov" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,21,33,0.88) 0%, transparent 55%)", opacity: 0, transition: "opacity 0.3s", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "18px" }}>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.9)", fontWeight: 500, lineHeight: 1.4 }}>{p.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={() => setLightbox(null)}>
          <div style={{ position: "relative", maxWidth: "1000px", width: "100%" }} onClick={e => e.stopPropagation()}>
            <img src={`${photos[lightbox].src.split("?")[0]}?w=1200&h=800&fit=crop&auto=format`} alt={photos[lightbox].caption}
              style={{ width: "100%", borderRadius: "12px", maxHeight: "80vh", objectFit: "contain" }} />
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: "13px", marginTop: "14px" }}>{photos[lightbox].caption}</p>
            {/* using <button> instead of <Button>: icon-only nav, incompatible with Astra pill button */}
            <button className="hidden-mobile" style={{ position: "absolute", left: "-56px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "50%", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}
              onClick={() => setLightbox((lightbox - 1 + photos.length) % photos.length)} aria-label="Previous"><ChevronLeft size={20} /></button>
            <button className="hidden-mobile" style={{ position: "absolute", right: "-56px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "50%", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}
              onClick={() => setLightbox((lightbox + 1) % photos.length)} aria-label="Next"><ChevronRight size={20} /></button>
            <button style={{ position: "absolute", top: "-48px", right: 0, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}
              onClick={() => setLightbox(null)} aria-label="Close"><X size={17} /></button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 700px) {
          .gal-resp { grid-template-columns: repeat(2,1fr) !important; grid-auto-rows: 150px !important; }
          .gal-resp > div[style*="span 2"] { grid-column: span 2 !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── Specialized Services ────────────────────────────── */
function SpecializedServices() {
  const specialties = [
    { title: "Tankless Water Heaters",         desc: "High-efficiency on-demand hot water systems. We repair and replace all types of water heaters.", img: IMG.waterHeater,     icon: <Zap size={17} />  },
    { title: "Drain Camera Inspection",        desc: "Sewer camera and hydro-jetting to accurately diagnose drain issues without tearing into walls.",  img: IMG.grayscalePipes,  icon: <Wrench size={17} /> },
    { title: "Water Filters & Softeners",      desc: "Whole-home and point-of-use water filtration and softening for cleaner, safer water.",             img: IMG.bathtub2,        icon: <Shield size={17} /> },
    { title: "Gas Lines & Hookups",            desc: "Professional gas line installation for residential kitchens, outdoor kitchens, and commercial use.", img: IMG.pipes,           icon: <Flame size={17} /> },
    { title: "Medical Gas",                    desc: "Specialized medical gas piping systems for healthcare facilities — a unique KHP capability.",       img: IMG.industrialPipes, icon: <Wrench size={17} /> },
    { title: "Backflow Device Testing",        desc: "Certified backflow prevention testing, repair, and 2½\" Reduced Pressure Assembly installations.",  img: IMG.pipesInWall,     icon: <Shield size={17} /> },
  ];

  return (
    <section style={{ background: "#fff", padding: "var(--sec-pad)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ marginBottom: "56px" }} data-reveal>
          <p className="khp-eyebrow">Specialized Work</p>
          <h2 className="khp-h2">Specialized plumbing services.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
          {specialties.map((s, i) => (
            <div key={i} style={{ borderRadius: "16px", overflow: "hidden", background: "var(--khp-warm-white)", border: "1px solid var(--khp-border)", display: "flex", flexDirection: "column", transition: "box-shadow 0.2s, transform 0.2s", cursor: "pointer" }} data-reveal
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(11,31,51,0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
              <div style={{ aspectRatio: "16/9", overflow: "hidden", background: "#c8d4dc" }}>
                <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} loading="lazy"
                  onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = "scale(1.05)")}
                  onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = "scale(1)")} />
              </div>
              <div style={{ padding: "22px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "rgba(86,189,119,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--khp-copper)", marginBottom: "12px" }}>{s.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--khp-navy)", marginBottom: "7px", letterSpacing: "-0.01em" }}>{s.title}</h3>
                <p style={{ fontSize: "13.5px", color: "var(--khp-text-secondary)", lineHeight: 1.6, flex: 1 }}>{s.desc}</p>
                <a href="#contact" style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "14px", color: "var(--khp-copper)", fontSize: "13px", fontWeight: 600, textDecoration: "none", transition: "gap 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.gap = "10px")} onMouseLeave={e => (e.currentTarget.style.gap = "6px")}>
                  Request service <ArrowRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why KHP ─────────────────────────────────────────── */
function WhyKHP() {
  const pillars = [
    { num: "01", title: "Local",       desc: "Locally owned and family managed. Based in Ooltewah — we live in the communities we serve." },
    { num: "02", title: "Experienced", desc: "100+ years combined experience. One labor rate for everyone — residential, commercial, national chains." },
    { num: "03", title: "Versatile",   desc: "From a leaking kitchen faucet to a 2½\" Reduced Pressure Assembly for a commercial client — we handle it all." },
    { num: "04", title: "Licensed",    desc: "TN State Contractor License #65086, CMC-A, MU-A. Fully insured with liability and workers' comp coverage." },
  ];

  return (
    <section style={{ background: "var(--khp-navy)", padding: "var(--sec-pad)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "80px", alignItems: "flex-start" }} className="grid-1col">
          {/* Sticky left column */}
          <div style={{ position: "sticky", top: "100px" }} data-reveal-left>
            <p className="khp-eyebrow" style={{ color: "var(--khp-copper)" }}>Why KHP</p>
            <h2 className="khp-h2 khp-h2-white">Experience<br />you can put<br />to work.</h2>
            <a href="#contact" className="btn-khp-primary" style={{ marginTop: "8px" }}>Get a Quote <ArrowRight size={15} /></a>
          </div>

          {/* Pillars grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "20px", overflow: "hidden" }}>
            {pillars.map((p, i) => (
              <div key={i} style={{ background: "var(--khp-navy)", padding: "40px 32px", position: "relative", transition: "background 0.2s" }} data-reveal
                onMouseEnter={e => {
                  e.currentTarget.style.background = "var(--khp-blue)";
                  const num = e.currentTarget.querySelector(".pillar-num") as HTMLElement;
                  if (num) { num.style.color = "rgba(86,189,119,0.35)"; num.style.transform = "translateY(-4px)"; }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "var(--khp-navy)";
                  const num = e.currentTarget.querySelector(".pillar-num") as HTMLElement;
                  if (num) { num.style.color = "rgba(255,255,255,0.04)"; num.style.transform = "none"; }
                }}>
                <div className="pillar-num" style={{ fontFamily: "var(--font-display)", fontSize: "64px", color: "rgba(255,255,255,0.04)", lineHeight: 1, marginBottom: "12px", transition: "color 0.25s, transform 0.25s" }}>{p.num}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "#fff", marginBottom: "10px" }}>{p.title}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{p.desc}</p>
                <div style={{ position: "absolute", top: "28px", right: "24px", width: "6px", height: "6px", borderRadius: "50%", background: "var(--khp-copper)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Reviews ─────────────────────────────────────────── */
function ReviewsSection() {
  const reviews = [
    { name: "Dan C.",               rating: 5, date: "Verified Customer", text: "Fair prices.", service: "Residential Service" },
    { name: "June M.",              rating: 5, date: "Verified Customer", text: "So efficient. Pleasant and personable. Educational.", service: "Residential Repair" },
    { name: "Chuck C.",             rating: 5, date: "Verified Customer", text: "Very punctual and the work performed was excellent.", service: "Residential Plumbing" },
    { name: "Chattanooga Customer", rating: 5, date: "Google Review",     text: "Trust your family to the true professionals! Keith Hodge Plumbing showed up on time, explained everything, and got the job done right.", service: "Service Call" },
  ];

  return (
    <section style={{ background: "var(--khp-warm-white)", padding: "var(--sec-pad)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "52px", flexWrap: "wrap", gap: "24px" }}>
          <div data-reveal>
            <p className="khp-eyebrow">Customer Reviews</p>
            <h2 className="khp-h2">What Chattanooga says.</h2>
          </div>
          {/* Google badge */}
          <a href="https://maps.app.goo.gl/GPn8XJkMoWFb9tfh9" target="_blank" rel="noopener noreferrer" data-reveal
            style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "#fff", border: "1px solid var(--khp-border)", borderRadius: "32px", padding: "12px 20px", textDecoration: "none", transition: "box-shadow 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(11,31,51,0.1)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>
            <div style={{ display: "flex", gap: "2px" }}>{[...Array(5)].map((_, i) => <Star key={i} size={15} fill="#FBBC04" color="#FBBC04" />)}</div>
            <span style={{ fontSize: "15px", fontWeight: 800, color: "var(--khp-navy)" }}>5.0</span>
            <span style={{ fontSize: "13px", color: "var(--khp-text-secondary)" }}>on Google</span>
            <ExternalLink size={13} color="var(--khp-text-secondary)" />
          </a>
        </div>

        {/* Review cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid var(--khp-border)", borderRadius: "18px", padding: "28px", display: "flex", flexDirection: "column", position: "relative", transition: "transform 0.2s, box-shadow 0.2s" }} data-reveal
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(11,31,51,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              {/* Decorative quote mark */}
              <div style={{ fontFamily: "Georgia, serif", fontSize: "80px", color: "rgba(86,189,119,0.1)", lineHeight: 0.7, position: "absolute", top: "20px", right: "20px", userSelect: "none", pointerEvents: "none" }}>"</div>
              <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>{[...Array(r.rating)].map((_, j) => <Star key={j} size={14} fill="#FBBC04" color="#FBBC04" />)}</div>
              <p style={{ fontSize: "16px", color: "var(--khp-text)", lineHeight: 1.7, flex: 1, fontStyle: "italic" }}>"{r.text}"</p>
              <div style={{ borderTop: "1px solid var(--khp-border)", paddingTop: "16px", marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--khp-navy)" }}>{r.name}</div>
                  <div style={{ fontSize: "12px", color: "var(--khp-copper)", fontWeight: 600, marginTop: "2px" }}>{r.service}</div>
                </div>
                <span style={{ fontSize: "11px", color: "var(--khp-text-secondary)" }}>{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "44px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }} data-reveal>
          <a href="https://maps.app.goo.gl/GPn8XJkMoWFb9tfh9" target="_blank" rel="noopener noreferrer" className="btn-khp-outline-dark">
            See Reviews on Google <ExternalLink size={14} />
          </a>
          <a href="https://www.facebook.com/khppro/reviews" target="_blank" rel="noopener noreferrer" className="btn-khp-outline-dark" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            See Reviews on Facebook <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Emergency CTA (copper full-bleed) ───────────────── */
function EmergencyCTA() {
  return (
    <section style={{ background: "var(--khp-copper)", padding: "0 24px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "40px", alignItems: "center", padding: "56px 0" }} className="emerg-inner">
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "10px" }}>Plumbing Problem?</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 48px)", color: "#fff", lineHeight: 1.0, marginBottom: "12px" }}>
              Tell us what's going on.<br />We'll help you determine the next step.
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
              After-hours and weekend service available by prior appointment.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}>
            <a href="tel:4234543556" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", background: "#fff", color: "var(--khp-navy)", fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 700, borderRadius: "var(--radius-button)", textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <Phone size={16} /> Call (423) 454-3556
            </a>
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "13px 28px", background: "transparent", color: "#fff", fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 500, borderRadius: "var(--radius-button)", border: "1.5px solid rgba(255,255,255,0.55)", textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)"; }}>
              Request Service <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
      <style>{`@media (max-width:720px){ .emerg-inner { grid-template-columns:1fr !important; padding: 44px 0 !important; } }`}</style>
    </section>
  );
}

/* ─── Commercial ──────────────────────────────────────── */
function CommercialSection() {
  const types = [
    { icon: <Store size={15} />, label: "Restaurants"     },
    { icon: <Building2 size={15} />, label: "Hotels"      },
    { icon: <Store size={15} />, label: "National Chains" },
    { icon: <Church size={15} />, label: "Churches"       },
    { icon: <Factory size={15} />, label: "Storefronts"   },
  ];

  return (
    <section id="commercial" style={{ background: "var(--khp-dark)", padding: "var(--sec-pad)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
        <img src={IMG.industrialPipes} alt="" aria-hidden style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
      </div>
      <div style={{ maxWidth: "1320px", margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="grid-1col">
          <div data-reveal-left>
            <p className="khp-eyebrow" style={{ color: "var(--khp-copper)" }}>Commercial Plumbing</p>
            <h2 className="khp-h2 khp-h2-white">Plumbing built<br />for business.</h2>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "16px" }}>
              KHP provides professional plumbing services for restaurants, hotels, national chains, churches, storefronts, and commercial clients throughout the Chattanooga area.
            </p>
            {/* Differentiator badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(86,189,119,0.15)", border: "1px solid rgba(86,189,119,0.3)", borderRadius: "6px", padding: "9px 14px", marginBottom: "28px" }}>
              <CheckCircle2 size={14} color="var(--khp-copper)" />
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Same labor rate as residential — no commercial premium</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "36px" }}>
              {types.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", padding: "7px 13px", color: "rgba(255,255,255,0.78)", fontSize: "13px", fontWeight: 500, transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(86,189,119,0.15)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}>
                  <span style={{ color: "var(--khp-copper)" }}>{t.icon}</span>{t.label}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href="#contact" className="btn-khp-primary" style={{ alignSelf: "flex-start" }}>Request Commercial Service <ArrowRight size={15} /></a>
              <a href="mailto:estimating@khppro.com" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: "13px", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                <Mail size={13} /> estimating@khppro.com — Construction &amp; project estimating
              </a>
            </div>
          </div>

          <div data-reveal style={{ borderRadius: "var(--radius-card)", overflow: "hidden", background: "var(--khp-blue)" }}>
            <img src={IMG.commercialKitchen} alt="Commercial kitchen plumbing" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", opacity: 0.85, display: "block" }} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Construction ────────────────────────────────────── */
function ConstructionSection() {
  const steps = [
    { num: "01", title: "Estimate",   desc: "In-house estimating department with digital blueprint takeoff — cleaner and more accurate than the competition." },
    { num: "02", title: "Plan",       desc: "Scope letter prepared post-takeoff detailing inclusions and exclusions. No surprises, no additional change orders." },
    { num: "03", title: "Install",    desc: "Site work, underground, interior rough-in, trim-out. Materials: Copper, PEX, PVC, Cast Iron, and more." },
    { num: "04", title: "Close Out",  desc: "Full documentation: submittals, lien waivers, certificate of warranty, and as-builts delivered." },
  ];

  return (
    <section id="construction" style={{ background: "var(--khp-warm-white)", padding: "var(--sec-pad)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ marginBottom: "60px" }} data-reveal>
          <p className="khp-eyebrow">Construction Plumbing</p>
          <h2 className="khp-h2">From the ground up.</h2>
          <p style={{ fontSize: "17px", color: "var(--khp-text-secondary)", lineHeight: 1.75, maxWidth: "540px" }}>
            Our construction team has experience completing new construction plumbing projects throughout the Chattanooga area and beyond.
          </p>
        </div>

        {/* Hero banner */}
        <div style={{ position: "relative", borderRadius: "var(--radius-card)", overflow: "hidden", marginBottom: "48px", background: "#1a3040" }} data-reveal>
          <img src={IMG.constructionSite} alt="New construction project" style={{ width: "100%", height: "420px", objectFit: "cover", opacity: 0.65 }} loading="lazy" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(8,21,33,0.9) 0%, rgba(8,21,33,0.3) 60%, transparent 100%)", display: "flex", alignItems: "flex-end", padding: "48px" }}>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 2.5vw, 24px)", color: "#fff", maxWidth: "480px", lineHeight: 1.3, marginBottom: "24px" }}>
                "Professional install with no additional change orders — true craftsmanship becomes apparent."
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href="#contact" className="btn-khp-primary">Talk About Your Project <ArrowRight size={15} /></a>
                <a href="mailto:estimating@khppro.com" className="btn-khp-secondary">estimating@khppro.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Process steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px", background: "var(--khp-border)", borderRadius: "16px", overflow: "hidden" }} className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} style={{ background: "#fff", padding: "32px 24px", transition: "background 0.2s" }} data-reveal
              onMouseEnter={e => (e.currentTarget.style.background = "var(--khp-warm-white)")}
              onMouseLeave={e => (e.currentTarget.style.background = "#fff")}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "var(--khp-copper)", marginBottom: "10px" }}>{s.num}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--khp-navy)", marginBottom: "8px" }}>{s.title}</h3>
              <p style={{ fontSize: "13.5px", color: "var(--khp-text-secondary)", lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 720px){ .steps-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}

/* ─── Who We Serve ────────────────────────────────────── */
function ProjectTypes() {
  const types = [
    { icon: <Home size={20} />, label: "Home",             desc: "Residential service and renovation." },
    { icon: <Store size={20} />, label: "Restaurant",       desc: "Full-service commercial kitchen plumbing." },
    { icon: <Building2 size={20} />, label: "Hotels",       desc: "Plumbing systems for hospitality properties." },
    { icon: <Church size={20} />, label: "Churches",        desc: "Service and construction support." },
    { icon: <HardHat size={20} />, label: "New Construction", desc: "Ground-up plumbing projects." },
    { icon: <Factory size={20} />, label: "Industrial",     desc: "Complex commercial systems." },
  ];

  return (
    <section style={{ background: "#fff", padding: "var(--sec-pad)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ marginBottom: "52px", maxWidth: "560px" }} data-reveal>
          <p className="khp-eyebrow">Who We Serve</p>
          <h2 className="khp-h2">Where our experience fits.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
          {types.map((t, i) => (
            <div key={i} style={{ borderRadius: "16px", padding: "28px", background: "var(--khp-warm-white)", border: "1px solid var(--khp-border)", display: "flex", gap: "18px", alignItems: "flex-start", transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s" }} data-reveal
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--khp-copper)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(86,189,119,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--khp-border)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "var(--khp-navy)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--khp-copper)", flexShrink: 0 }}>{t.icon}</div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--khp-navy)", marginBottom: "5px" }}>{t.label}</h3>
                <p style={{ fontSize: "13px", color: "var(--khp-text-secondary)", lineHeight: 1.55 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "What areas does Keith Hodge Plumbing serve?",        a: "KHP serves Chattanooga, Tennessee and surrounding communities, including Ooltewah, and portions of North Georgia. Contact our team to confirm service availability in your area." },
    { q: "What types of plumbing services do you provide?",    a: "Residential, commercial, and construction plumbing. This includes repairs, fixture installation, water heaters (tankless), drain services, water filtration, gas piping, backflow device testing and repair, and medical gas services." },
    { q: "Do you work on commercial plumbing?",                a: "Yes. KHP provides commercial plumbing services for restaurants, hotels, national chains, office buildings, retail locations, and churches throughout the Chattanooga metro area — at the same labor rate as residential." },
    { q: "Do you handle new construction plumbing?",           a: "Yes. Our in-house estimating team uses digital takeoff technology. We coordinate with general contractors from rough-in through final inspection and close-out documentation." },
    { q: "How do I request a quote?",                          a: "Use the quote form on this page, or call us directly at (423) 454-3556. For construction and commercial projects, you can also email estimating@khppro.com." },
    { q: "Are you licensed and insured?",                      a: "Yes. TN State Contractor License #65086, CMC-A, MU-A. We carry full liability and workers' comp coverage." },
  ];

  return (
    <section style={{ background: "var(--khp-warm-white)", padding: "var(--sec-pad)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "80px", alignItems: "flex-start" }} className="grid-1col">
          <div style={{ position: "sticky", top: "100px" }} data-reveal-left>
            <p className="khp-eyebrow">FAQ</p>
            <h2 className="khp-h2-sm" style={{ marginBottom: "18px" }}>Common questions.</h2>
            <p style={{ fontSize: "15px", color: "var(--khp-text-secondary)", lineHeight: 1.65, marginBottom: "28px" }}>Don't see your question? Give us a call — we're happy to help.</p>
            <a href="tel:4234543556" className="btn-khp-navy" style={{ fontSize: "14px" }}><Phone size={14} /> (423) 454-3556</a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderRadius: "12px", overflow: "hidden", border: `1px solid ${open === i ? "var(--khp-copper)" : "var(--khp-border)"}`, transition: "border-color 0.2s" }} data-reveal>
                {/* using <button> instead of <Button>: full-width accordion trigger, incompatible with Astra pill Button */}
                <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", padding: "20px 24px", background: open === i ? "var(--khp-warm-white)" : "#fff", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.2s" }}>
                  <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", color: "var(--khp-copper)", minWidth: "24px" }}>0{i + 1}</span>
                    <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--khp-navy)" }}>{faq.q}</span>
                  </div>
                  <ChevronDown size={17} color="var(--khp-text-secondary)" style={{ flexShrink: 0, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </button>
                {open === i && (
                  <div style={{ padding: "0 24px 20px 62px", background: "var(--khp-warm-white)" }}>
                    <p style={{ fontSize: "14.5px", color: "var(--khp-text-secondary)", lineHeight: 1.75 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Service Area + Map ──────────────────────────────── */
function ServiceArea() {
  return (
    <section style={{ background: "#fff", padding: "var(--sec-pad)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ marginBottom: "52px" }} data-reveal>
          <p className="khp-eyebrow">Service Area</p>
          <h2 className="khp-h2">Serving Chattanooga<br />and the surrounding area.</h2>
          <p style={{ fontSize: "17px", color: "var(--khp-text-secondary)", maxWidth: "520px", lineHeight: 1.65 }}>
            Based in Ooltewah, TN — we serve the greater Chattanooga metro area and surrounding communities, including portions of North Georgia.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px", alignItems: "stretch" }} className="map-grid" data-reveal>
          {/* Map */}
          <div style={{ borderRadius: "var(--radius-card)", overflow: "hidden", minHeight: "460px", background: "#c8d4dc" }}>
            <iframe src="https://maps.google.com/maps?q=Keith+Hodge+Plumbing+LLC+9402+Factory+Street+Ooltewah+TN+37363&output=embed&z=13"
              width="100%" height="100%" style={{ border: 0, minHeight: "460px", display: "block" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Keith Hodge Plumbing map" />
          </div>

          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: "var(--khp-navy)", borderRadius: "16px", padding: "24px", flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { icon: <MapPin size={15} />, label: "Address",     value: "9402 Factory Street\nOoltewah, TN 37363" },
                { icon: <Phone size={15} />,  label: "Phone",       value: "(423) 454-3556" },
                { icon: <Clock size={15} />,  label: "Office Hours", value: "Mon–Fri: 7:30 AM–3:30 PM\nAfter-hours by appointment" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--khp-copper)", marginTop: "2px", flexShrink: 0 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "4px" }}>{r.label}</div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", fontWeight: 500, whiteSpace: "pre-line", lineHeight: 1.5 }}>{r.value}</div>
                  </div>
                </div>
              ))}
              <a href="https://maps.app.goo.gl/GPn8XJkMoWFb9tfh9" target="_blank" rel="noopener noreferrer" className="btn-khp-primary" style={{ justifyContent: "center", fontSize: "13px", padding: "11px 16px" }}>
                Get Directions <ExternalLink size={13} />
              </a>
            </div>

            <div style={{ background: "var(--khp-warm-white)", borderRadius: "16px", padding: "20px", border: "1px solid var(--khp-border)" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--khp-text-secondary)", marginBottom: "12px" }}>Areas We Serve</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {["Chattanooga", "Ooltewah", "Cleveland", "Hixson", "Signal Mountain", "East Ridge", "Collegedale", "North Georgia"].map(loc => (
                  <span key={loc} style={{ background: "#fff", border: "1px solid var(--khp-border)", borderRadius: "4px", padding: "4px 9px", fontSize: "11.5px", color: "var(--khp-navy)", fontWeight: 500 }}>{loc}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:860px){ .map-grid{grid-template-columns:1fr !important;} }`}</style>
    </section>
  );
}

/* ─── Contact Form ────────────────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", projectType: "", propertyType: "", details: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) return;
    setStatus("loading");
    const to = form.projectType === "construction" ? "estimating@khppro.com" : "service@khppro.com";
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nProject Type: ${form.projectType || "Not specified"}\nProperty Type: ${form.propertyType || "Not specified"}\n\nDetails:\n${form.details || "(none)"}`;
    setTimeout(() => {
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(`Quote Request — ${form.projectType || "General"} — ${form.name}`)}&body=${encodeURIComponent(body)}`;
      setStatus("success");
    }, 700);
  };

  return (
    <section id="contact" style={{ background: "var(--khp-warm-white)", padding: "var(--sec-pad)" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: "56px", maxWidth: "700px" }} data-reveal>
          <p className="khp-eyebrow">A Real Person Will Answer</p>
          <h2 className="khp-h2">Let's talk about<br />your plumbing project.</h2>
          <p style={{ fontSize: "17px", color: "var(--khp-text-secondary)", lineHeight: 1.75 }}>
            We're a family-managed team. Tell us what's going on — no pressure, no jargon — and a member of our team will personally follow up.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.55fr", gap: "56px", alignItems: "flex-start" }} className="grid-1col">
          {/* Info column */}
          <div data-reveal-left>
            {/* Empathy card */}
            <div style={{ background: "var(--khp-navy)", borderRadius: "18px", padding: "26px 28px", marginBottom: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
                <div className="khp-pulse" style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(86,189,119,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--khp-copper)", flexShrink: 0 }}><Users size={20} /></div>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>People, not a call center</div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>Locally owned &amp; family managed</div>
                </div>
              </div>
              {[
                { icon: <HeartHandshake size={14} />, text: "We listen first and explain in plain language." },
                { icon: <ShieldCheck size={14} />,   text: "Respectful of your home, your time, and your budget." },
                { icon: <Clock size={14} />,          text: "A team member personally follows up on every request." },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: i < 2 ? "10px" : 0 }}>
                  <span style={{ color: "var(--khp-copper)", marginTop: "2px", flexShrink: 0 }}>{r.icon}</span>
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.78)", lineHeight: 1.55 }}>{r.text}</span>
                </div>
              ))}
            </div>

            {/* Contact details */}
            {[
              { label: "Call",                     content: <a href="tel:4234543556" style={{ fontSize: "26px", fontWeight: 800, color: "var(--khp-navy)", textDecoration: "none", letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: "10px" }}><Phone size={18} color="var(--khp-copper)" /> (423) 454-3556</a> },
              { label: "Service Email",             content: <a href="mailto:service@khppro.com" style={{ fontSize: "15px", fontWeight: 600, color: "var(--khp-navy)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}><Mail size={14} color="var(--khp-copper)" /> service@khppro.com</a> },
              { label: "Construction & Estimating", content: <a href="mailto:estimating@khppro.com" style={{ fontSize: "15px", fontWeight: 600, color: "var(--khp-navy)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}><Mail size={14} color="var(--khp-copper)" /> estimating@khppro.com</a> },
              { label: "Address",                   content: <a href="https://maps.app.goo.gl/GPn8XJkMoWFb9tfh9" target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", color: "var(--khp-navy)", textDecoration: "none", display: "flex", gap: "10px" }}><MapPin size={14} color="var(--khp-copper)" style={{ marginTop: "2px", flexShrink: 0 }} /><span>9402 Factory Street<br />Ooltewah, TN 37363</span></a> },
              { label: "Office Hours",              content: <div style={{ display: "flex", gap: "10px" }}><Clock size={14} color="var(--khp-copper)" style={{ marginTop: "2px", flexShrink: 0 }} /><div style={{ fontSize: "14px", color: "var(--khp-text)", lineHeight: 1.65 }}>Mon–Fri: 7:30 AM–3:30 PM<br /><span style={{ color: "var(--khp-text-secondary)", fontSize: "12.5px" }}>After-hours &amp; weekend by prior appointment</span></div></div> },
            ].map((row, i) => (
              <div key={i} style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--khp-text-secondary)", marginBottom: "8px" }}>{row.label}</div>
                {row.content}
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ background: "#fff", borderRadius: "20px", padding: "clamp(24px,4vw,40px)", border: "1px solid var(--khp-border)", boxShadow: "0 4px 32px rgba(11,31,51,0.06)" }} data-reveal>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--khp-navy)", marginBottom: "6px" }}>Request a Quote</h3>
            <p style={{ fontSize: "14px", color: "var(--khp-text-secondary)", marginBottom: "28px" }}>
              Fill out the form and we'll follow up personally within one business day.
            </p>

            {status === "success" ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "48px 20px", gap: "16px" }}>
                <CheckCircle2 size={52} color="var(--khp-copper)" />
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "var(--khp-navy)" }}>Your email app is opening.</h4>
                <p style={{ fontSize: "14.5px", color: "var(--khp-text-secondary)", maxWidth: "340px", lineHeight: 1.65 }}>
                  Your request is pre-filled — just send the email. Or call us directly at <a href="tel:4234543556" style={{ color: "var(--khp-navy)", fontWeight: 700 }}>(423) 454-3556</a>.
                </p>
                {/* using <button> instead of <Button>: plain reset link, no Astra equivalent for a link-style inline reset */}
                <button onClick={() => { setStatus("idle"); setForm({ name: "", phone: "", email: "", projectType: "", propertyType: "", details: "" }); }}
                  style={{ background: "none", border: "none", color: "var(--khp-copper)", fontSize: "14px", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="khp-form-fields" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <InputField label="Full Name *" placeholder="Your full name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
                  <div className="khp-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <InputField label="Phone *" placeholder="(423) 000-0000" value={form.phone} onChange={v => setForm({ ...form, phone: v })} />
                    <InputField label="Email *" placeholder="you@example.com" value={form.email} onChange={v => setForm({ ...form, email: v })} />
                  </div>
                  <div className="khp-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <SelectField label="Project Type" placeholder="Select type"
                      options={[{ value: "residential", label: "Residential" }, { value: "commercial", label: "Commercial" }, { value: "construction", label: "Construction" }, { value: "other", label: "Other" }]}
                      value={form.projectType} onChange={v => setForm({ ...form, projectType: v })} />
                    <SelectField label="Property Type" placeholder="Select property"
                      options={[{ value: "home", label: "Home / Residence" }, { value: "restaurant", label: "Restaurant" }, { value: "hotel", label: "Hotel" }, { value: "office", label: "Office Building" }, { value: "retail", label: "Retail" }, { value: "church", label: "Church" }, { value: "new-construction", label: "New Construction" }, { value: "other", label: "Other" }]}
                      value={form.propertyType} onChange={v => setForm({ ...form, propertyType: v })} />
                  </div>
                  <TextareaField label="Project Details" placeholder="Describe the project or issue..." value={form.details} rows={4} onChange={v => setForm({ ...form, details: v })} />
                  <ButtonGroup align="justify">
                    <Button variant="neutral" type="button" onClick={() => setForm({ name: "", phone: "", email: "", projectType: "", propertyType: "", details: "" })}>Clear</Button>
                    <Button variant="primary" type="submit" disabled={status === "loading"}>{status === "loading" ? "Opening email…" : "Send Quote Request →"}</Button>
                  </ButtonGroup>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <ShieldCheck size={13} color="var(--khp-copper)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "12px", color: "var(--khp-text-secondary)", lineHeight: 1.55 }}>
                      Your details are only used to help with your request — never shared. Prefer to talk? Call <a href="tel:4234543556" style={{ color: "var(--khp-navy)", fontWeight: 600, textDecoration: "none" }}>(423) 454-3556</a>.
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────── */
function Footer() {
  const nav = ["Residential", "Commercial", "Construction", "Services", "About", "Contact"];
  const anchors: Record<string, string> = { Residential: "#residential", Commercial: "#commercial", Construction: "#construction", Services: "#services", About: "#about", Contact: "#contact" };

  return (
    <footer style={{ background: "var(--khp-green)", padding: "72px 24px 0" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>

        {/* Top band: brand + 3 info columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr", gap: "48px", paddingBottom: "52px", borderBottom: "1px solid rgba(255,255,255,0.08)" }} className="footer-grid">

          {/* Brand column */}
          <div>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px", textDecoration: "none" }}>
              <div className="khp-mark" style={{ width: "40px", height: "40px", background: "#fff", boxShadow: "0 4px 14px rgba(86,189,119,0.2)" }}>
                <img src="https://khppro.com/favicon.ico" alt="KHP" style={{ width: "26px", height: "26px", objectFit: "contain" }} />
              </div>
              <div>
                <div className="khp-wordmark" style={{ fontSize: "16px", color: "#fff", lineHeight: 1 }}>Keith Hodge Plumbing</div>
                <div className="khp-tagline" style={{ fontSize: "9px", color: "var(--khp-copper)", marginTop: "3px" }}>The Plumbing Professionals</div>
              </div>
            </a>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, maxWidth: "280px", marginBottom: "20px" }}>
              Locally owned, family-managed plumbing serving Chattanooga, Tennessee and surrounding communities since 2008.
            </p>
            <a href="https://www.facebook.com/khppro/" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.45)", fontSize: "13px", fontWeight: 500, textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              facebook.com/khppro
            </a>
            <div style={{ marginTop: "16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <a href="https://maps.app.goo.gl/GPn8XJkMoWFb9tfh9" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", color: "rgba(255,255,255,0.6)", fontSize: "12px", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
                <Star size={11} fill="#FBBC04" color="#FBBC04" /> Google Reviews
              </a>
              <a href="https://www.facebook.com/khppro/reviews" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "6px", color: "rgba(255,255,255,0.6)", fontSize: "12px", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook Reviews
              </a>
            </div>
          </div>

          {/* Office Hours */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--khp-copper)", marginBottom: "18px" }}>Office Hours</div>
            <div style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
              <div style={{ fontWeight: 600, marginBottom: "4px" }}>Mon – Fri: 7:30 AM – 3:30 PM</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "12.5px", lineHeight: 1.7 }}>
                After-hours and weekend service available by prior appointment.
              </div>
            </div>
            <div style={{ marginTop: "24px" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--khp-copper)", marginBottom: "14px" }}>Navigation</div>
              <nav style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {nav.map(l => (
                  <a key={l} href={anchors[l]} style={{ color: "rgba(255,255,255,0.48)", textDecoration: "none", fontSize: "13.5px", transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.48)")}>{l}</a>
                ))}
              </nav>
            </div>
          </div>

          {/* Address */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--khp-copper)", marginBottom: "18px" }}>Address</div>
            <a href="https://maps.app.goo.gl/GPn8XJkMoWFb9tfh9" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", gap: "10px", textDecoration: "none", marginBottom: "20px" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}>
              <MapPin size={14} color="var(--khp-copper)" style={{ marginTop: "2px", flexShrink: 0 }} />
              <span style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>
                Keith Hodge Plumbing LLC<br />
                9402 Factory Street<br />
                Ooltewah, TN 37363
              </span>
            </a>

            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--khp-copper)", marginBottom: "14px" }}>Contact</div>
            {[
              { href: "tel:4234543556",               icon: <Phone size={12} />, text: "(423) 454-3556" },
              { href: "mailto:service@khppro.com",    icon: <Mail size={12} />,  text: "service@khppro.com" },
              { href: "mailto:estimating@khppro.com", icon: <Mail size={12} />,  text: "estimating@khppro.com" },
            ].map((l, i) => (
              <a key={i} href={l.href}
                style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                <span style={{ color: "var(--khp-copper)", flexShrink: 0 }}>{l.icon}</span>{l.text}
              </a>
            ))}
          </div>

          {/* CTA column */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--khp-copper)", marginBottom: "18px" }}>Get Started</div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, marginBottom: "18px" }}>Ready to discuss your project?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href="tel:4234543556" className="btn-khp-primary" style={{ justifyContent: "center", fontSize: "14px", padding: "12px 20px" }}><Phone size={14} /> Call Now</a>
              <a href="#contact" className="btn-khp-secondary" style={{ justifyContent: "center", fontSize: "14px", padding: "11px 20px" }}>Request a Quote</a>
            </div>
            <a href="mailto:employees@khppro.com?subject=Employment Application"
              style={{ display: "block", marginTop: "16px", padding: "10px 16px", background: "rgba(217,43,54,0.15)", border: "1px solid rgba(217,43,54,0.3)", borderRadius: "8px", textAlign: "center", color: "#ff8590", fontSize: "13px", fontWeight: 600, textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(217,43,54,0.28)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(217,43,54,0.15)")}>
              We're Hiring — Apply Now
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", flexWrap: "wrap", gap: "10px" }}>
          <span style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.22)" }}>
            Copyright © 2011–2026 Keith Hodge Plumbing LLC · TN Lic. #65086, CMC-A, MU-A · Drug Free Workplace
          </span>
          <span style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.22)" }}>
            Website by:{" "}
            <span style={{ color: "rgba(255,255,255,0.38)" }}>Skyrocket Web Design</span>
          </span>
        </div>
      </div>
      <style>{`@media(max-width:860px){ .footer-grid{grid-template-columns:1fr !important; gap:36px !important;} }`}</style>
    </footer>
  );
}

/* ─── Mobile Bottom Bar ───────────────────────────────── */
function MobileBottomBar() {
  return (
    <div className="show-mobile mobile-bottom-bar" role="navigation" aria-label="Mobile quick actions"
      style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, background: "var(--khp-green)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "12px 16px", gap: "10px", paddingBottom: "env(safe-area-inset-bottom, 12px)" }}>
      <a href="tel:4234543556" aria-label="Call Keith Hodge Plumbing"
        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "rgba(255,255,255,0.1)", color: "#fff", textDecoration: "none", fontSize: "15px", fontWeight: 600, padding: "13px 8px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.14)", minHeight: "48px" }}>
        <Phone size={16} /> Call Now
      </a>
      <a href="#contact" aria-label="Request a quote"
        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "var(--khp-copper)", color: "#fff", textDecoration: "none", fontSize: "15px", fontWeight: 600, padding: "13px 8px", borderRadius: "8px", minHeight: "48px" }}>
        Request a Quote
      </a>
    </div>
  );
}

/* ─── Cursor ──────────────────────────────────────────── */
function CursorFollower() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(true);
    document.documentElement.classList.add("khp-cursor-on");
    let tx = -100, ty = -100, rx = -100, ry = -100, frame = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${tx}px,${ty}px)`;
      if (reduce && ringRef.current) ringRef.current.style.transform = `translate(${tx}px,${ty}px)`;
      ringRef.current?.classList.toggle("is-hover", !!(e.target as HTMLElement)?.closest("a,button,input,textarea,select,label,[role='button'],.service-card"));
    };
    const onDown = () => ringRef.current?.classList.add("is-down");
    const onUp   = () => ringRef.current?.classList.remove("is-down");
    const hide   = () => { if (dotRef.current) dotRef.current.style.opacity = "0"; if (ringRef.current) ringRef.current.style.opacity = "0"; };
    const show   = () => { if (dotRef.current) dotRef.current.style.opacity = "1"; if (ringRef.current) ringRef.current.style.opacity = "1"; };

    const loop = () => {
      rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px,${ry}px)`;
      frame = requestAnimationFrame(loop);
    };
    if (!reduce) frame = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove); window.addEventListener("mousedown", onDown); window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", hide); document.addEventListener("mouseenter", show);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove); window.removeEventListener("mousedown", onDown); window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", hide); document.removeEventListener("mouseenter", show);
      document.documentElement.classList.remove("khp-cursor-on");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={ringRef} className="khp-cursor-ring" aria-hidden />
      <div ref={dotRef}  className="khp-cursor-dot"  aria-hidden />
    </>
  );
}

/* ─── App ─────────────────────────────────────────────── */
export default function App() {
  useScrollReveal();

  return (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--khp-text)", background: "var(--khp-warm-white)" }}>
      <a href="#main-content" style={{ position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }}
        onFocus={e => { e.currentTarget.style.cssText = "left:16px;top:16px;width:auto;height:auto;z-index:9999;"; }}
        onBlur={e => { e.currentTarget.style.left = "-9999px"; }}>
        Skip to main content
      </a>

      <CursorFollower />
      <HiringBanner />
      <Header />

      <main id="main-content">
        <Hero />
        <StatsStrip />
        <LocalTrust />
        <ServicesSection />
        <WorkGallery />
        <SpecializedServices />
        <WhyKHP />
        <ReviewsSection />
        <EmergencyCTA />
        <ProjectTypes />
        <CommercialSection />
        <ConstructionSection />
        <FAQ />
        <ServiceArea />
        <ContactSection />
      </main>

      <Footer />
      <MobileBottomBar />
      <div className="show-mobile" style={{ height: "76px" }} aria-hidden />

      <style>{`
        @media (max-width: 860px) {
          .grid-1col { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}
