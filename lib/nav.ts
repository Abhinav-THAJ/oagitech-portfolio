export type NavItem = { code: string; t: string; href: string };
export type Menu = {
  key: string;
  label: string;
  href: string;
  eyebrow: string;
  cols: 1 | 2;
  width: number;
  alignRight?: boolean;
  items: NavItem[];
};

const i = (code: string, t: string, href: string): NavItem => ({ code, t, href });

export const MENUS: Menu[] = [
  { key: 'insp', label: 'Inspection', href: '/inspection', eyebrow: 'INSPECTION & INTEGRITY', cols: 1, width: 340, items: [
    i('01', 'Asset Integrity', '/inspection/asset-integrity'), i('02', 'QA/QC Project Management', '/inspection/qa-qc-project-management'), i('03', 'Third Party Inspection', '/inspection/third-party-inspection') ] },
  { key: 'weld', label: 'Welding', href: '/welding', eyebrow: 'WELDING SERVICES', cols: 1, width: 340, items: [
    i('01', 'WPS / PQR Development', '/welding'), i('02', 'Welder Qualification', '/welding'), i('03', 'Welding Inspection', '/welding'), i('04', 'Third-Party Audits', '/welding'), i('05', 'Welding Inspection Courses', '/training/welding-inspection-courses') ] },
  { key: 'ndt', label: 'NDT', href: '/ndt', eyebrow: 'NON-DESTRUCTIVE TESTING', cols: 2, width: 600, items: [
    i('UT', 'Ultrasonic Testing', '/ndt/ultrasonic-testing'), i('RT', 'Radiographic Testing', '/ndt/radiographic-testing'), i('MT', 'Magnetic Particle Testing', '/ndt/magnetic-particle-testing'), i('PT', 'Penetrant Testing', '/ndt/penetrant-testing'),
    i('PMI', 'Positive Material ID', '/ndt/positive-material-identification'), i('HT', 'Hardness Test', '/ndt/hardness-test'), i('RA', 'Rope Access', '/ndt/rope-access'), i('ADV', 'Advanced NDT Services', '/ndt/advanced-ndt-services') ] },
  { key: 'civil', label: 'Civil / Structural / Geo', href: '/civil-structural-geo', eyebrow: 'CIVIL · STRUCTURAL · GEOTECHNICAL', cols: 2, width: 600, items: [
    i('01', 'Infrastructure Systems Design', '/civil-structural-geo'), i('02', 'Structural Analysis & Design', '/civil-structural-geo'), i('03', 'Geotechnical Design Works', '/civil-structural-geo'), i('04', 'ERSS / Framework Design', '/civil-structural-geo'),
    i('05', 'Site Supervision', '/civil-structural-geo'), i('06', 'DfSP Services', '/civil-structural-geo'), i('07', 'Authorities Submission', '/civil-structural-geo'), i('08', 'Structural & Façade Inspection', '/civil-structural-geo'), i('09', 'Solar Roof Assessment', '/civil-structural-geo') ] },
  { key: 'train', label: 'Training', href: '/training', eyebrow: 'TRAINING & CERTIFICATION · 14 COURSES', cols: 2, width: 640, items: [
    i('TR-01', 'Safety Orientation & Induction', '/training/safety-orientation-induction'), i('TR-02', 'Permit Receiver', '/training/permit-receiver'), i('TR-03', 'Safety Officer', '/training/safety-officer'), i('TR-04', 'Rigger', '/training/rigger'),
    i('TR-05', 'Fire Watcher', '/training/fire-watcher'), i('TR-06', 'Flagman / Traffic Marshal', '/training/flagman-traffic-marshal'), i('TR-07', 'Equipment Operator Safety', '/training/equipment-operator-safety'), i('TR-08', 'Work at Height', '/training/work-at-height'),
    i('TR-09', 'Scaffolding', '/training/scaffolding'), i('TR-10', 'Welding Inspection Courses', '/training/welding-inspection-courses'), i('TR-11', 'NDT Training Courses', '/training/ndt-training-courses'), i('TR-12', 'API Training Courses', '/training/api-training-courses'),
    i('TR-13', 'RE/RTO Renewal STU', '/training/re-rto-renewal-stu'), i('TR-14', 'Bespoke Training', '/training/bespoke-training') ] },
  { key: 'svc', label: 'Services', href: '/services', eyebrow: 'INDUSTRIAL SERVICES', cols: 1, width: 360, items: [
    i('01', 'Plant Industrial Services', '/services/plant-industrial-services'), i('02', 'Operation & Maintenance', '/services/operation-maintenance'), i('03', 'Plant Machinery & Vehicle', '/services/plant-machinery-vehicle'), i('04', 'Housing Services', '/services/housing'), i('05', 'Remote Services', '/services/remote-services') ] },
  { key: 'cal', label: 'Calibration', href: '/calibration', eyebrow: 'CALIBRATION · LAB & ONSITE', cols: 2, width: 560, alignRight: true, items: [
    i('CAL-01', 'Pressure', '/calibration/pressure'), i('CAL-02', 'Dimensional', '/calibration/dimensional'), i('CAL-03', 'Electrical', '/calibration/electrical'), i('CAL-04', 'Thermal', '/calibration/thermal'), i('CAL-05', 'Torque', '/calibration/torque'),
    i('CAL-06', 'Flow Meter', '/calibration/flow-meter'), i('CAL-07', 'Mass & Volume', '/calibration/mass-volume'), i('CAL-08', 'Gas Detector', '/calibration/gas-detector'), i('CAL-09', 'Onsite Calibration', '/calibration/onsite') ] },
  { key: 'mfg', label: 'Manufacturing', href: '/manufacturing', eyebrow: 'MANUFACTURING & SUPPLY', cols: 1, width: 380, alignRight: true, items: [
    i('01', 'Servo Stabilizer', '/manufacturing/servo-stabilizer'), i('02', 'UPS Online & Offline', '/manufacturing/ups-online-offline'), i('03', 'Welding Electrodes', '/manufacturing/welding-electrodes'), i('04', 'Welding Machines & Consumables', '/manufacturing/welding-machines-consumables'), i('05', 'Safety Equipment & Accessories', '/manufacturing/safety-equipment') ] },
  { key: 'about', label: 'About Us', href: '/about', eyebrow: 'ABOUT OAGITECH', cols: 1, width: 320, alignRight: true, items: [
    i('01', 'About Us', '/about'), i('02', 'Certifications & Awards', '/about/certifications'), i('03', 'Career', '/about/career') ] },
  { key: 'contact', label: 'Contact', href: '/contact', eyebrow: 'GET IN TOUCH', cols: 1, width: 320, alignRight: true, items: [
    i('01', 'Contact Us', '/contact'), i('02', 'Request a Quote', '/contact'), i('03', 'Verify a Certificate', '/verify') ] }
];

/** Which top-level menu a path belongs to (for the active underline). */
export function menuKeyFor(path: string): string {
  if (path === '/') return 'home';
  if (path.startsWith('/verify')) return 'contact';
  const m = MENUS.find((m) => path === m.href || path.startsWith(m.href + '/'));
  return m ? m.key : '';
}

export const CONTACT = {
  phone: '+966 14 322 6503',
  phoneHref: 'tel:+966143226503',
  email: 'info@oagitech.com',
  whatsapp: 'https://wa.me/966143226503',
  address: 'Yanbu 46436, Al Rabie District, Kingdom of Saudi Arabia'
};
