import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Pure logic duplicated inline to avoid TS import in node --test (fallback when vitest unavailable)

function abbott(exposed, dead, controlN, controlDead) {
  const exp = Math.max(1, Number(exposed) || 100);
  const d = Math.min(exp, Math.max(0, Number(dead) || 0));
  const ctrlExp = Math.max(1, Number(controlN) || 50);
  const ctrlD = Math.min(ctrlExp, Math.max(0, Number(controlDead) || 0));
  const rawMort = (d / exp) * 100;
  const ctrlMort = (ctrlD / ctrlExp) * 100;
  if (ctrlMort >= 20) return { rawMort, ctrlMort, finalMort: rawMort, abbottApplied: false, invalid: true, status: "invalid" };
  let finalMort = rawMort; let abbottApplied = false;
  if (ctrlMort >= 5) { finalMort = ((rawMort - ctrlMort) / (100 - ctrlMort)) * 100; finalMort = Math.max(0, Math.min(100, finalMort)); abbottApplied = true; }
  let status = "res"; if (finalMort >= 98) status = "sus"; else if (finalMort >= 90) status = "prob";
  return { rawMort, ctrlMort, finalMort, abbottApplied, invalid: false, status };
}
function hwe(ss, rs, rr) {
  const n = ss + rs + rr; if (n===0) return null;
  const p=(2*ss+rs)/(2*n), q=(2*rr+rs)/(2*n);
  const expSS=p*p*n, expRS=2*p*q*n, expRR=q*q*n;
  const cSS=expSS>0? Math.pow(ss-expSS,2)/expSS:0;
  const cRS=expRS>0? Math.pow(rs-expRS,2)/expRS:0;
  const cRR=expRR>0? Math.pow(rr-expRR,2)/expRR:0;
  const totalChi=cSS+cRS+cRR; return {n,p,q,expSS,expRS,expRR,cSS,cRS,cRR,totalChi,isEquilibrium: totalChi<3.841};
}
function fleiss(p1Percent,p2Percent,zAlpha,zBeta,perTube){
  const p1=p1Percent/100, p2=p2Percent/100;
  const delta=Math.abs(p1-p2); if(delta===0) return null;
  const pBar=(p1+p2)/2, qBar=1-pBar;
  const num=Math.pow(zAlpha*Math.sqrt(2*pBar*qBar)+zBeta*Math.sqrt(p1*(1-p1)+p2*(1-p2)),2);
  const den=Math.pow(delta,2); let n=Math.ceil(num/den); n=Math.max(n,10);
  return {n, totalN:n*2, tubesPerGroup:Math.ceil(n/perTube), totalTubes:Math.ceil(n/perTube)*2, delta, pBar};
}

// Use inline fallback for node --test without TS loader
describe("VectorExplorer – Abbott (node:test)", () => {
  it("no correction when control <5%", () => {
    const r = abbott(100,76,50,2);
    assert.equal(r.abbottApplied, false);
    assert.equal(r.invalid, false);
    assert.equal(r.status, "res");
    assert.ok(Math.abs(r.finalMort - 76) < 0.1);
  });
  it("Abbott applied 5-20%", () => {
    const r = abbott(100,80,100,10);
    assert.equal(r.abbottApplied, true);
    assert.ok(Math.abs(r.finalMort - 77.777) < 0.1);
  });
  it("invalid when control >=20%", () => {
    const r = abbott(100,50,50,15);
    assert.equal(r.invalid, true);
    assert.equal(r.status, "invalid");
  });
});

describe("GeneticsCalculator – HWE (node:test)", () => {
  it("equilibrium case", () => {
    const r = hwe(12,38,50);
    assert.equal(r.n, 100);
    assert.ok(Math.abs(r.p -0.31)<0.01);
    assert.ok(Math.abs(r.totalChi -1.25)<0.1);
    assert.equal(r.isEquilibrium, true);
  });
  it("deviation case", () => {
    const r = hwe(80,10,10);
    assert.ok(r.totalChi > 3.841);
    assert.equal(r.isEquilibrium, false);
  });
  it("null on empty", () => {
    assert.equal(hwe(0,0,0), null);
  });
});

describe("SampleSizeCalculator – Fleiss (node:test)", () => {
  it("Δ 35% => n=31", () => {
    const r = fleiss(40,75,1.96,0.84,25);
    assert.equal(r.n, 31);
    assert.equal(r.totalN, 62);
    assert.equal(r.tubesPerGroup, 2);
  });
  it("Δ 20% => n=93", () => {
    const r = fleiss(50,70,1.96,0.84,25);
    assert.equal(r.n, 93);
  });
  it("null when delta 0", () => {
    assert.equal(fleiss(50,50,1.96,0.84,25), null);
  });
});
