import type { VisualRenderContext } from "../../types/render";

export class Scene10 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, imageStore } = ctx;
    if (!imageStore) return;
    if (!imageStore.has("delineator") || !imageStore.has("utility_pole")) return;

    const imgA = imageStore.get("delineator");
    const imgB = imageStore.get("utility_pole");

    tex.push();
    tex.imageMode(p.CENTER);
    tex.rectMode(p.CENTER);

    tex.noFill();
    tex.stroke(0, 100, 50, 90);
    tex.strokeWeight(1.4);
    for (let k = 0; k < 4; k++) {
      const r = tex.width * (0.2 + k * 0.14) + Math.sin(beat * 0.12 + k) * 18;
      tex.circle(tex.width * 0.5, tex.height * 0.5, r);
    }

    for (let i = 0; i < 8; i++) {
      const a = beat * 0.08 + (i / 8) * Math.PI * 2.0;
      const r = tex.height * 0.34 + Math.sin(beat * 0.16 + i) * 30;
      const x = tex.width * 0.5 + Math.cos(a) * r;
      const y = tex.height * 0.5 + Math.sin(a) * r * 0.7;

      tex.push();
      tex.translate(x, y);
      tex.tint(255, 170);
      tex.image(i % 2 === 0 ? imgA : imgB, 0, 0);
      tex.noTint();
      tex.fill(0, 100, 50, 72);
      tex.square(0, 0, tex.width * 0.04);
      tex.pop();
    }

    tex.pop();
  }
}
