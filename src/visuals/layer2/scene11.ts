import type { VisualRenderContext } from "../../types/render";

export class Scene11 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, imageStore } = ctx;
    if (!imageStore) return;
    if (!imageStore.has("water_fountain") || !imageStore.has("street_tree")) return;

    const imgA = imageStore.get("water_fountain");
    const imgB = imageStore.get("street_tree");

    tex.push();
    tex.imageMode(p.CENTER);
    tex.rectMode(p.CENTER);

    for (let col = 0; col < 7; col++) {
      const x = tex.width * (0.1 + col * 0.13);
      const wave = Math.sin(beat * 0.09 + col * 0.7) * tex.height * 0.08;

      tex.noStroke();
      tex.fill(0, 100, 50, 58);
      tex.rect(x, tex.height * 0.5, tex.width * 0.08, tex.height * 0.84 + wave * 0.2);

      for (let row = 0; row < 4; row++) {
        const y = tex.height * (0.2 + row * 0.2) + wave + Math.cos(beat * 0.14 + row + col) * 12;
        tex.push();
        tex.translate(x, y);
        tex.tint(255, 174);
        tex.image((row + col) % 2 === 0 ? imgA : imgB, 0, 0);
        tex.noTint();
        tex.pop();
      }
    }

    tex.pop();
  }
}
