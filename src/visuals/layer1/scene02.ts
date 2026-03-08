import type { VisualRenderContext } from "../../types/render";

export class Scene02 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, imageStore } = ctx;
    if (!imageStore) return;
    if (!imageStore.has("bench") || !imageStore.has("utility_pole")) return;

    const imgA = imageStore.get("bench");
    const imgB = imageStore.get("utility_pole");
    const n = 7;

    tex.push();
    tex.imageMode(p.CENTER);
    tex.noStroke();

    for (let i = 0; i < n; i++) {
      const x = tex.width / 2 + Math.cos(beat * 0.18 + (i * Math.PI * 2) / n) * (tex.width * 0.24);
      const y = tex.height / 2 + Math.sin(beat * 0.2 + i * 0.6) * (tex.height * 0.18);

      tex.push();
      tex.translate(x, y);
      tex.tint(255, 180);
      tex.image(i % 2 === 0 ? imgA : imgB, 0, 0);
      tex.noTint();
      tex.fill(0, 100, 50, 70);
      tex.noStroke();
      tex.circle(0, 0, 34);
      tex.pop();
    }

    tex.pop();
  }
}
