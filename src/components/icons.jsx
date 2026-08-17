export function IconBolt({ size = 26, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLayers({ size = 26, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 2 2 7l10 5 10-5-10-5Z" strokeLinejoin="round" />
      <path d="M2 12l10 5 10-5" strokeLinejoin="round" />
      <path d="M2 17l10 5 10-5" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCoins({ size = 26, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <ellipse cx="9" cy="7" rx="6" ry="3.2" />
      <path d="M3 7v6c0 1.77 2.69 3.2 6 3.2s6-1.43 6-3.2V7" />
      <ellipse cx="16" cy="14" rx="5.2" ry="2.8" />
      <path d="M10.8 14v3.4c0 1.55 2.33 2.8 5.2 2.8s5.2-1.25 5.2-2.8V14" />
    </svg>
  );
}

export function IconClock({ size = 26, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="12" r="9.2" />
      <path d="M12 7v5.4l3.6 2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTarget({ size = 26, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill={color} stroke="none" />
    </svg>
  );
}

export function IconSensor({ size = 26, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="12" r="2.4" fill={color} stroke="none" />
      <path d="M8.3 8.3a5.2 5.2 0 0 0 0 7.4M15.7 8.3a5.2 5.2 0 0 1 0 7.4" strokeLinecap="round" />
      <path d="M5.2 5.2a9.7 9.7 0 0 0 0 13.6M18.8 5.2a9.7 9.7 0 0 1 0 13.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconLink({ size = 26, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M9.5 14.5 14.5 9.5" strokeLinecap="round" />
      <path d="M7 17a4 4 0 0 1 0-5.7l2-2a4 4 0 0 1 5.7 5.7" strokeLinecap="round" />
      <path d="M17 7a4 4 0 0 1 0 5.7l-2 2a4 4 0 0 1-5.7-5.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconShield({ size = 26, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 3 4.5 6v6c0 4.7 3.2 8.1 7.5 9 4.3-.9 7.5-4.3 7.5-9V6L12 3Z" strokeLinejoin="round" />
      <path d="m9 12 2.2 2.2L15.5 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
