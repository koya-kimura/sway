import type { VisualRenderContext } from "../../types/render";

export class Scene21 {
  draw(ctx: VisualRenderContext): void {
    const { tex, beat } = ctx;

    tex.push();
    tex.noFill();
    tex.strokeWeight(2);

    for (let k = 0; k < 5; k++) {
      tex.beginShape();
      for (let i = 0; i <= 180; i++) {
        const t = (i / 180) * Math.PI * 2.0;
        const a = 2.0 + k * 0.2;
        const b = 3.0 + k * 0.25;
        const x = tex.width * 0.5 + Math.sin(t * a + beat * 0.09) * tex.width * (0.14 + k * 0.05);
        const y = tex.height * 0.5 + Math.sin(t * b + beat * 0.07) * tex.height * (0.11 + k * 0.04);
        tex.stroke(0, 100, 50, 62 + k * 30);
        tex.vertex(x, y);
      }
      tex.endShape();
    }

    tex.pop();
  }
}
