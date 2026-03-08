import type { VisualRenderContext } from "../../types/render";
import { map } from "../../utils/math/mathUtils";

export class Scene28 {
  draw(ctx: VisualRenderContext): void {
    const { tex, beat } = ctx;

    tex.push();
    tex.noFill();
    tex.strokeWeight(2.2);

    const n = 50;
    for (let i = 0; i < n; i++) {
      const phase = beat * 0.8 + i * 0.45;
      const y = tex.height * map(i, 0, n-1, 0.1, 0.9) + Math.sin(phase) * 12;
      tex.stroke(255, 228, 44, 126);
      tex.beginShape();
      for (let xStep = 0; xStep <= 40; xStep++) {
        const x = tex.width * (xStep / 40);
        const wave = Math.sin(phase + xStep * 0.34 + i * 0.07) * tex.height * 0.03;
        tex.vertex(x, y + wave);
      }
      tex.endShape();
    }

    tex.pop();
  }
}
