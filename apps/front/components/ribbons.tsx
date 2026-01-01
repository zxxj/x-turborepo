'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';

interface RibbonsProps {
  colors?: string[];
  baseSpring?: number;
  baseFriction?: number;
  baseThickness?: number;
  offsetFactor?: number;
  maxAge?: number;
  pointCount?: number;
  speedMultiplier?: number;
  enableFade?: boolean;
  enableShaderEffect?: boolean;
  effectAmplitude?: number;
  backgroundColor?: number[];
}

const Ribbons: React.FC<RibbonsProps> = ({
  colors = ['#ffffff'],
  baseSpring = 0.03,
  baseFriction = 0.9,
  baseThickness = 30,
  offsetFactor = 0.05,
  maxAge = 500,
  pointCount = 50,
  speedMultiplier = 0.6,
  enableFade = false,
  enableShaderEffect = true,
  effectAmplitude = 2,
  backgroundColor = [0, 0, 0, 0],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  console.log(colors);
  /** 防止 StrictMode 下重复初始化 */
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const container = containerRef.current;
    if (!container) return;

    /* ---------------- Renderer ---------------- */
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });

    const gl = renderer.gl;
    gl.clearColor(
      backgroundColor[0],
      backgroundColor[1],
      backgroundColor[2],
      backgroundColor[3],
    );

    Object.assign(gl.canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
    });

    container.appendChild(gl.canvas);

    /* ---------------- Scene ---------------- */
    const scene = new Transform();
    const lines: Polyline[] = [];

    const vertex = `
      precision highp float;

      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;

      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      uniform float uEnableShaderEffect;
      uniform float uEffectAmplitude;

      varying vec2 vUV;

      vec4 getPosition() {
        vec4 current = vec4(position, 1.0);
        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

        vec2 nextScreen = next.xy * aspect;
        vec2 prevScreen = prev.xy * aspect;
        vec2 tangent = normalize(nextScreen - prevScreen);
        vec2 normal = vec2(-tangent.y, tangent.x) / aspect;

        float dist = length(nextScreen - prevScreen);
        normal *= smoothstep(0.0, 0.02, dist);

        float pixelWidth = current.w / (uResolution.y / uDPR);
        normal *= pixelWidth * uThickness;

        current.xy -= normal * side;

        if (uEnableShaderEffect > 0.5) {
          current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
        }

        return current;
      }

      void main() {
        vUV = uv;
        gl_Position = getPosition();
      }
    `;

    const fragment = `
      precision highp float;

      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEnableFade;
      varying vec2 vUV;

      void main() {
        float alpha = uOpacity;
        if (uEnableFade > 0.5) {
          alpha *= 1.0 - vUV.y;
        }
        gl_FragColor = vec4(uColor, alpha);
      }
    `;

    /* ---------------- Create Lines ---------------- */
    const mouse = new Vec3();

    colors.forEach((color, index) => {
      const points = Array.from({ length: pointCount }, () => new Vec3());

      const polyline = new Polyline(gl, {
        points,
        vertex,
        fragment,
        uniforms: {
          uColor: { value: new Color(color) },
          uThickness: { value: baseThickness },
          uOpacity: { value: 1 },
          uTime: { value: 0 },
          uEnableShaderEffect: { value: enableShaderEffect ? 1 : 0 },
          uEffectAmplitude: { value: effectAmplitude },
          uEnableFade: { value: enableFade ? 1 : 0 },
        },
      });

      polyline.mesh.setParent(scene);
      lines.push(polyline);
    });

    /* ---------------- Resize ---------------- */
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      lines.forEach((l) => l.resize());
    };
    resize();
    window.addEventListener('resize', resize);

    /* ---------------- Mouse (window!) ---------------- */
    const onMouseMove = (e: MouseEvent) => {
      mouse.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
        0,
      );
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ---------------- Animation Loop ---------------- */
    let rafId = 0;
    const tmp = new Vec3();

    const update = (t: number) => {
      rafId = requestAnimationFrame(update);

      lines.forEach((line) => {
        const pts = line.points as Vec3[];

        tmp.copy(mouse).sub(pts[0]).multiply(baseSpring);
        pts[0].add(tmp);

        for (let i = 1; i < pts.length; i++) {
          pts[i].lerp(pts[i - 1], speedMultiplier);
        }

        line.mesh.program.uniforms.uTime.value = t * 0.001;
        line.updateGeometry();
      });

      renderer.render({ scene });
    };
    rafId = requestAnimationFrame(update);

    /* ---------------- Cleanup ---------------- */
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      container.removeChild(gl.canvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 pointer-events-none"
    />
  );
};

export default Ribbons;
