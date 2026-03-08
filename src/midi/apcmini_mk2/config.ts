/**
 * MIDI設定ファイル
 * APC Mini MK2のボタン・セルの設定を定義します。
 */
import type { ButtonConfig, FaderButtonMode } from "../../types";
import { LED_PALETTE } from "./ledPalette";

export const UI_SELECT_KEY = "uiSelect";
export const UI_MASK_SELECT_KEY = "uiMaskSelect";
export const SCENE_LAYER1_SELECT_KEY = "sceneLayer1Select";
export const SCENE_LAYER2_SELECT_KEY = "sceneLayer2Select";
export const SCENE_LAYER3_SELECT_KEY = "sceneLayer3Select";
export const SCENE_LAYER4_SELECT_KEY = "sceneLayer4Select";
export const SCENE_LAYER5_SELECT_KEY = "sceneLayer5Select";

// ========================================
// ボタン設定
// ========================================

/**
 * グリッドボタンの設定
 * 必要に応じてページ・行・列を指定してボタンを登録してください。
 */
export const MIDI_BUTTON_CONFIGS: ButtonConfig[] = [
  {
    key: UI_SELECT_KEY,
    type: "radio",
    cells: [
      { page: 0, row: 0, col: 0 },
      { page: 0, row: 0, col: 1 },
      { page: 0, row: 0, col: 2 },
      { page: 0, row: 0, col: 3 },
      { page: 0, row: 0, col: 4 },
      { page: 0, row: 0, col: 5 },
      { page: 0, row: 0, col: 6 },
      { page: 0, row: 0, col: 7 },
    ],
    defaultValue: 1,
    activeColor: LED_PALETTE.GREEN,
    inactiveColor: LED_PALETTE.DIM,
  },
  {
    key: UI_MASK_SELECT_KEY,
    type: "radio",
    cells: [
      { page: 0, row: 1, col: 0 },
      { page: 0, row: 1, col: 1 },
      { page: 0, row: 1, col: 2 },
      { page: 0, row: 1, col: 3 },
      { page: 0, row: 1, col: 4 },
      { page: 0, row: 1, col: 5 },
      { page: 0, row: 1, col: 6 },
      { page: 0, row: 1, col: 7 },
    ],
    defaultValue: 0,
    activeColor: LED_PALETTE.RED,
    inactiveColor: LED_PALETTE.DIM,
  },
  {
    key: SCENE_LAYER1_SELECT_KEY,
    type: "radio",
    cells: [
      { page: 0, row: 2, col: 0 },
      { page: 0, row: 2, col: 1 },
      { page: 0, row: 2, col: 2 },
      { page: 0, row: 2, col: 3 },
      { page: 0, row: 2, col: 4 },
      { page: 0, row: 2, col: 5 },
      { page: 0, row: 2, col: 6 },
      { page: 0, row: 2, col: 7 },
    ],
    defaultValue: 0,
    activeColor: LED_PALETTE.CYAN,
    inactiveColor: LED_PALETTE.DIM,
  },
  {
    key: SCENE_LAYER2_SELECT_KEY,
    type: "radio",
    cells: [
      { page: 0, row: 3, col: 0 },
      { page: 0, row: 3, col: 1 },
      { page: 0, row: 3, col: 2 },
      { page: 0, row: 3, col: 3 },
      { page: 0, row: 3, col: 4 },
      { page: 0, row: 3, col: 5 },
      { page: 0, row: 3, col: 6 },
      { page: 0, row: 3, col: 7 },
    ],
    defaultValue: 0,
    activeColor: LED_PALETTE.YELLOW,
    inactiveColor: LED_PALETTE.DIM,
  },
  {
    key: SCENE_LAYER3_SELECT_KEY,
    type: "radio",
    cells: [
      { page: 0, row: 4, col: 0 },
      { page: 0, row: 4, col: 1 },
      { page: 0, row: 4, col: 2 },
      { page: 0, row: 4, col: 3 },
      { page: 0, row: 4, col: 4 },
      { page: 0, row: 4, col: 5 },
      { page: 0, row: 4, col: 6 },
      { page: 0, row: 4, col: 7 },
    ],
    defaultValue: 0,
    activeColor: LED_PALETTE.BLUE,
    inactiveColor: LED_PALETTE.DIM,
  },
  {
    key: SCENE_LAYER4_SELECT_KEY,
    type: "radio",
    cells: [
      { page: 0, row: 5, col: 0 },
      { page: 0, row: 5, col: 1 },
      { page: 0, row: 5, col: 2 },
      { page: 0, row: 5, col: 3 },
      { page: 0, row: 5, col: 4 },
      { page: 0, row: 5, col: 5 },
      { page: 0, row: 5, col: 6 },
      { page: 0, row: 5, col: 7 },
    ],
    defaultValue: 0,
    activeColor: LED_PALETTE.ORANGE,
    inactiveColor: LED_PALETTE.DIM,
  },
  {
    key: SCENE_LAYER5_SELECT_KEY,
    type: "radio",
    cells: [
      { page: 0, row: 6, col: 0 },
      { page: 0, row: 6, col: 1 },
      { page: 0, row: 6, col: 2 },
      { page: 0, row: 6, col: 3 },
      { page: 0, row: 6, col: 4 },
      { page: 0, row: 6, col: 5 },
    ],
    defaultValue: 0,
    activeColor: LED_PALETTE.PINK,
    inactiveColor: LED_PALETTE.DIM,
  },
];

// ========================================
// フェーダーボタンモード設定
// ========================================

/**
 * フェーダーボタンのモード
 * - "mute": フェーダーボタンON時、フェーダー値を0にミュート
 * - "random": フェーダーボタンON時、フェーダー値をBPM同期でランダムに0/1切り替え
 */
export const FADER_BUTTON_MODE: FaderButtonMode = "random";

// ========================================
// デフォルト値設定
// MIDI接続なしで使用する場合の初期値
// ========================================

/**
 * フェーダーのデフォルト値（9本分: 0-7 + マスター）
 * 値は0.0～1.0の範囲
 */
export const DEFAULT_FADER_VALUES: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * フェーダーボタンのデフォルトトグル状態（9本分）
 * true = ON（ミュートまたはランダム有効）
 */
export const DEFAULT_FADER_BUTTON_TOGGLE_STATE: boolean[] = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

/**
 * サイドボタン（ページ選択）のデフォルトインデックス
 * 0-7の範囲（ページ0～7）
 */
export const DEFAULT_PAGE_INDEX: number = 0;
