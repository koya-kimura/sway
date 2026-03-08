import type { VisualRenderContext } from "../../types/render";

export class Scene24 {
  draw(ctx: VisualRenderContext): void {
    const { tex, beat } = ctx;

    tex.push();
    tex.noStroke();

    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      const x = tex.width * (0.18 + t * 0.64) + Math.sin(beat * 0.08 + i) * 18;
      const y = tex.height * (0.5 + Math.cos(beat * 0.06 + i) * 0.4);
      const r = tex.width * (0.09 + (1.0 - t) * 0.06);
      tex.fill(255, 220, 36, 58);
      tex.ellipse(x, y, r, r * 0.8);
      tex.fill(255, 236, 70, 40);
      tex.ellipse(x, y, r * 1.6, r * 1.1);
    }

    tex.fill(255, 224, 48, 46);
    tex.ellipse(tex.width * 0.5, tex.height * 0.5, tex.width * 0.85, tex.height * 0.2);
    tex.pop();
  }
}
