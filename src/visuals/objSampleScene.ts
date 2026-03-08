import type { VisualRenderContext } from "../types/render";
import { fract, map, zigzag } from "../utils/math/mathUtils";
import { ALL_OBJ_IMAGE_KEYS } from "./config/sceneAssets";

/**
 * obj 画像を使ったサンプルシーン。
 * ビートに合わせて画像が浮遊・回転し、音量で拡縮する。
 */
export class ObjSampleScene {
    draw(ctx: VisualRenderContext): void {
        const { tex, beat, audioManager, imageStore } = ctx;
        if (!imageStore) return;

        const volume = audioManager?.getVolume() || 0;
        const baseSize = Math.min(tex.width, tex.height) * 0.15;
        const count = ALL_OBJ_IMAGE_KEYS.length;

        tex.push();
        tex.imageMode(tex.CENTER);

        for (let i = 0; i < count; i++) {
            const img = imageStore.has(ALL_OBJ_IMAGE_KEYS[i])
                ? imageStore.get(ALL_OBJ_IMAGE_KEYS[i])
                : null;
            if (!img) continue;

            // 各画像を円状に配置し、ビートで回転
            const angle = (i / count) * Math.PI * 2 + beat * 0.3;
            const radius = Math.min(tex.width, tex.height) * 0.25;
            const x = tex.width / 2 + Math.cos(angle) * radius;
            const y = tex.height / 2 + Math.sin(angle) * radius;

            // 音量でサイズを拡縮、ビートで個別に脈動
            const pulse = zigzag(beat + i * 0.4);
            const size = baseSize * map(volume, 0, 1, 0.8, 1.5) * map(pulse, 0, 1, 0.85, 1.15);

            // 画像ごとに微妙な回転
            const rotation = Math.sin(beat * 0.5 + i) * 0.15;

            // 透明度をビートに連動
            const alpha = map(fract(beat * 0.25 + i / count), 0, 1, 180, 255);

            tex.push();
            tex.translate(x, y);
            tex.rotate(rotation);
            tex.tint(255, alpha);
            tex.image(img, 0, 0, size, size * (img.height / img.width));
            tex.pop();
        }

        tex.pop();
    }
}
