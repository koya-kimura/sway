import type { VisualRenderContext } from "../../types/render";

export class Scene06 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, imageStore } = ctx;
    if (!imageStore) return;
    if (!imageStore.has("slide") || !imageStore.has("playground_stairs")) return;

    const imgA = imageStore.get("slide");
    const imgB = imageStore.get("playground_stairs");
    const n = 9;

    tex.push();
    tex.imageMode(p.CENTER);
    tex.noStroke();

    for (let i = 0; i < n; i++) {
      const x = (tex.width * (i + 0.5)) / n;
      const y = tex.height / 2 + Math.sin(beat * 0.4 + i * 0.5) * (tex.height * 0.2);

      tex.push();
      tex.translate(x, y);
      tex.tint(255, 165);
      tex.image(i % 2 === 0 ? imgA : imgB, 0, 0);
      tex.noTint();
      tex.fill(0, 100, 50, 68);
      tex.ellipse(0, 0, 26, 64);
      tex.pop();
    }

    tex.pop();
  }
}
