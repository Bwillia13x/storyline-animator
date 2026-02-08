// ============================================================
// DESIGN TOKENS — Consulting deck aesthetic
// ============================================================

export const colors = {
  // Backgrounds
  background: '#F7F4EF',      // Warm off-white (paper-like)
  card: '#FFFFFF',
  cardHover: '#FAFAFA',
  
  // Text
  primary: '#0B1E3B',         // Deep navy
  secondary: '#3A4653',       // Slate
  muted: '#6B7785',           // Lighter slate
  
  // Borders
  border: '#D5D8DE',          // Cool gray
  borderLight: '#E8EAED',
  
  // Accents
  teal: {
    main: '#1E8E8A',
    light: '#E6F4F3',
    glow: 'rgba(30, 142, 138, 0.15)',
  },
  amber: {
    main: '#C47C2A',
    light: '#FDF4E8',
    glow: 'rgba(196, 124, 42, 0.15)',
  },
  
  // Status
  success: '#2E7D4A',
  warning: '#C47C2A',
  error: '#C43D3D',
  
  // Risk levels
  riskHigh: '#DC4A4A',
  riskMed: '#E5A33D',
  riskLow: '#4AA36B',
};

export const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  
  sizes: {
    slideTitle: '2.5rem',       // 40px
    slideSubtitle: '1.125rem',  // 18px
    sectionHeader: '1.5rem',    // 24px
    cardTitle: '1rem',          // 16px
    body: '0.9375rem',          // 15px
    small: '0.8125rem',         // 13px
    micro: '0.75rem',           // 12px
  },
  
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.15,
    normal: 1.5,
    relaxed: 1.65,
  },
};

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
};

export const shadows = {
  card: '0 1px 3px rgba(11, 30, 59, 0.04), 0 4px 12px rgba(11, 30, 59, 0.03)',
  cardHover: '0 4px 12px rgba(11, 30, 59, 0.06), 0 8px 24px rgba(11, 30, 59, 0.04)',
  spotlight: '0 4px 20px rgba(30, 142, 138, 0.12), 0 8px 32px rgba(11, 30, 59, 0.05)',
};

export const radii = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
};

// Animation timing
export const animation = {
  // Per-slide duration (in seconds)
  slideDuration: 9,
  
  // Transition between slides
  transitionDuration: 0.6,
  
  // Stagger delays
  staggerDelay: 0.12,
  
  // Easing
  easeOut: [0.25, 0.1, 0.25, 1.0],
  spring: { type: 'spring', stiffness: 300, damping: 25 },
};
