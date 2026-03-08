import type { VisualRenderContext } from "../../types/render";

export class Scene25 {
  draw(ctx: VisualRenderContext): void {
    const { tex, beat } = ctx;

    tex.push();
    tex.noFill();
    tex.strokeWeight(1.8);

    for (let i = 0; i < 10; i++) {
      const pulse = (beat * 0.14 + i * 0.1) % 1;
      const radius = tex.width * (0.08 + pulse * 0.66);
      tex.stroke(255, 230, 52, (1.0 - pulse) * 120.0);
      tex.arc(tex.width * 0.5, tex.height * 0.52, radius, radius * 0.7, 0, Math.PI * 2.0);
    }

    for (let k = 0; k < 5; k++) {
      const a = beat * 0.07 + k * (Math.PI * 2.0 / 5.0);
      const x = tex.width * 0.5 + Math.cos(a) * tex.width * 0.26;
      const y = tex.height * 0.52 + Math.sin(a) * tex.height * 0.6;
      tex.noStroke();
      tex.fill(255, 236, 66, 150);
      tex.circle(x, y, tex.width * 0.028);
    }

    tex.pop();
  }
}
