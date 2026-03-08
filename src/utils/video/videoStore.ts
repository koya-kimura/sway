import p5 from "p5";

export const VIDEO_PATHS: Record<string, string> = {
  video1: "/video/1.mp4",
  video2: "/video/2.mp4",
  video3: "/video/3.mp4",
  video4: "/video/4.mp4",
  video5: "/video/5.mp4",
  video6: "/video/6.mp4",
};

export class VideoStore {
  private videos: Map<string, p5.MediaElement> = new Map();
  private readyVideos: Set<string> = new Set();

  async init(p: p5): Promise<void> {
    for (const [key, path] of Object.entries(VIDEO_PATHS)) {
      const media = p.createVideo(path);
      media.hide();
      media.volume(0);
      const element = media.elt as HTMLVideoElement;
      const markReady = (): void => {
        this.readyVideos.add(key);
      };
      element.addEventListener("loadeddata", markReady, { once: true });
      element.addEventListener("canplay", markReady, { once: true });
      element.addEventListener("error", () => {
        this.readyVideos.delete(key);
      });
      element.muted = true;
      element.loop = true;
      element.playsInline = true;
      element.autoplay = true;
      element.setAttribute("muted", "");
      element.setAttribute("playsinline", "");
      element.setAttribute("webkit-playsinline", "");
      element.preload = "auto";

      this.videos.set(key, media);
    }

    this.resumeAll();
  }

  resumeAll(): void {
    for (const media of this.videos.values()) {
      const element = media.elt as HTMLVideoElement;
      element.muted = true;
      element.volume = 0;
      const playPromise = element.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => undefined);
      }
    }
  }

  playOnly(keys: readonly string[]): void {
    const keep = new Set(keys);
    for (const [key, media] of this.videos.entries()) {
      const element = media.elt as HTMLVideoElement;
      element.muted = true;
      element.volume = 0;

      if (keep.has(key)) {
        const playPromise = element.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => undefined);
        }
      } else {
        element.pause();
      }
    }
  }

  get(key: string): p5.MediaElement {
    const media = this.videos.get(key);
    if (!media) {
      throw new Error(`Video not found: \"${key}\"`);
    }
    return media;
  }

  has(key: string): boolean {
    return this.videos.has(key);
  }

  isReady(key: string): boolean {
    return this.readyVideos.has(key);
  }

  keys(): string[] {
    return Array.from(this.videos.keys());
  }

  dispose(): void {
    for (const media of this.videos.values()) {
      media.remove();
    }
    this.videos.clear();
    this.readyVideos.clear();
  }
}
