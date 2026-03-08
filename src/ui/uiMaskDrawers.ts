import type { VisualRenderContext } from "../types/render";
import { UniformRandom } from "../utils/math/uniformRandom";
import { leapNoise } from "../utils/math/gvm";
import { map } from "../utils/math/mathUtils";

export type UIMaskDrawFunction = (context: VisualRenderContext) => void;

// Full-open mask.
export const uiMaskFull: UIMaskDrawFunction = (context: VisualRenderContext): void => {
  const { p, tex } = context;
  tex.push();
  tex.noStroke();
  tex.fill(255, 255);
  tex.rectMode(p.CORNER);
  tex.rect(0, 0, tex.width, tex.height);
  tex.pop();
};

export const uiMaskCenterSmall: UIMaskDrawFunction = (context: VisualRenderContext): void => {
  const { p, tex } = context;
  tex.push();
  tex.noStroke();
  tex.fill(255, 255);
  tex.rectMode(p.CENTER);
  tex.rect(tex.width * 0.5, tex.height * 0.5, tex.width * 0.24, tex.height * 0.24);
  tex.pop();
};

export const uiMaskCenterTall: UIMaskDrawFunction = (context: VisualRenderContext): void => {
  const { p, tex } = context;
  tex.push();
  tex.noStroke();
  tex.fill(255, 255);
  tex.rectMode(p.CENTER);
  tex.rect(tex.width * 0.5, tex.height * 0.5, tex.width * 0.24, tex.height * 0.74);
  tex.pop();
};

export const uiMaskCenterWide: UIMaskDrawFunction = (context: VisualRenderContext): void => {
  const { p, tex } = context;
  tex.push();
  tex.noStroke();
  tex.fill(255, 255);
  tex.rectMode(p.CENTER);
  tex.rect(tex.width * 0.5, tex.height * 0.5, tex.width * 0.78, tex.height * 0.2);
  tex.pop();
};

export const uiMaskTwinVertical: UIMaskDrawFunction = (context: VisualRenderContext): void => {
  const { p, tex } = context;
  tex.push();
  tex.noStroke();
  tex.fill(255, 255);
  tex.rectMode(p.CENTER);
  tex.rect(tex.width * 0.32, tex.height * 0.5, tex.width * 0.2, tex.height * 0.8);
  tex.rect(tex.width * 0.68, tex.height * 0.5, tex.width * 0.2, tex.height * 0.8);
  tex.pop();
};

export const uiMaskTwinHorizontal: UIMaskDrawFunction = (context: VisualRenderContext): void => {
  const { p, tex, beat } = context;
  const centerX = (Math.floor(UniformRandom.rand(Math.floor(beat * 0.5)) * 9) + 0.5) * (tex.width / 10);
  tex.push();
  tex.noStroke();
  tex.fill(255, 255);
  tex.rectMode(p.CENTER);
  tex.rect(centerX, tex.height * 0.5, tex.width * 0.1, tex.height);
  tex.pop();
};

export const uiMaskQuadWindows: UIMaskDrawFunction = (context: VisualRenderContext): void => {
  const { p, tex, beat } = context;
  tex.push();
  tex.noStroke();
  tex.fill(255, 255);
  tex.rectMode(p.CENTER);
  const w = tex.width * 0.26;
  const h = tex.height * 0.26;
  tex.rect(tex.width * 0.3, tex.height * 0.3, w, h);
  tex.rect(tex.width * 0.7, tex.height * 0.3, w, h);
  tex.rect(tex.width * 0.3, tex.height * 0.7, w, h);
  tex.rect(tex.width * 0.7, tex.height * 0.7, w, h);
  tex.pop();
};

export const uiMaskFrameHole: UIMaskDrawFunction = (context: VisualRenderContext): void => {
  const { p, tex } = context;
  tex.push();
  tex.noStroke();
  tex.fill(255, 255);
  tex.rectMode(p.CORNER);
  const m = tex.width * 0.05;
  tex.rect(0, 0, tex.width, m);
  tex.rect(0, tex.height - m, tex.width, m);
  tex.rect(0, 0, m, tex.height);
  tex.rect(tex.width - m, 0, m, tex.height);
  tex.pop();
};
