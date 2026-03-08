import p5 from "p5";
import { APCMiniMK2Manager } from "../midi/apcmini_mk2/apcMiniMk2Manager"; // MIDIコントローラー管理クラス

/**
 * EffectManager はポストエフェクト用のシェーダーを読み込み、描画パイプラインへ適用する。
 */
export class EffectManager {
  private shader: p5.Shader | undefined;
  private feedbackTexture: p5.Graphics | undefined;

  constructor() {
    this.shader = undefined; // シェーダーを未初期化状態で保持
    this.feedbackTexture = undefined;
  }

  private ensureFeedbackTexture(p: p5): p5.Graphics {
    const existing = this.feedbackTexture;
    if (existing && existing.width === p.width && existing.height === p.height) {
      return existing;
    }

    existing?.remove();
    const texture = p.createGraphics(p.width, p.height);
    texture.push();
    texture.background(0);
    texture.pop();
    this.feedbackTexture = texture;
    return texture;
  }

  /**
   * シェーダーソースから `p5.Shader` を生成し、以降の描画で利用できるよう保持する。
   *
   * @param p p5 インスタンス。
   * @param vertSource 頂点シェーダーの GLSL ソース文字列。
   * @param fragSource フラグメントシェーダーの GLSL ソース文字列。
   */
  load(p: p5, vertSource: string, fragSource: string): void {
    try {
      // シェーダーを作成
      this.shader = p.createShader(vertSource, fragSource);
      if (!this.shader) {
        throw new Error("Shader creation failed");
      }
    } catch (error) {
      console.error("Shader loading failed", error);
      alert("Shader compilation failed. Effects will be disabled.");
      this.shader = undefined; // エラー時はシェーダーを無効化
    }
  }

  /**
   * 保持しているシェーダーをアクティブ化し、Uniform を設定した上でフルスクリーンポリゴンを描画する。
   *
   * @param p p5 インスタンス。
   * @param _midiManager MIDI 状態（将来的な Uniform 連携向け）。
   * @param beat 現在のビート値。
   * @param sourceTexture シーンが描画されたレンダーテクスチャ。
   * @param _uiTexture UI オーバーレイ（未使用だが将来的に活用予定）。
   */
  apply(
    p: p5,
    _midiManager: APCMiniMK2Manager,
    beat: number,
    sourceTexture: p5.Graphics,
    uiTexture: p5.Graphics,
    uiMaskTexture: p5.Graphics,
  ): void {
    const feedbackTexture = this.ensureFeedbackTexture(p);

    if (!this.shader) {
      // シェーダーがない場合は直接テクスチャを描画
      p.image(sourceTexture, 0, 0, p.width, p.height);
      feedbackTexture.clear();
      feedbackTexture.image(sourceTexture, 0, 0, p.width, p.height);
      return;
    }

    try {
      const faders = _midiManager.faderValues;
      const faderA = [faders[0] ?? 0, faders[1] ?? 0, faders[2] ?? 0, faders[3] ?? 0];
      const faderB = [faders[4] ?? 0, faders[5] ?? 0, faders[6] ?? 0, faders[7] ?? 0];
      const faderMaster = faders[8] ?? 0;

      // シェーダーを適用
      p.shader(this.shader);
      // Uniform変数を設定
      this.shader.setUniform("u_tex", sourceTexture);
      this.shader.setUniform("u_prev_tex", feedbackTexture);
      this.shader.setUniform("ui_tex", uiTexture);
      this.shader.setUniform("ui_mask_tex", uiMaskTexture);
      this.shader.setUniform("u_resolution", [p.width, p.height]);
      this.shader.setUniform("u_time", p.millis() / 1000.0);
      this.shader.setUniform("u_beat", beat);
      this.shader.setUniform("u_faderA", faderA);
      this.shader.setUniform("u_faderB", faderB);
      this.shader.setUniform("u_faderMaster", faderMaster);
      // フルスクリーン矩形を描画
      p.rect(0, 0, p.width, p.height);
      p.resetShader(); // シェーダーをリセット

      // Capture final frame for next-frame feedback effect.
      feedbackTexture.clear();
      feedbackTexture.image(sourceTexture, 0, 0, p.width, p.height);
    } catch (error) {
      console.error("Shader application failed", error);
      // エラー時は直接テクスチャを描画
      p.resetShader();
      p.image(sourceTexture, 0, 0, p.width, p.height);
      feedbackTexture.clear();
      feedbackTexture.image(sourceTexture, 0, 0, p.width, p.height);
    }
  }
}
