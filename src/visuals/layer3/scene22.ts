import type { VisualRenderContext } from "../../types/render";

export class Scene22 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat } = ctx;

    tex.push();
    tex.noStroke();
    tex.rectMode(p.CENTER);

    const bands = 14;
    for (let i = 0; i < bands; i++) {
      const t = i / (bands - 1);
      const phase = beat * 0.08 + i * 0.3;
      const y = tex.height * (0.08 + t * 0.84) + Math.sin(phase) * 18;
      const h = tex.height * 0.035 + Math.cos(phase * 0.9) * 8;
      const w = tex.width * (0.5 + t * 0.45 + Math.sin(phase * 0.6) * 0.08);
      tex.fill(0, 100, 50, 68 + t * 62);
      tex.rect(tex.width * 0.5, y, w, h);
    }

    tex.pop();
  }
}
