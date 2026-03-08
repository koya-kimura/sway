import type { VisualRenderContext } from "../../types/render";

export class Scene18 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat } = ctx;

    tex.push();
    tex.noFill();
    tex.strokeWeight(1.3);

    const cols = 144;
    const rows = 96;
    for (let gy = 0; gy < rows; gy++) {
      for (let gx = 0; gx < cols; gx++) {
        const x = tex.width * ((gx + 0.5) / cols);
        const y = tex.height * ((gy + 0.5) / rows);
        const n = p.noise(gx * 0.25, gy * 0.25, beat * 0.04);
        const a = n * Math.PI * 2.0;
        const len = tex.width * 0.03;
        const x2 = x + Math.cos(a) * len;
        const y2 = y + Math.sin(a) * len;
        tex.stroke(0, 100, 50, 108);
        tex.line(x, y, x2, y2);
      }
    }

    tex.pop();
  }
}
