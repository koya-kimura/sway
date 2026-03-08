import type { VisualRenderContext } from "../../types/render";
import { map } from "../../utils/math/mathUtils";

export class Scene29 {
  draw(ctx: VisualRenderContext): void {
    const { tex, beat } = ctx;

    tex.push();
    tex.noStroke();

    const n = 100;
    for (let i = 0; i < n; i++) {
      const x = tex.width * map(i, 0, n-1, 0.08, 0.92);
      const y = tex.height * 0.5 + Math.sin(beat * 0.11 + i * 0.7) * 16;
      const d = Math.min(tex.width, tex.height) * map(Math.sin(beat * 0.8 + i * 0.37), -1, 1, 0.03, 0.2);
      tex.fill(255, 236, 72, 112);
      tex.ellipse(x, y, d, d);
    }

    tex.pop();
  }
}