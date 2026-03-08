import type { VisualRenderContext } from "../../types/render";

export class ColorFillScene {
  private readonly color: number;

  constructor(color: number) {
    this.color = color;
  }

  draw(ctx: VisualRenderContext): void {
    const { p, tex } = ctx;
    tex.push();
    tex.noStroke();
    tex.rectMode(p.CORNER);
    tex.fill(this.color);
    tex.rect(0, 0, tex.width, tex.height);
    tex.pop();
  }
}

export class VideoFillScene {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  getVideoKey(): string {
    return this.key;
  }

  private drawFallback(ctx: VisualRenderContext): void {
    const { p, tex } = ctx;
    tex.push();
    tex.noStroke();
    tex.rectMode(p.CORNER);
    tex.fill(0, 100, 50, 26);
    tex.rect(0, 0, tex.width, tex.height);
    tex.pop();
  }

  draw(ctx: VisualRenderContext): void {
    const { p, tex, beat, videoStore } = ctx;
    if (!videoStore || !videoStore.has(this.key)) {
      return;
    }

    const media = videoStore.get(this.key);
    const video = media.elt as HTMLVideoElement | undefined;
    if (!video || !videoStore.isReady(this.key) || video.error) {
      this.drawFallback(ctx);
      return;
    }
    if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      this.drawFallback(ctx);
      return;
    }

    const vw = Math.max(1, video.videoWidth || tex.width);
    const vh = Math.max(1, video.videoHeight || tex.height);
    const videoAspect = vw / vh;
    const canvasAspect = tex.width / tex.height;

    let drawW = tex.width;
    let drawH = tex.height;
    if (videoAspect > canvasAspect) {
      drawH = tex.height;
      drawW = drawH * videoAspect;
    } else {
      drawW = tex.width;
      drawH = drawW / videoAspect;
    }

    const beatScale = 1.0 + Math.sin(beat * 0.35) * 0.03;

    try {
      tex.push();
      tex.imageMode(p.CENTER);
      tex.noStroke();
      tex.image(media, tex.width * 0.5, tex.height * 0.5, drawW * beatScale, drawH * beatScale);
      tex.fill(0, 100, 50, 22);
      tex.rectMode(p.CENTER);
      tex.rect(tex.width * 0.5, tex.height * 0.5, tex.width, tex.height);
      tex.pop();
    } catch {
      this.drawFallback(ctx);
    }
  }
}
