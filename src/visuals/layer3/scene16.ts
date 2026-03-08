import type { VisualRenderContext } from "../../types/render";

export class Scene16 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat } = ctx;

    tex.push();
    tex.noStroke();
    for (let i = 0; i < 160; i++) {
      const t = i / 160;
      const x = p.noise(t * 6.0, beat * 0.03) * tex.width;
      const y = p.noise(beat * 0.025, t * 7.0) * tex.height;
      const r = 1.5 + p.noise(t * 9.0, beat * 0.04) * 5.0;
      tex.fill(0, 100, 50, 90);
      tex.circle(x, y, r);
    }

    tex.fill(0, 100, 50, 68);
    tex.ellipse(tex.width * 0.5, tex.height * 0.5, tex.width * 0.9, tex.height * 0.58);
    tex.pop();
  }
}
