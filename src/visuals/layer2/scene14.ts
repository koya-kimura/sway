import type { VisualRenderContext } from "../../types/render";

export class Scene14 {
  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, imageStore } = ctx;
    if (!imageStore) return;
    if (!imageStore.has("no_littering_sign") || !imageStore.has("tree_guard")) return;

    const imgA = imageStore.get("no_littering_sign");
    const imgB = imageStore.get("tree_guard");

    tex.push();
    tex.imageMode(p.CENTER);
    tex.rectMode(p.CENTER);

    tex.noStroke();
    tex.fill(0, 100, 50, 62);
    tex.ellipse(tex.width * 0.5, tex.height * 0.5, tex.width * 0.9, tex.height * 0.4);

    for (let i = 0; i < 12; i++) {
      const edge = i % 4;
      const t = (i % 3) / 2;
      let x = tex.width * 0.5;
      let y = tex.height * 0.5;

      if (edge === 0) {
        x = tex.width * (0.08 + t * 0.84);
        y = tex.height * 0.1;
      } else if (edge === 1) {
        x = tex.width * 0.92;
        y = tex.height * (0.14 + t * 0.72);
      } else if (edge === 2) {
        x = tex.width * (0.92 - t * 0.84);
        y = tex.height * 0.9;
      } else {
        x = tex.width * 0.08;
        y = tex.height * (0.86 - t * 0.72);
      }

      x += (tex.width * 0.5 - x) * 0.3 + Math.sin(beat * 0.09 + i) * 18;
      y += (tex.height * 0.5 - y) * 0.3 + Math.cos(beat * 0.12 + i) * 18;

      tex.push();
      tex.translate(x, y);
      tex.tint(255, 172);
      tex.image(i % 2 === 0 ? imgA : imgB, 0, 0);
      tex.noTint();
      tex.fill(0, 100, 50, 80);
      tex.circle(0, 0, tex.width * 0.046);
      tex.pop();
    }

    tex.pop();
  }
}
