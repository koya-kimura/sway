import type { VisualRenderContext } from "../../types/render";

export class Scene19 {
  draw(ctx: VisualRenderContext): void {
    const { tex, beat } = ctx;

    tex.push();
    tex.noStroke();

    for (let i = 0; i < 9; i++) {
      const n = i / 8;
      const wobble = 0.9 + Math.sin(beat * 0.1 + i * 0.8) * 0.12;
      const w = tex.width * (0.2 + n * 0.5) * wobble;
      const h = tex.height * (0.16 + n * 0.4) * (1.05 - wobble * 0.08);
      const x = tex.width * 0.5 + Math.sin(beat * 0.06 + i * 0.6) * 18;
      const y = tex.height * 0.52 + Math.cos(beat * 0.05 + i * 0.7) * 14;
      tex.fill(0, 100, 50, 52 + n * 62);
      tex.ellipse(x, y, w, h);
    }

    tex.pop();
  }
}
