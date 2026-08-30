const fs = require('fs');

let css = fs.readFileSync('public/css/styles.css', 'utf8');

css += `
/* ===================== FLOATING HEADER ENHANCEMENTS ===================== */
.header {
    position: fixed !important;
    top: 16px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    width: 96% !important;
    max-width: 1400px !important;
    border-radius: 12px !important;
    z-index: 1000 !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
    border: 1px solid var(--border-strong) !important;
    background: color-mix(in srgb, var(--bg-panel) 85%, transparent) !important;
    backdrop-filter: blur(14px) saturate(150%) !important;
    -webkit-backdrop-filter: blur(14px) saturate(150%) !important;
}

.main-layout {
    padding-top: 80px !important; /* Space for the floating header */
}

/* Tool names hidden by default, visible on hover/active */
.nav-item .nav-item-text {
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    white-space: nowrap;
    margin-left: 0;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 1px;
}

.nav-item:hover .nav-item-text,
.nav-item.active .nav-item-text {
    max-width: 200px;
    opacity: 1;
    margin-left: 8px; /* Expand spacing */
}
`;

fs.writeFileSync('public/css/styles.css', css);
