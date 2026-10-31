import pagesJson from '@/content/pages.json';

export type Item = string | { t: string; d?: string; href?: string };
export type Tone = 'paper' | 'stone' | 'ink';
export type Section = {
  kind: 'list' | 'grid' | 'steps' | 'chips' | 'index' | 'report';
  tone?: Tone;
  eyebrow?: string;
  heading: string;
  body?: string;
  items?: Item[];
};
export type Fact = { k: string; v: string };
export type Link = { t: string; href: string };
export type Page = {
  path: string;
  pillarKey: string;
  pillar: string;
  pillarHref: string;
  crumb: string;
  tag: string;
  code?: string;
  title: string;
  intro: string;
  img: string;
  imgAlt: string;
  cta?: string;
  facts?: Fact[];
  sections: Section[];
  related?: Link[];
  relatedLabel?: string;
  ctaTitle?: string;
};

// Ultrasonic Testing was a hand-built page in the design; its content lives here.
const ultrasonic: Page = {
  path: '/ndt/ultrasonic-testing',
  pillarKey: 'ndt', pillar: 'NDT', pillarHref: '/ndt', crumb: 'Ultrasonic Testing', tag: 'NDT · METHOD 02.1', code: 'UT',
  title: 'Ultrasonic testing',
  intro: 'Accurate, reliable evaluation of welds, plates, pipes and pressure equipment using high-frequency sound — with no damage to the component and no interruption to surrounding work.',
  img: '/images/ut-probe-closeup.jpg', imgAlt: 'Ultrasonic angle-beam probe on a weld bead', cta: 'Request UT',
  facts: [{ k: 'MOBILISATION', v: '[XX] HRS' }, { k: 'REPORT', v: '[X] DAYS' }, { k: 'PERSONNEL', v: 'LEVEL II / III' }],
  sections: [
    { kind: 'grid', eyebrow: 'APPLICATIONS', heading: 'Where we use UT', items: [
      { t: 'Weld inspection', d: 'Butt, fillet and nozzle welds on piping, tanks and structures.' },
      { t: 'Thickness & corrosion', d: 'Wall-loss mapping for pipelines, vessels and ship hulls.' },
      { t: 'Plate & forgings', d: 'Lamination and inclusion checks before fabrication.' },
      { t: 'In-service integrity', d: 'Periodic inspection that feeds your asset integrity programme.' } ] },
    { kind: 'list', tone: 'ink', eyebrow: 'TECHNIQUES', heading: 'Conventional to advanced', items: [
      { t: 'UTT', d: 'Ultrasonic thickness gauging and corrosion mapping.' },
      { t: 'UT flaw detection', d: 'Pulse-echo flaw detection with angle and straight-beam probes.' },
      { t: 'PAUT', d: 'Phased array imaging for complex geometries and permanent records.' },
      { t: 'TOFD', d: 'Time-of-flight diffraction for accurate flaw sizing in thick welds.' } ] },
    { kind: 'report', eyebrow: 'WHAT YOU RECEIVE', heading: 'A report you can act on', items: [
      'Signed inspection report against the specified code', 'Indication log with location, size and acceptance status',
      'Thickness grids and photographs', 'Equipment calibration references', 'Certificate number, verifiable online' ] },
    { kind: 'chips', tone: 'stone', eyebrow: 'STANDARDS', heading: 'Codes we work to', items: ['ASME SEC V', 'ASME B31.3', 'AWS D1.1', 'API 1104', 'ISO 17640', '[CLIENT SPEC]'] }
  ],
  relatedLabel: 'OTHER NDT METHODS',
  related: [{ t: 'Radiographic Testing', href: '/ndt/radiographic-testing' }, { t: 'Advanced NDT', href: '/ndt/advanced-ndt-services' }, { t: 'Rope Access', href: '/ndt/rope-access' }],
  ctaTitle: 'Get a UT quote today.'
};

export const pages: Page[] = [...(pagesJson as Page[]), ultrasonic];

export function getPage(path: string): Page | undefined {
  return pages.find((p) => p.path === path);
}

export function pagesUnder(prefix: string): Page[] {
  return pages.filter((p) => p.path.startsWith(prefix + '/'));
}

export function itemOf(it: Item): { t: string; d?: string; href?: string } {
  return typeof it === 'string' ? { t: it } : it;
}
