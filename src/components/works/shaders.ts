import * as THREE from "three";
import { WORKS_CONFIG } from "./config";

export const tileVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying float vViewDepth;
  uniform float uWidth;
  uniform float uBend;

  void main() {
    vUv = uv;
    vec3 p = position;
    float a = (p.x / uWidth) * uBend;      // p.x spans -uWidth/2..uWidth/2
    float r = uWidth / uBend;
    p.x = r * sin(a);
    p.z = -r * (1.0 - cos(a));            // edges curve toward ring center
    vec4 world = modelMatrix * vec4(p, 1.0);
    vec4 mv = viewMatrix * world;
    vViewDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

export const tileFragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uSize;
  uniform float uHover, uNear, uFar, uRim, uDimFront, uDimBack, uTexAspect;
  varying vec2 vUv;
  varying float vViewDepth;

  float sdRoundBox(vec2 uv, vec2 size, float r) {
    vec2 q = abs(uv - 0.5) * size - (size * 0.5 - r);
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    float d = sdRoundBox(vUv, uSize, 0.10);
    float coverage = 1.0 - smoothstep(0.0, 0.012, d);
    if (coverage < 0.01) discard;

    // Crop-fit texture to target aspect ratio (cover, center)
    vec2 uv = vUv;
    float targetAspect = uSize.x / uSize.y;
    if (uTexAspect > 0.01) {
      if (uTexAspect > targetAspect) {
        float s = targetAspect / uTexAspect;
        uv.x = 0.5 + (vUv.x - 0.5) * s;
      } else {
        float s = uTexAspect / targetAspect;
        uv.y = 0.5 + (vUv.y - 0.5) * s;
      }
    }

    float t = clamp((vViewDepth - uNear) / (uFar - uNear), 0.0, 1.0);   // 0 = closest to camera, 1 = farthest
    float dim = mix(uDimFront, uDimBack, t) + uHover * 0.12;
    vec3 col = texture2D(uTexture, uv).rgb * dim;
    float rim = 1.0 - smoothstep(0.0, 0.012, abs(d + 0.006));           // thin crisp edge so dark screenshots stay visible on the dark background
    col = mix(col, vec3(1.0), rim * uRim * mix(1.0, 0.6, t));
    gl_FragColor = vec4(col, coverage);
  }
`;

export const backgroundVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const backgroundFragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  // Simple pseudo-random hash for fine film grain
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    
    // Multi-octave organic fluid wave ribbons inspired by Visuvate
    float t = uTime * 0.18;
    float w1 = sin(p.x * 2.4 + t + sin(p.y * 1.8 + t * 0.8) * 1.6) + sin(p.y * 3.0 - t * 0.6 + p.x * 1.2);
    float l1 = clamp(0.016 / (abs(sin(w1 * 2.2)) + 0.004), 0.0, 1.0);

    float w2 = cos(p.x * 1.6 - t * 0.9 + cos(p.y * 2.2 + t * 0.6) * 1.4) + sin(p.y * 2.4 + t * 1.1 - p.x * 1.6);
    float l2 = clamp(0.012 / (abs(sin(w2 * 2.0)) + 0.005), 0.0, 1.0);

    // Deep brand background #0B0B0D
    vec3 col = vec3(0.043, 0.043, 0.051);

    // Electric cyan/blue fluid wave + OneReign lime accent wave
    vec3 cyanRibbon = vec3(0.08, 0.35, 0.85);
    vec3 limeRibbon = vec3(0.776, 1.0, 0.302);

    col += cyanRibbon * (l1 * 0.28);
    col += limeRibbon * (l2 * 0.16);

    // Soft vignette (darken toward edges)
    float vignette = clamp(1.0 - length(p) * 0.45, 0.0, 1.0);
    col *= vignette;

    // Fine film grain
    float grain = (hash(vUv * 500.0 + fract(uTime)) - 0.5) * 0.025;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * Creates custom ShaderMaterial for a tile matching exact specifications
 */
export function createTileMaterial(
  texture: THREE.Texture,
  width: number,
  height: number,
  bend: number,
  near: number,
  far: number,
  texAspect = 1.6
): THREE.ShaderMaterial {
  const C = WORKS_CONFIG;
  return new THREE.ShaderMaterial({
    vertexShader: tileVertexShader,
    fragmentShader: tileFragmentShader,
    uniforms: {
      uTexture: { value: texture },
      uBend: { value: bend },
      uWidth: { value: width },
      uSize: { value: new THREE.Vector2(width, height) },
      uHover: { value: 0.0 },
      uNear: { value: near },
      uFar: { value: far },
      uRim: { value: C.RIM },
      uDimFront: { value: C.DIM_FRONT },
      uDimBack: { value: C.DIM_BACK },
      uTexAspect: { value: texAspect },
    },
    side: THREE.DoubleSide,
    transparent: false,
    depthWrite: true,
    depthTest: true,
    alphaToCoverage: true,
  });
}
