import React, { useState, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface SphericalPosition {
  theta: number;
  phi: number;
  radius: number;
}

export interface WorldPosition extends Position3D {
  scale: number;
  zIndex: number;
  isVisible: boolean;
  fadeOpacity: number;
  originalIndex: number;
}

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface SphereImageGridProps {
  images?: ImageData[];
  containerSize?: number;
  sphereRadius?: number;
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  baseImageScale?: number;
  hoverScale?: number;
  perspective?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
}

const SPHERE_MATH = {
  degreesToRadians: (degrees: number): number => degrees * (Math.PI / 180),
  normalizeAngle: (angle: number): number => {
    let a = angle;
    while (a > 180) a -= 360;
    while (a < -180) a += 360;
    return a;
  },
};

const SphereImageGrid: React.FC<SphereImageGridProps> = ({
  images = [],
  containerSize = 600,
  sphereRadius = 200,
  dragSensitivity = 0.8,
  momentumDecay = 0.96,
  maxRotationSpeed = 6,
  baseImageScale = 0.15,
  hoverScale = 1.3,
  perspective = 1000,
  autoRotate = true,
  autoRotateSpeed = 0.2,
  className = "",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [rotation, setRotation] = useState<Position3D>({ x: 15, y: 15, z: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [imagePositions, setImagePositions] = useState<SphericalPosition[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  const actualSphereRadius = sphereRadius || containerSize * 0.5;
  const baseImageSize = containerSize * baseImageScale;

  const generateSpherePositions = useCallback((): SphericalPosition[] => {
    const positions: SphericalPosition[] = [];
    const imageCount = images.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = (2 * Math.PI) / goldenRatio;

    for (let i = 0; i < imageCount; i++) {
      const t = (i + 0.5) / imageCount;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      let phi = inclination * (180 / Math.PI);
      const theta = (azimuth * (180 / Math.PI)) % 360;
      phi = 15 + (phi / 180) * 150;

      positions.push({ theta, phi, radius: actualSphereRadius });
    }

    return positions;
  }, [images.length, actualSphereRadius]);

  const calculateWorldPositions = useCallback((): WorldPosition[] => {
    const positions = imagePositions.map((pos, index) => {
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
      const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
      const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1;
      z = z1;

      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2;
      z = z2;

      const worldPos: Position3D = { x, y, z };

      const fadeZoneStart = -10;
      const fadeZoneEnd = -actualSphereRadius * 0.7;
      const isVisible = worldPos.z > fadeZoneEnd;

      let fadeOpacity = 1;
      if (worldPos.z <= fadeZoneStart) {
        fadeOpacity = Math.max(
          0.15,
          (worldPos.z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd),
        );
      }

      const distanceFromCenter = Math.sqrt(worldPos.x * worldPos.x + worldPos.y * worldPos.y);
      const distanceRatio = Math.min(distanceFromCenter / actualSphereRadius, 1);
      const centerScale = Math.max(0.4, 1 - distanceRatio * 0.4);
      const depthScale = (worldPos.z + actualSphereRadius) / (2 * actualSphereRadius);
      const scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);

      return {
        ...worldPos,
        scale,
        zIndex: Math.round(1000 + worldPos.z),
        isVisible,
        fadeOpacity,
        originalIndex: index,
      };
    });

    return positions;
  }, [imagePositions, rotation, actualSphereRadius]);

  const clampRotationSpeed = useCallback(
    (speed: number): number => Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, speed)),
    [maxRotationSpeed],
  );

  const updateMomentum = useCallback(() => {
    if (isDragging) return;

    setVelocity((prev) => {
      const next = { x: prev.x * momentumDecay, y: prev.y * momentumDecay };
      if (Math.abs(next.x) < 0.01 && Math.abs(next.y) < 0.01) return { x: 0, y: 0 };
      return next;
    });

    setRotation((prev) => {
      let newY = prev.y;
      if (autoRotate) newY += autoRotateSpeed;
      newY += clampRotationSpeed(velocity.y);

      return {
        x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(velocity.x)),
        y: SPHERE_MATH.normalizeAngle(newY),
        z: prev.z,
      };
    });
  }, [isDragging, momentumDecay, velocity, clampRotationSpeed, autoRotate, autoRotateSpeed]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const applyDrag = useCallback(
    (clientX: number, clientY: number) => {
      const deltaX = clientX - lastMousePos.current.x;
      const deltaY = clientY - lastMousePos.current.y;

      const rotationDelta = {
        x: -deltaY * dragSensitivity,
        y: deltaX * dragSensitivity,
      };

      setRotation((prev) => ({
        x: SPHERE_MATH.normalizeAngle(prev.x + clampRotationSpeed(rotationDelta.x)),
        y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
        z: prev.z,
      }));

      setVelocity({
        x: clampRotationSpeed(rotationDelta.x),
        y: clampRotationSpeed(rotationDelta.y),
      });

      lastMousePos.current = { x: clientX, y: clientY };
    },
    [dragSensitivity, clampRotationSpeed],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      applyDrag(e.clientX, e.clientY);
    },
    [isDragging, applyDrag],
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    setIsDragging(true);
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      applyDrag(touch.clientX, touch.clientY);
    },
    [isDragging, applyDrag],
  );

  const handleTouchEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    setImagePositions(generateSpherePositions());
  }, [generateSpherePositions]);

  useEffect(() => {
    if (!isMounted) return;
    const animate = () => {
      updateMomentum();
      animationFrame.current = requestAnimationFrame(animate);
    };
    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [isMounted, updateMomentum]);

  useEffect(() => {
    if (!isMounted) return;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMounted, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const worldPositions = calculateWorldPositions();

  if (!isMounted) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ width: containerSize, height: containerSize }}
      >
        <span className="text-sm text-muted-foreground">…</span>
      </div>
    );
  }

  if (!images.length) return null;

  return (
    <>
      <div
        ref={containerRef}
        className={`relative select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"} ${className}`}
        style={{ width: containerSize, height: containerSize, perspective: `${perspective}px` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {images.map((image, index) => {
            const position = worldPositions[index];
            if (!position || !position.isVisible) return null;

            const imageSize = baseImageSize * position.scale;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={image.id}
                className="absolute overflow-hidden rounded-xl shadow-lg ring-1 ring-black/10 transition-[box-shadow] duration-200"
                style={{
                  width: imageSize,
                  height: imageSize,
                  left: containerSize / 2 + position.x - imageSize / 2,
                  top: containerSize / 2 - position.y - imageSize / 2,
                  zIndex: isHovered ? 5000 : position.zIndex,
                  opacity: position.fadeOpacity,
                  transform: `scale(${isHovered ? hoverScale : 1})`,
                  transition: "transform 0.2s ease-out, opacity 0.2s linear",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => !isDragging && setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  draggable={false}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[75vh] w-full object-contain"
            />
            <button
              type="button"
              aria-label="Close"
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>
            {(selectedImage.title || selectedImage.description) && (
              <div className="p-5">
                {selectedImage.title && (
                  <h3 className="font-display text-lg text-foreground">{selectedImage.title}</h3>
                )}
                {selectedImage.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{selectedImage.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SphereImageGrid;
