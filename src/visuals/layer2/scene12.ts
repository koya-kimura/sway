import type { VisualRenderContext } from "../../types/render";

export class Scene12 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, imageStore } = ctx;
    if (!imageStore) return;
    if (!imageStore.has("height_limit_sign") || !imageStore.has("playground_stairs")) return;

    const imgA = imageStore.get("height_limit_sign");
    const imgB = imageStore.get("playground_stairs");

    tex.push();
    tex.imageMode(p.CENTER);
    tex.rectMode(p.CENTER);

    tex.noStroke();
    tex.fill(0, 100, 50, 65);
    tex.beginShape();
    tex.vertex(tex.width * 0.08, tex.height * 0.9);
    tex.vertex(tex.width * 0.28, tex.height * 0.12);
    tex.vertex(tex.width * 0.72, tex.height * 0.08);
    tex.vertex(tex.width * 0.92, tex.height * 0.84);
    tex.endShape(p.CLOSE);

    for (let i = 0; i < 9; i++) {
      const t = i / 8;
      const x = tex.width * (0.12 + t * 0.76) + Math.sin(beat * 0.11 + i) * 20;
      const y = tex.height * (0.84 - t * 0.64) + Math.cos(beat * 0.15 + i) * 16;

      tex.push();
      tex.translate(x, y);
      tex.tint(255, 168);
      tex.image(i % 2 === 0 ? imgA : imgB, 0, 0);
      tex.noTint();
      tex.fill(0, 100, 50, 84);
      tex.circle(0, 0, tex.width * 0.05);
      tex.pop();
    }

    tex.pop();
  }
}
