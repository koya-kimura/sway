import p5 from "p5";

/**
 * obj 画像のパス定義。キーはファイル名から拡張子を除いたもの。
 */
export const OBJ_IMAGE_PATHS: Record<string, string> = {
    accident_info_sign: "/image/obj/accident_info_sign.png",
    bench: "/image/obj/bench.png",
    bollard: "/image/obj/bollard.png",
    bollard_light: "/image/obj/bollard_light.png",
    crosswalk_sign: "/image/obj/crosswalk_sign.png",
    curve_mirror: "/image/obj/curve_mirror.png",
    curve_mirror_2: "/image/obj/curve_mirror_2.png",
    delineator: "/image/obj/delineator.png",
    fire_extinguisher_box: "/image/obj/fire_extinguisher_box.png",
    garbage_net: "/image/obj/garbage_net.png",
    height_limit_sign: "/image/obj/height_limit_sign.png",
    mailbox: "/image/obj/mailbox.png",
    no_littering_sign: "/image/obj/no_littering_sign.png",
    playground_stairs: "/image/obj/playground_stairs.png",
    pole_cushion: "/image/obj/pole_cushion.png",
    school_crossing_sign: "/image/obj/school_crossing_sign.png",
    slide: "/image/obj/slide.png",
    sluice_valve: "/image/obj/sluice_valve.png",
    street_tree: "/image/obj/street_tree.png",
    traffic_cone: "/image/obj/traffic_cone.png",
    tree_guard: "/image/obj/tree_guard.png",
    underpass: "/image/obj/underpass.png",
    utility_pole: "/image/obj/utility_pole.png",
    water_fountain: "/image/obj/water_fountain.png",
};

/**
 * 利用可能な obj 画像キーの一覧。
 */
export const OBJ_IMAGE_KEYS: string[] = Object.keys(OBJ_IMAGE_PATHS);

/**
 * obj 画像のプリロードとパスキーでの取得を提供するストア。
 */
export class ImageStore {
    private images: Map<string, p5.Image> = new Map();

    /**
     * 全ての obj 画像を並列にロードする。
     *
     * @param p p5 インスタンス。
     */
    async load(p: p5): Promise<void> {
        const entries = Object.entries(OBJ_IMAGE_PATHS);
        const loadPromises: Promise<void>[] = [];

        for (const [key, path] of entries) {
            const promise = new Promise<void>((resolve) => {
                p.loadImage(
                    path,
                    (img) => {
                        this.images.set(key, img);
                        resolve();
                    },
                    () => {
                        console.warn(`Failed to load image: ${path}`);
                        resolve();
                    },
                );
            });
            loadPromises.push(promise);
        }

        await Promise.all(loadPromises);
        console.log(`Loaded ${this.images.size} obj images`);
    }

    /**
     * キーに対応する画像を返す。
     *
     * @param key 画像キー（例: "traffic_cone"）。
     * @returns p5.Image インスタンス。
     * @throws Error キーが存在しない場合。
     */
    get(key: string): p5.Image {
        const img = this.images.get(key);
        if (!img) {
            throw new Error(`Image not found: "${key}"`);
        }
        return img;
    }

    /**
     * 指定したキーの画像がロード済みかどうかを返す。
     *
     * @param key 画像キー。
     * @returns ロード済みなら true。
     */
    has(key: string): boolean {
        return this.images.has(key);
    }

    /**
     * ロード済みの全キーを返す。
     *
     * @returns キーの配列。
     */
    keys(): string[] {
        return Array.from(this.images.keys());
    }
}
