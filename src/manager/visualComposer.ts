import p5 from "p5";
import type { APCMiniMK2Manager } from "../midi/apcmini_mk2/apcMiniMk2Manager"; // MIDIコントローラー管理クラス
import type { AudioMicManager } from "../utils/audio/audioMicManager"; // オーディオ入力管理クラス
import type { CaptureManager } from "../utils/capture/captureManager"; // カメラキャプチャ管理クラス
import type { ImageStore } from "../utils/image/imageStore"; // 画像ストア
import type { VideoStore } from "../utils/video/videoStore";
import {
  SCENE_LAYER1_SELECT_KEY,
  SCENE_LAYER2_SELECT_KEY,
  SCENE_LAYER3_SELECT_KEY,
  SCENE_LAYER4_SELECT_KEY,
  SCENE_LAYER5_SELECT_KEY,
} from "../midi/apcmini_mk2/config";

import { Scene01 } from "../visuals/layer1/scene01";
import { Scene02 } from "../visuals/layer1/scene02";
import { Scene03 } from "../visuals/layer1/scene03";
import { Scene04 } from "../visuals/layer1/scene04";
import { Scene05 } from "../visuals/layer1/scene05";
import { Scene06 } from "../visuals/layer1/scene06";
import { Scene07 } from "../visuals/layer1/scene07";
import { Scene09 } from "../visuals/layer2/scene09";
import { Scene10 } from "../visuals/layer2/scene10";
import { Scene11 } from "../visuals/layer2/scene11";
import { Scene12 } from "../visuals/layer2/scene12";
import { Scene13 } from "../visuals/layer2/scene13";
import { Scene14 } from "../visuals/layer2/scene14";
import { Scene15 } from "../visuals/layer2/scene15";
import { Scene16 } from "../visuals/layer3/scene16";
import { Scene17 } from "../visuals/layer3/scene17";
import { Scene18 } from "../visuals/layer3/scene18";
import { Scene19 } from "../visuals/layer3/scene19";
import { Scene20 } from "../visuals/layer3/scene20";
import { Scene21 } from "../visuals/layer3/scene21";
import { Scene22 } from "../visuals/layer3/scene22";
import { Scene23 } from "../visuals/layer4/scene23";
import { Scene24 } from "../visuals/layer4/scene24";
import { Scene25 } from "../visuals/layer4/scene25";
import { Scene26 } from "../visuals/layer4/scene26";
import { Scene27 } from "../visuals/layer4/scene27";
import { Scene28 } from "../visuals/layer4/scene28";
import { Scene29 } from "../visuals/layer4/scene29";
import { Scene30 } from "../visuals/layer5/scene30.ts";
import { Scene31 } from "../visuals/layer5/scene31.ts";
import { Scene32 } from "../visuals/layer5/scene32.ts";
import { Scene34 } from "../visuals/layer5/scene34";
import { Scene36 } from "../visuals/layer5/scene36";
import { Scene37 } from "../visuals/layer5/scene37";
import { VideoFillScene } from "../visuals/layer5/videoSceneBase";
import { SceneNone } from "../visuals/shared/sceneNone";

interface DrawableScene {
  draw(ctx: {
    p: p5;
    tex: p5.Graphics;
    midiManager: APCMiniMK2Manager;
    beat: number;
    audioManager?: AudioMicManager;
    captureManager?: CaptureManager;
    font?: p5.Font;
    imageStore?: ImageStore;
    videoStore?: VideoStore;
  }): void;
}

interface SceneLayerConfig {
  key: string;
  scenes: DrawableScene[];
}

/**
 * VisualComposer はレンダーターゲットとアクティブなビジュアル1つを管理する。
 */
export class VisualComposer {
  private renderTexture: p5.Graphics | undefined; // ビジュアル描画用のオフスクリーンキャンバス
  private readonly sceneLayers: SceneLayerConfig[];

  constructor() {
    this.renderTexture = undefined;

    const scene01 = new Scene01();
    const scene02 = new Scene02();
    const scene03 = new Scene03();
    const scene04 = new Scene04();
    const scene05 = new Scene05();
    const scene06 = new Scene06();
    const scene07 = new Scene07();
    const scene09 = new Scene09();
    const scene10 = new Scene10();
    const scene11 = new Scene11();
    const scene12 = new Scene12();
    const scene13 = new Scene13();
    const scene14 = new Scene14();
    const scene15 = new Scene15();
    const scene16 = new Scene16();
    const scene17 = new Scene17();
    const scene18 = new Scene18();
    const scene19 = new Scene19();
    const scene20 = new Scene20();
    const scene21 = new Scene21();
    const scene22 = new Scene22();
    const scene23 = new Scene23();
    const scene24 = new Scene24();
    const scene25 = new Scene25();
    const scene26 = new Scene26();
    const scene27 = new Scene27();
    const scene28 = new Scene28();
    const scene29 = new Scene29();
    const scene30 = new Scene30();
    const scene31 = new Scene31();
    const scene32 = new Scene32();
    const scene34 = new Scene34();
    const scene36 = new Scene36();
    const scene37 = new Scene37();
    const sceneNone = new SceneNone();

    this.sceneLayers = [
      {
        key: SCENE_LAYER1_SELECT_KEY,
        // Top layer: None + 7 scenes.
        scenes: [sceneNone, scene01, scene02, scene03, scene04, scene05, scene06, scene07],
      },
      {
        key: SCENE_LAYER2_SELECT_KEY,
        // Lower layer: None + dedicated slower scenes.
        scenes: [sceneNone, scene09, scene10, scene11, scene12, scene13, scene14, scene15],
      },
      {
        key: SCENE_LAYER3_SELECT_KEY,
        // Natural shape-motion layer: particles, ripples, and breathing forms.
        scenes: [sceneNone, scene16, scene17, scene18, scene19, scene20, scene21, scene22],
      },
      {
        key: SCENE_LAYER4_SELECT_KEY,
        // Decorative yellow layer inspired by flyer motifs.
        scenes: [sceneNone, scene23, scene24, scene25, scene26, scene27, scene28, scene29],
      },
      {
        key: SCENE_LAYER5_SELECT_KEY,
        // Front-packed: black, white, video1, video3, video5, video6.
        scenes: [scene30, scene31, scene32, scene34, scene36, scene37],
      },
    ];
  }

  /**
   * ビジュアル描画用の `p5.Graphics` を生成する。
   *
   * @param p p5 インスタンス。
   */
  init(p: p5): void {
    this.renderTexture = p.createGraphics(p.width, p.height);
  }

  /**
   * ビジュアル描画結果を保持している `p5.Graphics` を返す。
   *
   * @returns ビジュアルテクスチャ。
   * @throws Error 初期化前に呼び出された場合。
   */
  getTexture(): p5.Graphics {
    if (!this.renderTexture) {
      throw new Error("Render texture not initialized");
    }
    return this.renderTexture;
  }

  /**
   * テクスチャが初期化されていることを保証する。
   *
   * @returns テクスチャ。
   * @throws Error 初期化されていない場合。
   */
  private ensureTexture(): p5.Graphics {
    if (!this.renderTexture) {
      throw new Error("Render texture not initialized");
    }
    return this.renderTexture;
  }

  /**
   * ビジュアルの更新処理。
   *
   * @param _p p5 インスタンス。
   * @param _midiManager MIDI 状態。
   * @param _beat 現在のビート。
   * @param _audioManager オーディオマネージャー。
   * @param _captureManager キャプチャマネージャー。
   * @param _font フォント。
   */
  update(
    _p: p5,
    _midiManager: APCMiniMK2Manager,
    _beat: number,
    _audioManager?: AudioMicManager,
    _captureManager?: CaptureManager,
    _font?: p5.Font,
    _imageStore?: ImageStore,
    _videoStore?: VideoStore,
  ): void { }

  /**
   * ビジュアルを描画する。
   *
   * @param _p p5 インスタンス。
   * @param _midiManager MIDI 状態。
   * @param _beat 現在のビート。
   * @param _audioManager オーディオマネージャー。
   * @param _captureManager キャプチャマネージャー。
   * @param _font フォント。
   */
  draw(
    _p: p5,
    _midiManager: APCMiniMK2Manager,
    _beat: number,
    _audioManager?: AudioMicManager,
    _captureManager?: CaptureManager,
    _font?: p5.Font,
    _imageStore?: ImageStore,
    _videoStore?: VideoStore,
  ): void {
    const tex = this.ensureTexture();
    const ctx = {
      p: _p,
      tex,
      midiManager: _midiManager,
      beat: _beat,
      audioManager: _audioManager,
      captureManager: _captureManager,
      font: _font,
      imageStore: _imageStore,
      videoStore: _videoStore,
    };

    tex.push();
    tex.background(0);

    // Draw from bottom to top so higher layer numbers stay behind layer1.
    for (let i = this.sceneLayers.length - 1; i >= 0; i--) {
      const layer = this.sceneLayers[i];
      const selectedIndex = this.resolveLayerIndex(
        _midiManager.midiInput[layer.key],
        layer.scenes.length,
      );

      if (layer.key !== SCENE_LAYER5_SELECT_KEY) {
        layer.scenes[selectedIndex]?.draw(ctx);
        continue;
      }

      if (_videoStore) {
        const activeVideoKeys: string[] = [];
        const currentScene = layer.scenes[selectedIndex];
        if (currentScene instanceof VideoFillScene) {
          activeVideoKeys.push(currentScene.getVideoKey());
        }
        _videoStore.playOnly(activeVideoKeys);
      }
      layer.scenes[selectedIndex]?.draw(ctx);
    }

    tex.pop();
  }

  private resolveLayerIndex(value: unknown, length: number): number {
    if (typeof value !== "number" || !Number.isFinite(value) || length <= 0) {
      return 0;
    }
    const clamped = Math.max(0, Math.floor(value));
    return Math.min(length - 1, clamped);
  }

  /**
   * ウィンドウリサイズに合わせてテクスチャのサイズを更新する。
   *
   * @param p p5 インスタンス。
   */
  resize(p: p5): void {
    const texture = this.ensureTexture();
    texture.resizeCanvas(p.width, p.height);
  }

  /**
   * リソースを解放する。
   */
  dispose(): void {
    this.renderTexture?.remove();
    this.renderTexture = undefined;
  }
}