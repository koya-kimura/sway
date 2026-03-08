import { OBJ_IMAGE_KEYS } from "../../utils/image/imageStore";

/**
 * 全シーンで利用可能な obj 画像キー。
 */

export const ALL_OBJ_IMAGE_KEYS = OBJ_IMAGE_KEYS;

export const SCENE_IMAGE_KEYS = [
	"accident_info_sign",
	"bench",
	"bollard",
	"crosswalk_sign",
	"mailbox",
	"slide",
	"traffic_cone",
	"utility_pole",
] as const;
