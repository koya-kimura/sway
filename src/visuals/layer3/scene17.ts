import type { VisualRenderContext } from "../../types/render";

export class Scene17 {
  draw(ctx: VisualRenderContext): void {
    const { tex, beat } = ctx;

    tex.push();
    tex.noFill();
    tex.stroke(0, 100, 50, 110);
    tex.strokeWeight(1.8);

    for (let i = 0; i < 12; i++) {
      const pulse = (beat * 0.16 + i * 0.08) % 1;
      const radius = tex.width * (0.08 + pulse * 0.9);
      const alpha = (1.0 - pulse) * 132.0;
      tex.stroke(0, 100, 50, alpha);
      tex.circle(tex.width * 0.5, tex.height * 0.5, radius);
    }

    tex.pop();
  }
}
