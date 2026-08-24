/**
 * Pure business logic extracted from Astro calculator components.
 * No DOM dependency — testable with node --test or vitest.
 */

// ── VectorExplorer – Abbott correction ──
export type AbbottResult = {
  rawMort: number;
  ctrlMort: number;
  finalMort: number;
  abbottApplied: boolean;
  invalid: boolean;
  status: "sus" | "prob" | "res" | "invalid";
};

export function calculateAbbott(
  exposed: number,
  dead: number,
  controlN: number,
  controlDead: number
): AbbottResult {
  const exp = Math.max(1, Number(exposed) || 100);
  const d = Math.min(exp, Math.max(0, Number(dead) || 0));
  const ctrlExp = Math.max(1, Number(controlN) || 50);
  const ctrlD = Math.min(ctrlExp, Math.max(0, Number(controlDead) || 0));

  const rawMort = (d / exp) * 100;
  const ctrlMort = (ctrlD / ctrlExp) * 100;

  if (ctrlMort >= 20) {
    return {
      rawMort,
      ctrlMort,
      finalMort: rawMort,
      abbottApplied: false,
      invalid: true,
      status: "invalid",
    };
  }

  let finalMort = rawMort;
  let abbottApplied = false;
  if (ctrlMort >= 5) {
    finalMort = ((rawMort - ctrlMort) / (100 - ctrlMort)) * 100;
    finalMort = Math.max(0, Math.min(100, finalMort));
    abbottApplied = true;
  }

  let status: AbbottResult["status"] = "res";
  if (finalMort >= 98) status = "sus";
  else if (finalMort >= 90) status = "prob";
  else status = "res";

  return { rawMort, ctrlMort, finalMort, abbottApplied, invalid: false, status };
}

// ── GeneticsCalculator – HWE ──
export type HWEResult = {
  n: number;
  p: number;
  q: number;
  expSS: number;
  expRS: number;
  expRR: number;
  cSS: number;
  cRS: number;
  cRR: number;
  totalChi: number;
  isEquilibrium: boolean;
};

export function calculateHWE(ss: number, rs: number, rr: number): HWEResult | null {
  const nSS = Math.max(0, Number(ss) || 0);
  const nRS = Math.max(0, Number(rs) || 0);
  const nRR = Math.max(0, Number(rr) || 0);
  const n = nSS + nRS + nRR;
  if (n === 0) return null;
  const p = (2 * nSS + nRS) / (2 * n);
  const q = (2 * nRR + nRS) / (2 * n);
  const expSS = p * p * n;
  const expRS = 2 * p * q * n;
  const expRR = q * q * n;
  const cSS = expSS > 0 ? Math.pow(nSS - expSS, 2) / expSS : 0;
  const cRS = expRS > 0 ? Math.pow(nRS - expRS, 2) / expRS : 0;
  const cRR = expRR > 0 ? Math.pow(nRR - expRR, 2) / expRR : 0;
  const totalChi = cSS + cRS + cRR;
  const isEquilibrium = totalChi < 3.841;
  return { n, p, q, expSS, expRS, expRR, cSS, cRS, cRR, totalChi, isEquilibrium };
}

// ── SampleSizeCalculator – Fleiss ──
export type SampleSizeResult = {
  n: number;
  totalN: number;
  tubesPerGroup: number;
  totalTubes: number;
  delta: number;
  pBar: number;
};

export function calculateSampleSize(
  p1Percent: number,
  p2Percent: number,
  zAlpha: number,
  zBeta: number,
  perTube: number
): SampleSizeResult | null {
  const p1 = (Number(p1Percent) || 40) / 100;
  const p2 = (Number(p2Percent) || 75) / 100;
  const zA = Number(zAlpha) || 1.96;
  const zB = Number(zBeta) || 0.84;
  const pt = Number(perTube) || 25;
  const delta = Math.abs(p1 - p2);
  if (delta === 0) return null;
  const pBar = (p1 + p2) / 2;
  const qBar = 1 - pBar;
  const num = Math.pow(
    zA * Math.sqrt(2 * pBar * qBar) + zB * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2)),
    2
  );
  const den = Math.pow(delta, 2);
  let n = Math.ceil(num / den);
  n = Math.max(n, 10);
  const totalN = n * 2;
  const tubesPerGroup = Math.ceil(n / pt);
  const totalTubes = tubesPerGroup * 2;
  return { n, totalN, tubesPerGroup, totalTubes, delta, pBar };
}
