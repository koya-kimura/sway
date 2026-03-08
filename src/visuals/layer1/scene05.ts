import type { VisualRenderContext } from "../../types/render";

export class Scene05 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, imageStore } = ctx;
    if (!imageStore) return;
    if (!imageStore.has("mailbox") || !imageStore.has("fire_extinguisher_box")) return;

    const imgA = imageStore.get("mailbox");
    const imgB = imageStore.get("fire_extinguisher_box");
    const n = 6;

    tex.push();
    tex.imageMode(p.CENTER);

    for (let i = 0; i < n; i++) {
      const angle = beat * 0.22 + (i * Math.PI * 2) / n;
      const radius = tex.height * 0.2 + Math.sin(beat * 0.32 + i) * 16;
      const x = tex.width / 2 + Math.cos(angle) * radius;
      const y = tex.height / 2 + Math.sin(angle) * radius;

      tex.push();
      tex.translate(x, y);
      tex.tint(255, 170);
      tex.image(i % 2 === 0 ? imgA : imgB, 0, 0);
      tex.noTint();
      tex.fill(0, 100, 50, 78);
      tex.noStroke();
      tex.triangle(-18, 18, 18, 18, 0, -20);
      tex.pop();
    }

    tex.pop();
  }
}
