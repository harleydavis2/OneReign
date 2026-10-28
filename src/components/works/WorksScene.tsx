"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import type { MotionValue } from "motion/react";
import { WORKS_CONFIG } from "./config";
import {
  tileVertexShader,
  tileFragmentShader,
  backgroundVertexShader,
  backgroundFragmentShader,
} from "./shaders";
import type { WorkItem } from "@/content/site";

/**
 * Seeded deterministic pseudo-random function for reproducible tile roll jitter
 */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123;
  return x - Math.floor(x);
}

/**
 * Fallback CanvasTexture generator for missing product screenshots
 */
function createPlaceholderTexture(project: string, status: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#151519";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 64px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(project.toUpperCase(), canvas.width / 2, canvas.height / 2 - 24);

    ctx.font = "32px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillStyle = status === "Live" ? "#C6FF4D" : "#A1A1AA";
    ctx.fillText(status, canvas.width / 2, canvas.height / 2 + 56);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Animated background plane with slow glowing flowing lines, soft vignette, and film grain
 */
function BackgroundPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, camera } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    const dist = camera.position.z + 14;
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(WORKS_CONFIG.FOV / 2));
    const h = 2 * dist * tanHalf * 1.25;
    const w = h * (size.width / size.height) * 1.25;
    meshRef.current.scale.set(w, h, 1);
  }, [size.width, size.height, camera.position.z]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, WORKS_CONFIG.CAMERA_Y, -14]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={backgroundVertexShader}
        fragmentShader={backgroundFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * Centered Title inside the ring: "Our Works"
 * Positioned at [0, -0.1, 0] OUTSIDE the spin and tilt groups.
 * Recomputes scale whenever size or camera changes to stay exactly TITLE_FRACTION wide.
 */
function TitleMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const { size, camera } = useThree();
  const [widths, setWidths] = useState({ our: 1.4, works: 2.1, ready: false });

  const handleSyncOur = useCallback((troikaObj: any) => {
    if (troikaObj?.material) {
      troikaObj.material.depthTest = true;
      troikaObj.material.depthWrite = true;
    }
    const bounds = troikaObj?.textRenderInfo?.blockBounds;
    if (bounds) {
      const w = bounds[2] - bounds[0];
      setWidths((prev) => ({ ...prev, our: w, ready: true }));
    }
  }, []);

  const handleSyncWorks = useCallback((troikaObj: any) => {
    if (troikaObj?.material) {
      troikaObj.material.depthTest = true;
      troikaObj.material.depthWrite = true;
    }
    const bounds = troikaObj?.textRenderInfo?.blockBounds;
    if (bounds) {
      const w = bounds[2] - bounds[0];
      setWidths((prev) => ({ ...prev, works: w, ready: true }));
    }
  }, []);

  const gap = 0.28;
  const totalW = widths.our + gap + widths.works;
  const ourX = -totalW / 2 + widths.our / 2;
  const worksX = totalW / 2 - widths.works / 2;

  useLayoutEffect(() => {
    if (!groupRef.current) return;
    const aspect = size.width / size.height;
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(WORKS_CONFIG.FOV / 2));
    const visibleWidthAtCenter = 2 * camera.position.z * tanHalf * aspect;
    const targetScale = (WORKS_CONFIG.TITLE_FRACTION * visibleWidthAtCenter) / totalW;
    groupRef.current.scale.setScalar(targetScale);
  }, [size.width, size.height, camera.position.z, totalW]);

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      <Text
        font="/fonts/inter-tight-latin-700-normal.woff"
        fontSize={1}
        color="#F5F5F5"
        anchorX="center"
        anchorY="middle"
        position={[ourX, 0, 0]}
        material-depthTest={true}
        material-depthWrite={true}
        onSync={handleSyncOur}
      >
        Our
      </Text>
      <Text
        font="/fonts/instrument-serif-latin-400-italic.woff"
        fontSize={1}
        color="#F5F5F5"
        anchorX="center"
        anchorY="middle"
        position={[worksX, 0, 0]}
        material-depthTest={true}
        material-depthWrite={true}
        onSync={handleSyncWorks}
      >
        Works
      </Text>
    </group>
  );
}

/**
 * Individual Single Ring Tile Mesh with custom curved shader
 */
interface SingleTileProps {
  item: WorkItem;
  index: number;
  totalCount: number;
  texture: THREE.Texture;
  texAspect: number;
  onHover: (item: WorkItem | null) => void;
  onSelect: (href: string) => void;
  onRegisterMaterial: (mat: THREE.ShaderMaterial) => void;
}

function SingleTile({
  item,
  index,
  totalCount,
  texture,
  texAspect,
  onHover,
  onSelect,
  onRegisterMaterial,
}: SingleTileProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHovered] = useState(false);

  const C = WORKS_CONFIG;

  // Exact helical placement math
  const angle = (index / totalCount) * Math.PI * 2;
  const posX = C.RADIUS * Math.sin(angle);
  const posZ = C.RADIUS * Math.cos(angle);
  const posY = (index / totalCount - 0.5) * C.HELIX_HEIGHT;
  const rotZ = (pseudoRandom(index) - 0.5) * 2 * C.ROLL_JITTER;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uBend: { value: C.BEND },
      uWidth: { value: C.TILE_W },
      uSize: { value: new THREE.Vector2(C.TILE_W, C.TILE_H) },
      uHover: { value: 0.0 },
      uNear: { value: 6.0 },
      uFar: { value: 16.0 },
      uRim: { value: C.RIM },
      uDimFront: { value: C.DIM_FRONT },
      uDimBack: { value: C.DIM_BACK },
      uTexAspect: { value: texAspect },
    }),
    [texture, texAspect, C]
  );

  useEffect(() => {
    if (materialRef.current) {
      onRegisterMaterial(materialRef.current);
    }
  }, [onRegisterMaterial]);

  useFrame((_, delta) => {
    if (!materialRef.current || !meshRef.current) return;

    const targetHover = hovered ? 1.0 : 0.0;
    materialRef.current.uniforms.uHover.value = THREE.MathUtils.damp(
      materialRef.current.uniforms.uHover.value,
      targetHover,
      10,
      delta
    );

    const targetScale = hovered ? 1.06 : 1.0;
    const currentScale = meshRef.current.scale.x;
    const nextScale = THREE.MathUtils.damp(currentScale, targetScale, 10, delta);
    meshRef.current.scale.set(nextScale, nextScale, nextScale);
  });

  return (
    <mesh
      ref={meshRef}
      position={[posX, posY, posZ]}
      rotation={[0, angle, rotZ]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(item);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        onHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item.href);
      }}
    >
      <planeGeometry args={[C.TILE_W, C.TILE_H, 32, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={tileVertexShader}
        fragmentShader={tileFragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent={false}
        depthWrite={true}
        depthTest={true}
        alphaToCoverage={true}
      />
    </mesh>
  );
}

/**
 * Inner Scene Controller managing camera fit, rotation, tilt, and drag
 */
interface SceneContentProps {
  worksList: WorkItem[];
  scrollProgress: MotionValue<number>;
  onHoverTile: (item: WorkItem | null) => void;
  onSelectTile: (href: string) => void;
  pointerRef: React.MutableRefObject<{ x: number; y: number; isTouch: boolean }>;
  dragOffsetRef: React.MutableRefObject<number>;
}

function SceneContent({
  worksList,
  scrollProgress,
  onHoverTile,
  onSelectTile,
  pointerRef,
  dragOffsetRef,
}: SceneContentProps) {
  const { size, camera } = useThree();
  const tiltGroupRef = useRef<THREE.Group>(null);
  const spinGroupRef = useRef<THREE.Group>(null);
  const currentRotationRef = useRef<number>(0);
  const frontDistRef = useRef(0);
  const tileMaterialsRef = useRef<THREE.ShaderMaterial[]>([]);

  // 1) Dynamic Camera Fit
  useLayoutEffect(() => {
    const C = WORKS_CONFIG;
    const aspect = size.width / size.height;
    const frac =
      size.width >= 1024
        ? C.FRONT_FRACTION_DESKTOP
        : size.width >= 768
        ? C.FRONT_FRACTION_TABLET
        : C.FRONT_FRACTION_MOBILE;
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(C.FOV / 2));
    const visibleWidthAtFront = C.TILE_W / frac;
    const frontDist = visibleWidthAtFront / (2 * tanHalf * aspect);
    frontDistRef.current = frontDist;

    camera.position.set(0, C.CAMERA_Y, C.RADIUS + frontDist);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    // Update shader depth uniforms on every tile material
    const uNear = frontDist;
    const uFar = frontDist + 2 * C.RADIUS;
    tileMaterialsRef.current.forEach((mat) => {
      if (mat?.uniforms) {
        if (mat.uniforms.uNear) mat.uniforms.uNear.value = uNear;
        if (mat.uniforms.uFar) mat.uniforms.uFar.value = uFar;
      }
    });
  }, [size.width, size.height, camera]);

  const registerMaterial = useCallback((mat: THREE.ShaderMaterial) => {
    if (!tileMaterialsRef.current.includes(mat)) {
      tileMaterialsRef.current.push(mat);
      const C = WORKS_CONFIG;
      const uNear = frontDistRef.current || 6.0;
      const uFar = uNear + 2 * C.RADIUS;
      if (mat.uniforms?.uNear) mat.uniforms.uNear.value = uNear;
      if (mat.uniforms?.uFar) mat.uniforms.uFar.value = uFar;
    }
  }, []);

  // Preload textures and calculate natural image aspect ratios
  const [textureEntries, setTextureEntries] = useState<
    Array<{ texture: THREE.Texture; aspect: number }>
  >([]);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    const loadedList: Array<{ texture: THREE.Texture; aspect: number }> = [];

    worksList.forEach((item) => {
      try {
        const tex = loader.load(
          item.image,
          (t) => {
            t.colorSpace = THREE.SRGBColorSpace;
            t.anisotropy = 8;
            const img = t.image as HTMLImageElement | undefined;
            const asp = img?.naturalWidth && img?.naturalHeight
              ? img.naturalWidth / img.naturalHeight
              : 1.6;
            const entry = loadedList.find((e) => e.texture === t);
            if (entry) entry.aspect = asp;
          },
          undefined,
          () => {
            const fallback = createPlaceholderTexture(item.project, item.status);
            (tex as any).image = fallback.image;
            tex.needsUpdate = true;
          }
        );
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        loadedList.push({ texture: tex, aspect: 1.6 });
      } catch {
        loadedList.push({
          texture: createPlaceholderTexture(item.project, item.status),
          aspect: 1.6,
        });
      }
    });

    setTextureEntries(loadedList);

    return () => {
      loadedList.forEach((e) => e.texture.dispose());
    };
  }, [worksList]);

  // Frame loop rotation & pointer tilt
  useFrame((state, delta) => {
    const progressVal = scrollProgress.get();
    const elapsedTime = state.clock.elapsedTime;
    const C = WORKS_CONFIG;

    const targetRotation =
      progressVal * Math.PI * 2 * C.SPIN_PER_SCROLL +
      elapsedTime * C.IDLE_SPEED +
      dragOffsetRef.current;

    currentRotationRef.current = THREE.MathUtils.damp(
      currentRotationRef.current,
      targetRotation,
      C.DAMPING,
      delta
    );

    if (spinGroupRef.current) {
      spinGroupRef.current.rotation.y = -currentRotationRef.current;
    }

    if (tiltGroupRef.current && !pointerRef.current.isTouch) {
      const targetTiltX = C.TILT_X + pointerRef.current.y * C.POINTER_TILT;
      const targetTiltZ = C.TILT_Z - pointerRef.current.x * C.POINTER_TILT;

      tiltGroupRef.current.rotation.x = THREE.MathUtils.damp(
        tiltGroupRef.current.rotation.x,
        targetTiltX,
        C.DAMPING,
        delta
      );
      tiltGroupRef.current.rotation.z = THREE.MathUtils.damp(
        tiltGroupRef.current.rotation.z,
        targetTiltZ,
        C.DAMPING,
        delta
      );
    }
  });

  const tileCount =
    size.width < 768
      ? WORKS_CONFIG.TILE_COUNT_MOBILE
      : WORKS_CONFIG.TILE_COUNT_DESKTOP;

  if (textureEntries.length === 0) return null;

  return (
    <>
      <BackgroundPlane />

      {/* Title placed at [0, -0.1, 0] OUTSIDE the spin and tilt groups */}
      <TitleMesh />

      {/* Main Tilt Group */}
      <group
        ref={tiltGroupRef}
        rotation={[WORKS_CONFIG.TILT_X, 0, WORKS_CONFIG.TILT_Z]}
      >
        {/* Spin Group holding all tiles */}
        <group ref={spinGroupRef}>
          {Array.from({ length: tileCount }).map((_, i) => {
            const item = worksList[i % worksList.length];
            const entry = textureEntries[i % textureEntries.length];
            return (
              <SingleTile
                key={`ring-tile-${i}`}
                item={item}
                index={i}
                totalCount={tileCount}
                texture={entry.texture}
                texAspect={entry.aspect}
                onHover={onHoverTile}
                onSelect={onSelectTile}
                onRegisterMaterial={registerMaterial}
              />
            );
          })}
        </group>
      </group>
    </>
  );
}

/**
 * WorksScene - The Primary WebGL React Three Fiber Canvas Component
 */
export interface WorksSceneProps {
  worksList: WorkItem[];
  scrollProgress: MotionValue<number>;
  isMobileDevice?: boolean;
}

export default function WorksScene({
  worksList,
  scrollProgress,
  isMobileDevice = false,
}: WorksSceneProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<WorkItem | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const pointerRef = useRef({ x: 0, y: 0, isTouch: false });
  const dragOffsetRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastDragXRef = useRef(0);

  // Pause rendering when off screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Drag inertia decay loop
  useEffect(() => {
    let animId: number;
    const decayLoop = () => {
      if (!isDraggingRef.current && Math.abs(dragVelocityRef.current) > 0.0001) {
        dragVelocityRef.current *= 0.94;
        dragOffsetRef.current += dragVelocityRef.current;
      }
      animId = requestAnimationFrame(decayLoop);
    };
    animId = requestAnimationFrame(decayLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") {
      pointerRef.current.isTouch = true;
    }
    isDraggingRef.current = true;
    lastDragXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setCursorPos({ x: e.clientX, y: e.clientY });

    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointerRef.current.x = nx;
    pointerRef.current.y = ny;

    if (isDraggingRef.current) {
      const deltaX = e.clientX - lastDragXRef.current;
      lastDragXRef.current = e.clientX;
      const step = deltaX * 0.005;
      dragOffsetRef.current += step;
      dragVelocityRef.current = step;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full select-none"
      style={{ touchAction: "pan-y" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        handlePointerUp();
        setHoveredItem(null);
      }}
    >
      <Canvas
        dpr={[1, isMobileDevice ? 1.5 : WORKS_CONFIG.DPR_MAX]}
        camera={{
          fov: WORKS_CONFIG.FOV,
          position: [0, WORKS_CONFIG.CAMERA_Y, 14],
        }}
        gl={{ antialias: true, alpha: false }}
        frameloop={isInView ? "always" : "never"}
        aria-hidden="true"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <SceneContent
          worksList={worksList}
          scrollProgress={scrollProgress}
          onHoverTile={setHoveredItem}
          onSelectTile={(href) => router.push(href)}
          pointerRef={pointerRef}
          dragOffsetRef={dragOffsetRef}
        />
      </Canvas>

      {/* Hover HTML Label Overlay near cursor */}
      {hoveredItem && !pointerRef.current.isTouch && (
        <div
          className="pointer-events-none fixed z-50 flex items-center gap-2.5 rounded-full border border-white/20 bg-black/85 px-3.5 py-1.5 backdrop-blur-md transition-opacity duration-150"
          style={{
            left: cursorPos.x + 16,
            top: cursorPos.y + 16,
          }}
        >
          <span className="font-display-sans text-xs font-semibold text-white">
            {hoveredItem.title}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              hoveredItem.status === "Live"
                ? "bg-[#C6FF4D]/20 text-[#C6FF4D]"
                : "bg-white/10 text-neutral-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                hoveredItem.status === "Live" ? "bg-[#C6FF4D]" : "bg-neutral-400"
              }`}
            />
            {hoveredItem.status}
          </span>
        </div>
      )}
    </div>
  );
}
