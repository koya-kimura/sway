import type { VisualRenderContext } from "../../types/render";

export class Scene27 {
  draw(ctx: VisualRenderContext): void {
    const { tex, beat } = ctx;

    tex.push();
    tex.noFill();
    tex.stroke(255, 230, 48, 100);
    tex.strokeWeight(1.4);

    const rays = 1000;
    for (let i = 0; i < rays; i++) {
      const a = beat * 0.05 + (i / rays) * Math.PI * 2.0;
      const r1 = tex.width * 0.16;
      const r2 = tex.width * (0.34 + Math.sin(beat * 0.08 + i) * 0.06);
      const x1 = tex.width * 0.5 + Math.cos(a) * r1;
      const y1 = tex.height * 0.5 + Math.sin(a) * r1;
      const x2 = tex.width * 0.5 + Math.cos(a) * r2;
      const y2 = tex.height * 0.5 + Math.sin(a) * r2;
      tex.push();
      tex.translate((x1+x2)*0.5, (y1+y2)*0.5);
      tex.rotate(beat * 0.1 + i);
      tex.line(x1 - (x1+x2)*0.5, y1 - (y1+y2)*0.5, x2 - (x1+x2)*0.5, y2 - (y1+y2)*0.5);
      tex.pop();
    }
    tex.pop();
  }
}
