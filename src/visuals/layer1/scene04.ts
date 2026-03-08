import type { VisualRenderContext } from "../../types/render";
import { wrapWithBuffer } from "../shared/motion";

export class Scene04 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, imageStore } = ctx;
    if (!imageStore) return;
    if (!imageStore.has("crosswalk_sign") || !imageStore.has("curve_mirror")) return;

    const imgA = imageStore.get("crosswalk_sign");
    const imgB = imageStore.get("curve_mirror");
    const n = 8;
    const bufferRatio = 0.5;
    const span = tex.height * (1 + bufferRatio * 2);

    tex.push();
    tex.imageMode(p.CENTER);
    tex.rectMode(p.CENTER);

    for (let i = 0; i < n; i++) {
      const x = (tex.width * (i + 0.5)) / n;
      const phase = (span * i) / n;
      const y = wrapWithBuffer(tex.height, beat * 52.0 + phase, bufferRatio);

      tex.push();
      tex.translate(x, y);
      tex.tint(255, 175);
      tex.image(i % 2 === 0 ? imgA : imgB, 0, 0);
      tex.noTint();
      tex.fill(0, 100, 50, 72);
      tex.noStroke();
      tex.rect(0, 0, (tex.width / n) * 0.32, 108);
      tex.pop();
    }

    tex.pop();
  }
}
