// One-off script: pulls page data out of the Claude Design artboards (.dc.html)
// and writes content/pages.json for the Next.js site.
// Usage: node scripts/extract-content.mjs <path-to-design-project-folder>
import fs from 'node:fs';
import path from 'node:path';

const src = process.argv[2];
if (!src) { console.error('Pass the design project folder'); process.exit(1); }

// Design file -> site route
const ROUTES = {
  'Main': '/', 'Services': '/ndt', 'ServiceDetail': '/ndt/ultrasonic-testing', 'Training': '/training',
  'Contact': '/contact', 'Verify': '/verify',
  'Inspection': '/inspection', 'Insp-AssetIntegrity': '/inspection/asset-integrity', 'Insp-QAQC': '/inspection/qa-qc-project-management', 'Insp-TPI': '/inspection/third-party-inspection',
  'Welding': '/welding', 'Civil': '/civil-structural-geo',
  'NDT-RT': '/ndt/radiographic-testing', 'NDT-MPT': '/ndt/magnetic-particle-testing', 'NDT-PMI': '/ndt/positive-material-identification', 'NDT-PT': '/ndt/penetrant-testing', 'NDT-Hardness': '/ndt/hardness-test', 'NDT-RopeAccess': '/ndt/rope-access', 'NDT-Advanced': '/ndt/advanced-ndt-services',
  'Tr-SafetyInduction': '/training/safety-orientation-induction', 'Tr-PermitReceiver': '/training/permit-receiver', 'Tr-SafetyOfficer': '/training/safety-officer', 'Tr-Rigger': '/training/rigger', 'Tr-FireWatcher': '/training/fire-watcher', 'Tr-Flagman': '/training/flagman-traffic-marshal', 'Tr-EquipmentOperator': '/training/equipment-operator-safety', 'Tr-WorkAtHeight': '/training/work-at-height', 'Tr-Scaffolding': '/training/scaffolding', 'Tr-WeldingInspection': '/training/welding-inspection-courses', 'Tr-NDT': '/training/ndt-training-courses', 'Tr-API': '/training/api-training-courses', 'Tr-RERTO': '/training/re-rto-renewal-stu', 'Tr-Bespoke': '/training/bespoke-training',
  'Calibration': '/calibration', 'Cal-Pressure': '/calibration/pressure', 'Cal-Dimensional': '/calibration/dimensional', 'Cal-Electrical': '/calibration/electrical', 'Cal-Thermal': '/calibration/thermal', 'Cal-Torque': '/calibration/torque', 'Cal-FlowMeter': '/calibration/flow-meter', 'Cal-MassVolume': '/calibration/mass-volume', 'Cal-GasDetector': '/calibration/gas-detector', 'Cal-Onsite': '/calibration/onsite',
  'IndServices': '/services', 'Svc-PlantIndustrial': '/services/plant-industrial-services', 'Svc-OandM': '/services/operation-maintenance', 'Svc-PlantMachinery': '/services/plant-machinery-vehicle', 'Svc-Housing': '/services/housing', 'Svc-Remote': '/services/remote-services',
  'Manufacturing': '/manufacturing', 'Mfg-Servostabilizer': '/manufacturing/servo-stabilizer', 'Mfg-UPS': '/manufacturing/ups-online-offline', 'Mfg-Electrodes': '/manufacturing/welding-electrodes', 'Mfg-WeldingMachines': '/manufacturing/welding-machines-consumables', 'Mfg-Safety': '/manufacturing/safety-equipment',
  'About': '/about', 'Certifications': '/about/certifications', 'Career': '/about/career'
};

// Uploaded design asset id -> local image file in /public/images
const BLOBS = {
  '67a7d29b4c50c813331f0732c6525ee6': 'hero-ut-technician', '18eb738c0c41af5081549622d1d93e79': 'ind-refinery', 'edd95f865d0b3ed528606457c321e06c': 'ind-petrochem', '9af1c768ad51e71a67881b536d77d8b3': 'ind-port', '929c740f9a077bfc9c4cac4b99ea4b8f': 'ind-power', '8e4d8cc098092c91b9ec369a6392e094': 'ind-bridge', '2568c304d607e0ee3c928e1aef2dee2a': 'proj-weld-inspection', '701b3391e38374e907c948177b387533': 'proj-rope-access', '9f655298ee65e98ae3572871e53a06f5': 'proj-crane-tpi', 'b6ac46b34f053d2adde0a833b2565de8': 'ut-probe-closeup', 'd58e0c1823af3a0626f7a9aa0cfed3e2': 'training-harness', '9f0999fa89a51d66e950c4970c240737': 'calibration-lab', 'fd39db19f5a4a539fda4c749951f5e7f': 'team', '718292fbb28a838ff723a36d5282b3b4': 'rt-radiograph',
  'a570c99f63675235bc4b2c14c8199ad4': 'insp-hub', 'aa62ec561950051ee0515599e8b769fe': 'asset-integrity', '5f84b58b2be60c6c8ddc3444896b9751': 'qaqc', '347b4efa8eab3e22bec1e35096b778a8': 'tpi', '55196fee6be8a8fd303005888f1c202f': 'welding', 'f773ab0851e8dc3a0b8c83c6a2211fa4': 'civil', 'eb338ff172d57822fcea18d2f722eb5b': 'mpt', '4fec06b3d172dc7e4296d29836bc6cac': 'pmi', '59e8a6962e8e5e86ca02e61a4010b414': 'pt', 'd0693dc5efcd34a4f8a3b4d9b9cf1823': 'hardness', '975473c418d7ec8bee464b273eacfb95': 'rope-chimney', '85027fc25c9deff294cc6714f8aa3451': 'paut', 'f5e175b61059e8449f5bbd2acc2a1e7f': 'ndt-hub',
  '6c4d04093af7c8c87fadf9262f2d0337': 'tr-hub', '465dc9e528db5b7c3992fd8d3359f588': 'tr-induction', '6a611ad703128a09afbd50f8ce68e6ff': 'tr-permit', 'b6a11eee17b9e6e59072ca0ec9bd2b84': 'tr-safetyofficer', '6f551712c725bdcc97c8f7a46a9135ff': 'tr-rigger', '2c66f96ff12ba6fd2d0f68e4c0181947': 'tr-firewatch', '4a48ba3a3b0c315e14d9425dc551e40c': 'tr-flagman', 'fbe3cb5fa4c1e733e71e60c48e89c6da': 'tr-equipment', '7925d414d78acf3e6a0396e8e4957b4b': 'tr-scaffold', 'ebeda04846e90b3e7a0ee2b496a2d2cc': 'tr-weldinsp', 'f6513914b5e5bc360658e25feb20889a': 'tr-ndt', '0bae16b1eec43adf335e36048b775bc5': 'tr-api', '54f3a7194a0175ff0fe0f372ece4171b': 'tr-rerto', '2901c795e6b6936a4fa976622b82c2a7': 'tr-bespoke',
  '0d47028bd8830041ab08d7575d9116b6': 'cal-hub', '4a7f716fe14ba58d928f8c7117daad0e': 'cal-dimensional', '76603b6ea98a98c8eb6c218a5a27a1f8': 'cal-electrical', '07ae60c0c36cdd45fab7baa024571727': 'cal-thermal', 'a8c72c8760fa1b4bf57a31ae924af74d': 'cal-torque', '47b2c02d6a5d9c221b2fbf98b1bfd4db': 'cal-flow', '46bcf435d6e226d201104cfc84b1e966': 'cal-mass', '07256fadc33485a9bc6a555275b31954': 'cal-gas', '1568ae0bea0ad2a736d4eb9f1df49a57': 'cal-onsite',
  '1628bee90af58882584f7a84f5adc362': 'svc-hub', 'be2f8a6ca84eca8531690b177e2258ac': 'svc-plant', 'f425bbcd37d909fa29101077001241e0': 'svc-om', '8ba106d2342a4a984c0864201b09d176': 'svc-machinery', '75a868ebb4702be725877a85ac2b91e7': 'svc-housing', '5939c37ee037f9e5297f3fc02a5d5ef7': 'svc-remote',
  '82c1b575985b495116efd71e11527b49': 'mfg-hub', '060f01d1583d0c1789ae57ce1c2e30df': 'mfg-servo', 'e1db8e1e02865b2e7607319e89b132ed': 'mfg-ups', '70a99a3dcb27f97bbf4adb3a6b642d95': 'mfg-electrodes', '75b389f6f676c53d90db90204a4d01b0': 'mfg-weldmachines', '7111fb1f403d5b583d73e0d63aff3148': 'mfg-ppe',
  'e1149eae4b28fb2eacdf59f125dbaaf7': 'certifications', 'c260072ce2d789a0223ba37ae5f78194': 'career', '57eb5792e545d614edfc886ee4f8d8c4': 'contact', '90668d326f66d80700ed95b61784bd0e': 'verify'
};

const fixHref = (h) => {
  if (!h || h === '#' || /^(https?:|tel:|mailto:)/.test(h)) return h || '#';
  const key = h.replace(/\.dc\.html$/, '');
  return ROUTES[key] ?? '#';
};
const fixImg = (u) => {
  if (!u) return '';
  const id = u.replace('/_blob/', '');
  return BLOBS[id] ? `/images/${BLOBS[id]}.jpg` : '';
};

const out = [];
for (const [file, route] of Object.entries(ROUTES)) {
  const fp = path.join(src, `${file}.dc.html`);
  if (!fs.existsSync(fp)) continue;
  const txt = fs.readFileSync(fp, 'utf8');
  const start = txt.indexOf('return { page: ');
  if (start < 0) continue; // custom page, built by hand in the app
  const end = txt.indexOf('\n    } };', start);
  const literal = txt.slice(start + 'return { page: '.length, end + 6);
  const page = new Function(`return (${literal});`)();
  page.path = route;
  page.pillarHref = page.pillarHref ? fixHref(page.pillarHref) : '';
  page.img = fixImg(page.img);
  (page.related || []).forEach((r) => (r.href = fixHref(r.href)));
  (page.sections || []).forEach((s) => (s.items || []).forEach((it) => { if (typeof it === 'object' && it.href) it.href = fixHref(it.href); }));
  out.push(page);
}
fs.writeFileSync(new URL('../content/pages.json', import.meta.url), JSON.stringify(out, null, 2));
console.log(`Wrote ${out.length} pages`);
