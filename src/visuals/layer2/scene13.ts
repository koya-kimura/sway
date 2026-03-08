import type { VisualRenderContext } from "../../types/render";

export class Scene13 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, imageStore } = ctx;
    if (!imageStore) return;
    if (!imageStore.has("mailbox") || !imageStore.has("slide")) return;

    const imgA = imageStore.get("mailbox");
    const imgB = imageStore.get("slide");

    tex.push();
    tex.imageMode(p.CENTER);
    tex.rectMode(p.CENTER);

    const pulse = 0.5 + 0.5 * Math.sin(beat * 0.12);
    tex.noFill();
    tex.stroke(0, 100, 50, 90);
    tex.strokeWeight(1.2);
    tex.rect(tex.width * 0.5, tex.height * 0.5, tex.width * (0.7 + pulse * 0.14), tex.height * 0.58);
    tex.rect(tex.width * 0.5, tex.height * 0.5, tex.width * 0.4, tex.height * (0.74 + pulse * 0.1));

    for (let i = 0; i < 10; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const lane = Math.floor(i / 2);
      const x = tex.width * 0.5 + side * tex.width * (0.12 + lane * 0.09);
      const y = tex.height * (0.18 + lane * 0.12) + Math.sin(beat * 0.1 + i) * 14;

      tex.push();
      tex.translate(x, y);
      tex.tint(255, 176);
      tex.image(i % 2 === 0 ? imgA : imgB, 0, 0);
      tex.noTint();
      tex.fill(0, 100, 50, 70);
      tex.rect(0, 0, tex.width * 0.038, tex.height * 0.05);
      tex.pop();
    }

    tex.pop();
  }
}
