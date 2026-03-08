import type { VisualRenderContext } from "../../types/render";

export class Scene26 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat } = ctx;

    tex.push();
    tex.noStroke();

    for (let i = 0; i < 170; i++) {
      const t = i / 170;
      const x = p.noise(t * 7.0, beat * 0.03) * tex.width;
      const y = p.noise(beat * 0.028, t * 8.0) * tex.height;
      const r = 1.6 + p.noise(t * 11.0, beat * 0.05) * 4.2;
      tex.fill(255, 228, 44, 92);
      tex.circle(x, y, r);
    }

    for (let i = 0; i < 22; i++) {
      const a = beat * 0.06 + i * 0.28;
      const x = tex.width * 0.5 + Math.cos(a) * tex.width * 0.38;
      const y = tex.height * 0.5 + Math.sin(a * 1.1) * tex.height * 0.28;
      tex.fill(255, 238, 75, 98);
      tex.circle(x, y, tex.width * 0.012);
    }

    tex.pop();
  }
}
