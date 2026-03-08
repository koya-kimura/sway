import type { VisualRenderContext } from "../../types/render";

/**
 * obj 画像を使ったサンプルシーン。
 * ビートに合わせて画像が浮遊・回転し、音量で拡縮する。
 */
export class Scene01 {
        draw(ctx: VisualRenderContext): void {
                const { p, tex, beat, imageStore } = ctx;
                if (!imageStore) return;
                if (!imageStore.has("accident_info_sign") || !imageStore.has("street_tree")) return;

                const imgA = imageStore.get("accident_info_sign");
                const imgB = imageStore.get("street_tree");

                tex.push();
                tex.imageMode(p.CENTER);
                tex.rectMode(p.CENTER);

                for (let i = 0; i < 6; i++) {
                        const x = tex.width * (0.15 + i * 0.14) + Math.sin(beat * 0.35 + i) * 36;
                        const y = tex.height * 0.55 + Math.cos(beat * 0.22 + i * 0.5) * 42;

                        tex.push();
                        tex.translate(x, y);
                        tex.tint(255, 170);
                        tex.image(i % 2 === 0 ? imgA : imgB, 0, 0);
                        tex.noTint();
                        tex.fill(0, 100, 50, 85);
                        tex.noStroke();
                        tex.rect(0, 34, 22, tex.height * 0.22);
                        tex.pop();
                }

                tex.pop();
        }
}
