import type { VisualRenderContext } from "../../types/render";
import { leapNoise } from "../../utils/math/gvm";
import { map } from "../../utils/math/mathUtils";

export class Scene23 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat } = ctx;

    tex.push();
    tex.noStroke();

    const m = 5;
    const n = 100;
    for(let j = 0; j < m; j++) {
      tex.fill(255, 220, 36, 58);
      tex.beginShape();
      for(let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 + beat * 0.1 + j;
        const radius = Math.min(tex.width, tex.height) * map(leapNoise(beat, 8, 1, i*0.01, j), 0, 1, 0.15, 0.4) * map(j, 0, m - 1, 0.5, 0.9);
        const x = tex.width / 2 + Math.cos(angle) * radius;
        const y = tex.height / 2 + Math.sin(angle) * radius;
        tex.vertex(x, y);
      }
      tex.endShape(p.CLOSE);
    }
    tex.pop();
  }
}
