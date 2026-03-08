#extension GL_GOOGLE_include_directive : enable

precision mediump float;

varying vec2 vTexCoord;
uniform float u_time;
uniform float u_beat;
uniform vec2 u_resolution;
uniform sampler2D u_tex;
uniform sampler2D u_prev_tex;
uniform sampler2D ui_tex;
uniform sampler2D ui_mask_tex;
uniform vec4 u_faderA;
uniform vec4 u_faderB;
uniform float u_faderMaster;

// Bundled at build time via vite-plugin-glsl; VS Code warnings are expected.
#include "./utils/math.frag"
#include "./utils/coord.frag"
#include "./utils/color.frag"

void main(void) {
    float f0 = clamp(u_faderA.x, 0.0, 1.0);
    float f1 = clamp(u_faderA.y, 0.0, 1.0);
    float f2 = clamp(u_faderA.z, 0.0, 1.0);
    float f3 = clamp(u_faderA.w, 0.0, 1.0);
    float f4 = clamp(u_faderB.x, 0.0, 1.0);
    float f5 = clamp(u_faderB.y, 0.0, 1.0);
    float f6 = clamp(u_faderB.z, 0.0, 1.0);
    float f7 = clamp(u_faderB.w, 0.0, 1.0);
    float f8 = clamp(u_faderMaster, 0.0, 1.0);

    vec2 baseUv = vTexCoord;
    vec2 uv = baseUv;
    vec2 px = 1.0 / u_resolution;

    // Fader 1: scanline jitter (horizontal shake by row)
    float rowNoise = random(vec2(floor(uv.y * 260.0), floor(u_time * 20.0 + u_beat)));
    uv.x += (rowNoise - 0.5) * 0.18 * f0;

    // Fader 2: block displacement (macroblock style)
    vec2 blockUv = floor(uv * vec2(22.0, 14.0)) / vec2(22.0, 14.0);
    float blockNoise = random(blockUv + floor(u_time * 8.0));
    uv += (vec2(random(blockUv * 3.1), random(blockUv * 7.9)) - 0.5) * 0.12 * f1 * step(0.58, blockNoise);

    // Fader 4: vertical hold / tearing bands
    float tearMask = step(0.92 - f3 * 0.45, random(vec2(floor(uv.y * 100.0), floor(u_time * 14.0))));
    uv.y += tearMask * (random(vec2(floor(u_time * 5.0), floor(uv.y * 80.0))) - 0.5) * 0.22 * f3;

    uv = fract(uv);

    // Fader 9 (master): kaleidoscope on scene layer only.
    if (f8 > 0.001) {
        vec2 c = uv - 0.5;
        float r = length(c);
        float a = atan(c.y, c.x);
        float seg = mix(14.0, 4.0, f8);
        float slice = 6.28318530718 / seg;
        float folded = abs(mod(a, slice) - 0.5 * slice);
        vec2 kUv = vec2(cos(folded), sin(folded)) * r + 0.5;
        uv = mix(uv, fract(kUv), f8);
    }

    // Fader 5: pixelation
    if (f4 > 0.001) {
        float cells = mix(240.0, 22.0, f4);
        uv = mosaic(uv, cells);
    }

    // Fader 3: soft dual-offset ghost (no RGB channel split)
    vec2 ghostShift = vec2(
        (random(vec2(floor(uv.y * 120.0), floor(u_time * 10.0))) - 0.5) * 0.05 * f2,
        (random(vec2(floor(uv.x * 90.0), floor(u_time * 8.0 + 31.0))) - 0.5) * 0.03 * f2
    );
    vec3 baseCol = texture2D(u_tex, uv).rgb;
    vec3 ghostA = texture2D(u_tex, fract(uv + ghostShift)).rgb;
    vec3 ghostB = texture2D(u_tex, fract(uv - ghostShift * 0.8)).rgb;
    vec3 ghostMix = (ghostA + ghostB) * 0.5;
    vec3 col = mix(baseCol, ghostMix, f2 * 0.62);
    col += (ghostMix - baseCol) * (0.12 * f2);

    // Fader 6: directional flowing persistence (frame advection trail)
    if (f5 > 0.001) {
        vec2 flowDir = normalize(vec2(0.92, 0.18 + sin(u_time * 0.37) * 0.22));
        float flowSpeed = mix(0.0012, 0.02, f5);
        vec2 flow = flowDir * flowSpeed;
        flow += vec2(0.0, sin((baseUv.x + u_time * 0.12) * 22.0) * 0.004 * f5);

        vec2 prevUv0 = clamp(baseUv - flow, 0.0, 1.0);
        vec2 prevUv1 = clamp(baseUv - flow * 2.2, 0.0, 1.0);
        vec2 prevUv2 = clamp(baseUv - flow * 3.6, 0.0, 1.0);

        vec3 trail = texture2D(u_prev_tex, prevUv0).rgb * 0.55;
        trail += texture2D(u_prev_tex, prevUv1).rgb * 0.3;
        trail += texture2D(u_prev_tex, prevUv2).rgb * 0.15;

        float persist = mix(0.14, 0.84, f5);
        col = mix(col, trail, persist);
        col = mix(col, max(col, baseCol), 0.18);
    }

    // Fader 7: threshold / harsh clipping
    if (f6 > 0.001) {
        float thr = mix(0.85, 0.18, f6);
        col = mix(col, thresholdColor(col, thr), f6);
    }

    // Fader 8: mirror feedback blend
    vec3 mirrorCol = texture2D(u_tex, mirror(rotateUV(uv, sin(u_time * 0.7) * 0.12 + f7 * 0.25))).rgb;
    col = mix(col, mirrorCol, f7 * 0.75);

    // Small noise sprinkle linked to total intensity
    float intensity = clamp((f0 + f1 + f2 + f3 + f4 + f5 + f6 + f7 + f8) / 9.0, 0.0, 1.0);
    float grain = (random(uv * (u_time + 17.0) + px * 200.0) - 0.5) * 0.12 * intensity;
    col += grain;

    vec4 outCol = vec4(clamp(col, 0.0, 1.0), 1.0);

    float uiMask = texture2D(ui_mask_tex, baseUv).a;
    outCol.rgb *= uiMask;

    // Slightly haze only UI layer by blurring neighboring UI texels.
    vec2 uiBlurPx = px * 1.6;
    vec4 uiCenter = texture2D(ui_tex, baseUv);
    vec4 uiBlur = uiCenter * 0.36;
    uiBlur += texture2D(ui_tex, fract(baseUv + vec2(uiBlurPx.x, 0.0))) * 0.16;
    uiBlur += texture2D(ui_tex, fract(baseUv - vec2(uiBlurPx.x, 0.0))) * 0.16;
    uiBlur += texture2D(ui_tex, fract(baseUv + vec2(0.0, uiBlurPx.y))) * 0.16;
    uiBlur += texture2D(ui_tex, fract(baseUv - vec2(0.0, uiBlurPx.y))) * 0.16;

    vec4 uiCol = mix(uiCenter, uiBlur, 0.58);
    // Keep UI above the mask layer: mask affects only scene/background.
    uiCol.a *= 0.92;
    outCol = mix(outCol, uiCol, uiCol.a);

    gl_FragColor = outCol;
}