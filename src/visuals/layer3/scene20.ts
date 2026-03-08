import type { VisualRenderContext } from "../../types/render";
import { wrapWithBuffer } from "../shared/motion";

export class Scene20 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat } = ctx;

    tex.push();
    tex.noStroke();
    tex.rectMode(p.CENTER);

    for (let i = 0; i < 120; i++) {
      const t = i / 120;
      const baseY = wrapWithBuffer(tex.height, (beat * 0.06 + t * 1.8) * tex.height, 0.5);
      const drift = Math.sin(beat * 0.2 + i * 0.37) * tex.width * 0.12;
      const x = wrapWithBuffer(tex.width, tex.width * (0.12 + (i % 20) * 0.042) + drift, 0.5);
      const y = baseY;
      const r = 2.0 + (i % 4);
      tex.fill(0, 100, 50, 88);
      tex.circle(x, y, r);
    }

    tex.fill(0, 100, 50, 72);
    tex.rect(tex.width * 0.5, tex.height * 0.5, tex.width * 0.78, tex.height * 0.5);
    tex.pop();
  }
}
