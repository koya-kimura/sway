import type { VisualRenderContext } from "../../types/render";
import { wrapWithBuffer } from "../shared/motion";

export class Scene03 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, imageStore } = ctx;
    if (!imageStore) return;
    if (!imageStore.has("bollard") || !imageStore.has("traffic_cone")) return;

    const imgA = imageStore.get("bollard");
    const imgB = imageStore.get("traffic_cone");
    const n = 10;

    tex.push();
    tex.imageMode(p.CENTER);
    tex.stroke(0, 100, 50, 90);
    tex.strokeWeight(1.5);

    for (let i = 0; i < n; i++) {
      const loop = beat * 0.08 + i / n;
      const x = wrapWithBuffer(tex.width, loop * tex.width, 0.5);
      const y = tex.height * (i % 2 === 0 ? 0.36 : 0.64) + Math.sin(beat * 0.35 + i) * 28;

      tex.push();
      tex.translate(x, y);
      tex.tint(255, 165);
      tex.image(i % 2 === 0 ? imgA : imgB, 0, 0);
      tex.noTint();
      tex.line(-18, 26, 18, 26);
      tex.pop();
    }

    tex.pop();
  }
}
