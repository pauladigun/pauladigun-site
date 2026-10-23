// Inline SVG icon set, 24px grid, 1.6 stroke. No emoji anywhere on this site.
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: "false" };
const I = (paths) => function Icon(props) { return <svg {...base} {...props}>{paths}</svg>; };

export const Mail = I(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></>);
export const Scholar = I(<><path d="M12 4 2.5 9.5 12 15l9.5-5.5L12 4Z" /><path d="M6.5 12v4.2c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8V12" /><path d="M21.5 9.5V15" /></>);
export const ResearchGate = I(<><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 16.5v-9h2.6a2.6 2.6 0 0 1 0 5.2H9" /><path d="m11.9 12.7 3 3.8" /></>);
export const GitHub = I(<path fill="currentColor" stroke="none" d="M12 .8C5.8.8.8 5.8.8 12c0 4.9 3.2 9.1 7.7 10.6.6.1.8-.2.8-.5v-2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.4.1-3 0 0 .9-.3 3.1 1.2a10.7 10.7 0 0 1 5.6 0c2.1-1.5 3.1-1.2 3.1-1.2.6 1.6.2 2.7.1 3 .7.8 1.2 1.8 1.2 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.5A11.2 11.2 0 0 0 23.2 12C23.2 5.8 18.2.8 12 .8Z" />);
export const Download = I(<><path d="M12 4v11" /><path d="m7 10.5 5 5 5-5" /><path d="M4.5 19.5h15" /></>);
export const External = I(<><path d="M14 4h6v6" /><path d="M20 4 11 13" /><path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" /></>);
export const Pin = I(<><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></>);
export const Building = I(<><path d="M3.5 20.5h17" /><path d="M5 20.5V9.5L12 5l7 4.5v11" /><path d="M9 20.5v-6h6v6" /><path d="M5 9.5h14" /></>);
export const Copy = I(<><rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2" /><path d="M15.5 8.5V6A2 2 0 0 0 13.5 4H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5" /></>);
export const Check = I(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const Search = I(<><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.4-4.4" /></>);
export const Menu = I(<><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>);
export const ArrowLeft = I(<><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></>);
export const ArrowRight = I(<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>);
export const Close = I(<><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>);

// Research theme marks, drawn to match each subject.
export const Network = I(<><circle cx="5" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="7" r="2" /><circle cx="19" cy="17" r="2" /><path d="M6.8 7 10.3 11M6.8 17l3.5-4M13.8 11.2 17.2 8M13.8 12.8l3.4 3.2" /></>);
export const Solar = I(<><path d="M4.5 13h15l-2 7h-11l-2-7Z" /><path d="M9.5 13 9 20M14.5 13l.5 7M5.5 16.5h13" /><circle cx="12" cy="6" r="2.2" /><path d="M12 1.8v.9M16.2 6h.9M7 6h.9M15 3l-.6.6M9.6 3.6 9 3" /></>);
export const Drought = I(<><circle cx="12" cy="7" r="2.8" /><path d="M12 1.6v1.1M17.4 7h-1.1M7.7 7H6.6M15.8 3.2l-.8.8M9 4l-.8-.8" /><path d="M3 14.5h18" /><path d="M7 14.5c-.6 1.6-.3 2.6 1 3.1M12 14.5c-.8 1.9-.4 3.1 1.2 3.7M17 14.5c-.6 1.6-.3 2.6 1 3.1" /></>);
export const Thermo = I(<><path d="M10 13.8V5a2 2 0 0 1 4 0v8.8a4 4 0 1 1-4 0Z" /><path d="M12 9.5v6" /><path d="M17 6h3M17 9.5h2" /></>);
export const Cyclone = I(<><path d="M20 7.5C17 4 9.5 3.5 6.5 7.5" /><path d="M4 16.5c3 3.5 10.5 4 13.5 0" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" /></>);
export const Dust = I(<><path d="M3 8h9a2.5 2.5 0 1 0-2.5-2.5" /><path d="M3 12.5h14a3 3 0 1 1 3 3" /><path d="M5 17h8a2 2 0 1 1 2 2" /></>);
