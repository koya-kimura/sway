import type { VisualRenderContext } from "../../types/render";

export class Scene15 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, imageStore } = ctx;
    if (!imageStore) return;
    if (!imageStore.has("school_crossing_sign") || !imageStore.has("pole_cushion")) return;

    const imgA = imageStore.get("school_crossing_sign");
    const imgB = imageStore.get("pole_cushion");

    tex.push();
    tex.imageMode(p.CENTER);
    tex.rectMode(p.CENTER);

    tex.noFill();
    tex.stroke(0, 100, 50, 96);
    tex.strokeWeight(1.6);
    tex.arc(
      tex.width * 0.5,
      tex.height * 0.52,
      tex.width * 0.86,
      tex.height * 0.72,
      0,
      Math.PI * 2,
    );

    for (let i = 0; i < 10; i++) {
      const phase = beat * 0.07 + i * 0.6;
      const radius = tex.width * (0.18 + (i % 5) * 0.08);
      const x = tex.width * 0.5 + Math.cos(phase) * radius * 0.9;
      const y = tex.height * 0.52 + Math.sin(phase * 0.9) * radius * 0.55;

      tex.push();
      tex.translate(x, y);
      tex.tint(255, 176);
      tex.image(i % 2 === 0 ? imgA : imgB, 0, 0);
      tex.noTint();
      tex.fill(0, 100, 50, 74);
      tex.square(0, 0, tex.width * 0.04);
      tex.pop();
    }

    tex.pop();
  }
}
