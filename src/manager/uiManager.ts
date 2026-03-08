import p5 from "p5";
import type { VisualRenderContext } from "../types/render"; // 描画コンテキストの型定義
import type { UIDrawFunction } from "../ui/uiDrawers"; // UI描画関数の型定義
import {
  uiNone,
  uiSwayColumnsDrift,
  uiSwayGrid,
  uiSwayRowsAligned,
  uiSwayScatter,
  uiWordsDrift,
  uiWordsGrid,
  uiWordsRowsAligned,
} from "../ui/uiDrawers"; // UI描画関数の実装
import type { UIMaskDrawFunction } from "../ui/uiMaskDrawers";
import {
  uiMaskCenterSmall,
  uiMaskCenterTall,
  uiMaskCenterWide,
  uiMaskFrameHole,
  uiMaskFull,
  uiMaskQuadWindows,
  uiMaskTwinHorizontal,
  uiMaskTwinVertical,
} from "../ui/uiMaskDrawers";
import { UI_MASK_SELECT_KEY, UI_SELECT_KEY } from "../midi/apcmini_mk2/config";

// UI描画関数の配列。MIDI入力に基づいて選択される。
const UI_DRAWERS: readonly UIDrawFunction[] = [
  uiNone,
  uiWordsDrift,
  uiWordsGrid,
  uiWordsRowsAligned,
  uiSwayScatter,
  uiSwayGrid,
  uiSwayColumnsDrift,
  uiSwayRowsAligned,
];

const UI_MASK_DRAWERS: readonly UIMaskDrawFunction[] = [
  uiMaskFull,
  uiMaskCenterSmall,
  uiMaskCenterTall,
  uiMaskCenterWide,
  uiMaskTwinVertical,
  uiMaskTwinHorizontal,
  uiMaskQuadWindows,
  uiMaskFrameHole,
];

/**
 * UIManager は UI オーバーレイ用の `p5.Graphics` を管理する。
 */
export class UIManager {
  private renderTexture: p5.Graphics | undefined;
  private maskTexture: p5.Graphics | undefined;
  private activePatternIndex: number;
  private activeMaskPatternIndex: number;

  constructor() {
    this.renderTexture = undefined;
    this.maskTexture = undefined;
    this.activePatternIndex = 0;
    this.activeMaskPatternIndex = 0;
  }

  /**
   * UI 描画用の `p5.Graphics` を生成する。
   *
   * @param p p5 インスタンス。
   */
  init(p: p5): void {
    this.renderTexture = p.createGraphics(p.width, p.height);
    this.maskTexture = p.createGraphics(p.width, p.height);
  }

  /**
   * UI 描画結果を保持している `p5.Graphics` を返す。
   *
   * @returns UI オーバーレイのテクスチャ。
   * @throws Error 初期化前に呼び出された場合。
   */
  getTexture(): p5.Graphics {
    const texture = this.renderTexture;
    if (!texture) {
      throw new Error("Texture not initialized");
    }
    return texture;
  }

  getMaskTexture(): p5.Graphics {
    const texture = this.maskTexture;
    if (!texture) {
      throw new Error("Mask texture not initialized");
    }
    return texture;
  }

  /**
   * ウィンドウリサイズに合わせてテクスチャのサイズを更新する。
   *
   * @param p p5 インスタンス。
   */
  resize(p: p5): void {
    const texture = this.renderTexture;
    const maskTexture = this.maskTexture;
    if (!texture || !maskTexture) {
      throw new Error("Texture not initialized");
    }
    texture.resizeCanvas(p.width, p.height);
    maskTexture.resizeCanvas(p.width, p.height);
  }

  update(_p: p5): void { }

  /**
   * UI 描画を行い、MIDI の状態に応じたパターンを選択する。
   *
   * @param context 描画コンテキスト。
   */
  draw(context: VisualRenderContext): void {
    const texture = this.renderTexture;
    const maskTexture = this.maskTexture;
    if (!texture || !maskTexture) {
      throw new Error("Texture not initialized");
    }

    this.activePatternIndex = this.normalizePatternIndex(
      context.midiManager.midiInput[UI_SELECT_KEY] as number | undefined,
      UI_DRAWERS.length,
    );
    this.activeMaskPatternIndex = this.normalizePatternIndex(
      context.midiManager.midiInput[UI_MASK_SELECT_KEY] as number | undefined,
      UI_MASK_DRAWERS.length,
    );

    texture.push();
    texture.clear();
    const uiContext: VisualRenderContext = {
      ...context,
      tex: texture,
    };
    const drawer = UI_DRAWERS[this.activePatternIndex] ?? UI_DRAWERS[0];
    drawer(uiContext);

    texture.pop();

    maskTexture.push();
    maskTexture.clear();
    const maskContext: VisualRenderContext = {
      ...context,
      tex: maskTexture,
    };
    const maskDrawer = UI_MASK_DRAWERS[this.activeMaskPatternIndex] ?? UI_MASK_DRAWERS[0];
    maskDrawer(maskContext);
    maskTexture.pop();
  }

  /**
   * パターンインデックスを範囲内に収める。
   *
   * @param value MIDI から渡されたインデックス値。
   * @returns 有効なインデックス。
   */
  private normalizePatternIndex(value: number | undefined, length: number): number {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return 0;
    }
    const clamped = Math.max(0, Math.floor(value));
    return Math.min(length - 1, clamped);
  }
}
