import type { VisualRenderContext } from "../../types/render";
import { wrapWithBuffer } from "../shared/motion";

export class Scene07 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, imageStore } = ctx;
    if (!imageStore) return;
    if (!imageStore.has("traffic_cone") || !imageStore.has("tree_guard")) return;

    const imgA = imageStore.get("traffic_cone");
    const imgB = imageStore.get("tree_guard");
    const n = 10;

    tex.push();
    tex.imageMode(p.CENTER);
    tex.rectMode(p.CENTER);

    for (let i = 0; i < n; i++) {
      const loop = beat * 0.08 + i / n;
      const x = wrapWithBuffer(tex.width, loop * tex.width, 0.5);
      const y = wrapWithBuffer(
        tex.height,
        (1.0 - loop) * tex.height + Math.sin(beat * 0.25 + i) * 28,
        0.5,
      );

      tex.push();
      tex.translate(x, y);
      tex.tint(255, 170);
      tex.image(i % 2 === 0 ? imgA : imgB, 0, 0);
      tex.noTint();
      tex.fill(0, 100, 50, 74);
      tex.noStroke();
      tex.square(0, 0, 26);
      tex.pop();
    }

    tex.pop();
  }
}
