import type { VisualRenderContext } from "../types/render";
import { map } from "../utils/math/mathUtils";
import { leapNoise } from "../utils/math/gvm";
import { UniformRandom } from "../utils/math/uniformRandom";

export type UIDrawFunction = (context: VisualRenderContext) => void;

const WORDS = ["botanica", "music", "movie", "life", "nurture", "osaka", "sway", "sound", "visual", "word", "care"];
const SWAY_LETTERS = ["S", "W", "A", "Y"];

const applyFont = (context: VisualRenderContext): void => {
  const { tex, font } = context;
  if (font) {
    tex.textFont(font);
  }
};

const drawDust = (context: VisualRenderContext, count: number, alpha: number): void => {
  const { p, tex, beat } = context;
  tex.push();
  tex.noStroke();
  tex.fill(255, alpha);
  for (let i = 0; i < count; i++) {
    const t = i / Math.max(1, count - 1);
    const x = (p.noise(t * 8.0, beat * 0.03) * tex.width * 1.2) - tex.width * 0.1;
    const y = (p.noise(beat * 0.02, t * 9.0) * tex.height * 1.2) - tex.height * 0.1;
    tex.circle(x, y, 1.0 + p.noise(t * 4.0, beat * 0.04) * 1.6);
  }
  tex.pop();
};

export const uiNone: UIDrawFunction = (
  context: VisualRenderContext,
): void => {
  const { tex } = context;
  tex.push();
  tex.pop();
};

export const uiWordsDrift: UIDrawFunction = (
  context: VisualRenderContext,
): void => {
  const { p, tex, beat, font } = context;

  drawDust(context, 220, 18);

  tex.push();
  tex.fill(255, 170);
  tex.textAlign(p.CENTER, p.CENTER);
  tex.textSize(Math.max(18, tex.width * 0.024));
  if (font) tex.textFont(font);
  for (let i = 0; i < WORDS.length; i++) {
    const y = map(i, 0, WORDS.length - 1, tex.height * 0.2, tex.height * 0.8);
    const m = 10;
    const idx = (i + Math.floor(leapNoise(beat, 32, 4, i) * WORDS.length)) % WORDS.length;
    for (let j = 0; j < m; j++) {
      const x = map(j, 0, m - 1, tex.width * 0.05, tex.width * 0.95);
      const drift = Math.sin(beat * 0.35 + i * 0.7 + j * 0.5) * 40;
      tex.text(WORDS[idx], x + drift, y);
    }
  }
  tex.pop();
};

export const uiWordsGrid: UIDrawFunction = (
  context: VisualRenderContext,
): void => {
  const { p, tex, beat } = context;

  tex.push();
  applyFont(context);
  tex.fill(255, 200);
  tex.textAlign(p.CENTER, p.CENTER);
  tex.textSize(Math.max(13, tex.width * 0.015));

  const n = 4;
  const m = 10;
  for (let col = 0; col < n; col++) {
    const x = map(col, 0, n - 1, tex.width * 0.12, tex.width * 0.88);
    for (let row = 0; row < m; row++) {
      const y = map(row, 0, m - 1, tex.height * 0.1, tex.height * 0.9);
      const noiseOffset = Math.floor(leapNoise(beat, 8, 2, col, row) * WORDS.length);
      const wordIndex = (row + col + noiseOffset) % WORDS.length;
      tex.text(WORDS[wordIndex], x, y);
    }
  }
  tex.pop();
};

export const uiWordsRowsAligned: UIDrawFunction = (
  context: VisualRenderContext,
): void => {
  const { p, tex, beat } = context;

  tex.push();
  applyFont(context);
  tex.fill(255, 200);
  tex.textAlign(p.LEFT, p.CENTER);
  tex.textSize(Math.max(12, tex.width * 0.015));
  for (let row = 0; row < 11; row++) {
    const y = tex.height * (0.08 + row * 0.084);
    const base = WORDS[Math.floor(UniformRandom.rand(row * 100, Math.floor(beat*0.125)) * WORDS.length)];
    tex.text(`${base} : ${base}  ${base} ${base} ${base} ${base} ${base}`, tex.width * 0.06, y);
  }
  tex.pop();
};

export const uiSwayScatter: UIDrawFunction = (
  context: VisualRenderContext,
): void => {
  const { p, tex } = context;
  drawDust(context, 180, 14);

  tex.push();
  applyFont(context);
  tex.fill(255, 178);
  tex.textAlign(p.CENTER, p.CENTER);
  tex.textSize(Math.max(26, tex.width * 0.07));
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const idx = (i * 4 + j) % SWAY_LETTERS.length;
      const x = map(i, 0, 3, tex.width * 0.1, tex.width * 0.9);
      const y = map(j, 0, 3, tex.height * 0.1, tex.height * 0.9);
      tex.text(SWAY_LETTERS[idx], x, y);
    }
  }
  tex.pop();
};

export const uiSwayGrid: UIDrawFunction = (
  context: VisualRenderContext,
): void => {
  const { p, tex, beat } = context;

  tex.push();
  applyFont(context);
  tex.fill(255, 230);
  tex.textAlign(p.CENTER, p.CENTER);
  tex.textSize(Math.max(24, tex.width * 0.034));
  const n = 20;
  const m = 3;
  for (let j = 0; j < m; j++) {
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 + (p.millis() * 0.0002);
      const radius = Math.min(tex.width, tex.height) * map(j, 0, m - 1, 0.15, 0.4) * map(Math.sin(beat * 0.2 + j + i * 0.1 * Math.PI * 0.125), -1, 1, 0.85, 1.15);
      const x = tex.width / 2 + Math.cos(angle) * radius;
      const y = tex.height / 2 + Math.sin(angle) * radius;
      const idx = UniformRandom.rand(Math.floor(beat * 0.25) + j * 100 + i) * SWAY_LETTERS.length | 0;

      tex.push();
      tex.translate(x, y);
      tex.rotate(angle + Math.PI / 4 + (p.millis() * 0.0001));
      tex.text(SWAY_LETTERS[idx], 0, 0);
      tex.pop();
    }
  }
  tex.pop();
};

export const uiSwayColumnsDrift: UIDrawFunction = (
  context: VisualRenderContext,
): void => {
  const { p, tex, beat } = context;
  drawDust(context, 210, 10);

  tex.push();
  applyFont(context);
  tex.fill(255, 140);
  tex.textAlign(p.CENTER, p.CENTER);
  tex.textSize(Math.max(22, tex.width * 0.02));

  const n = 32;
  const m = 18;

  for (let col = 0; col < n; col++) {
    for (let row = 0; row < m; row++) {
      const x = map(col, 0, n - 1, tex.width * 0.05, tex.width * 0.95);
      const y = map(row, 0, m - 1, tex.height * 0.05, tex.height * 0.95);
      const idx = (col + row + Math.floor(leapNoise(beat, 8, 6, col, row) * SWAY_LETTERS.length)) % SWAY_LETTERS.length;

      tex.text(SWAY_LETTERS[idx], x, y);
    }
  }
  tex.pop();
};

export const uiSwayRowsAligned: UIDrawFunction = (
  context: VisualRenderContext,
): void => {
  const { p, tex, beat } = context;

  tex.push();
  applyFont(context);
  tex.fill(255, 200);
  tex.textAlign(p.CENTER, p.CENTER);
  tex.textSize(Math.max(20, tex.width * 0.028));

  const n = 16;
  const m = 4;
  for (let col = 0; col < n; col++) {
    const x = map(col, 0, n - 1, tex.width * 0.15, tex.width * 0.45);
    for (let row = 0; row < m; row++) {
      const y = map(row, 0, m - 1, tex.height * 0.2, tex.height * 0.8);
      const base = SWAY_LETTERS[(col + row + Math.floor(leapNoise(beat, 8, 6, col, row) * SWAY_LETTERS.length)) % SWAY_LETTERS.length];
      tex.text(base, x, y);
    }
  }
  tex.pop();
};

export const uiHybridGrid: UIDrawFunction = (
  context: VisualRenderContext,
): void => {
  const { p, tex } = context;

  tex.push();
  applyFont(context);
  tex.fill(255, 200);
  tex.textAlign(p.LEFT, p.CENTER);
  tex.textSize(Math.max(12, tex.width * 0.014));
  for (let row = 0; row < 8; row++) {
    const y = tex.height * (0.14 + row * 0.1);
    tex.text(WORDS[row % WORDS.length], tex.width * 0.08, y);
    tex.text(SWAY_LETTERS[row % SWAY_LETTERS.length], tex.width * 0.72, y);
  }
  tex.pop();
};

export const uiDebug: UIDrawFunction = (
  context: VisualRenderContext,
): void => {
  const { tex } = context;
  tex.push();
  tex.pop();
};