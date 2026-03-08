import type { VisualRenderContext } from "../../types/render";

export class Scene09 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, imageStore } = ctx;
    if (!imageStore) return;
    if (!imageStore.has("curve_mirror") || !imageStore.has("underpass")) return;

    const imgA = imageStore.get("curve_mirror");
    const imgB = imageStore.get("underpass");

    tex.push();
    tex.imageMode(p.CENTER);
    tex.rectMode(p.CENTER);

    tex.noStroke();
    tex.fill(0, 100, 50, 70);
    tex.ellipse(tex.width * 0.5, tex.height * 0.55, tex.width * 0.86, tex.height * 0.58);

    for (let i = 0; i < 5; i++) {
      const x = tex.width * (0.2 + i * 0.16) + Math.sin(beat * 0.14 + i * 0.7) * 26;
      const y = tex.height * (0.52 + Math.sin(beat * 0.1 + i) * 0.12);
      tex.push();
      tex.translate(x, y);
      tex.tint(255, 182);
      tex.image(i % 2 === 0 ? imgA : imgB, 0, 0);
      tex.noTint();
      tex.fill(0, 100, 50, 90);
      tex.circle(0, 0, tex.width * 0.06);
      tex.pop();
    }

    tex.pop();
  }
}
