import type { VisualRenderContext } from "../types/render";

export class Scene08 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, imageStore } = ctx;
    if (!imageStore) return;
    if (!imageStore.has("utility_pole") || !imageStore.has("water_fountain")) return;

    const imgA = imageStore.get("utility_pole");
    const imgB = imageStore.get("water_fountain");
    const n = 8;

    tex.push();
    tex.imageMode(p.CENTER);
    tex.noFill();

    for (let i = 0; i < n; i++) {
      const angle = beat * 0.18 + (i * Math.PI * 2) / n;
      const x = tex.width / 2 + Math.cos(angle) * (tex.width * 0.18 + i * 18);
      const y = tex.height / 2 + Math.sin(angle) * (tex.height * 0.18 + i * 14);

      tex.push();
      tex.translate(x, y);
      tex.tint(255, 165);
      tex.image(i % 2 === 0 ? imgA : imgB, 0, 0);
      tex.noTint();
      tex.stroke(0, 100, 50, 88);
      tex.strokeWeight(2);
      tex.arc(0, 0, 42, 42, 0, Math.PI * 1.25);
      tex.pop();
    }

    tex.pop();
  }
}
