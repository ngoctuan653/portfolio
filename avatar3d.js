/**
 * avatar3d.js - True Volumetric 3D ASCII Human Bust Engine
 * Chu Tuan Ngoc - Developer Portfolio
 * 
 * Generates a full 360° volumetric 3D head and shoulders bust:
 * - Front face: Chu Tuan Ngoc's exact facial features, wavy bangs, and polo collar sampled from avatar.jpg.
 * - Cranium & skull: Full 3D volumetric dome with wavy hair texture wrapping around top, temples, and back.
 * - Neck: 3D solid cylindrical column connecting jawline to shoulders.
 * - Shoulders & Torso: 3D chest, trapezoids, and polo shirt depth.
 * - 3D Holographic Latitude Contour Rings: Scanning slices providing undeniable volumetric depth from every angle.
 * - 360° Drag & Inertia Physics, Orbiting Particles, CRT Scanlines, and 3 Color Themes.
 */

(function () {
  'use strict';

  // Available Color Themes
  const THEMES = {
    blue: {
      accent: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.45)',
      dim: 'rgba(56, 189, 248, 0.28)',
      bgGradient: ['rgba(56, 189, 248, 0.10)', 'rgba(6, 9, 17, 0.96)']
    },
    green: {
      accent: '#22c55e',
      glow: 'rgba(34, 197, 94, 0.45)',
      dim: 'rgba(34, 197, 94, 0.28)',
      bgGradient: ['rgba(34, 197, 94, 0.10)', 'rgba(6, 9, 17, 0.96)']
    },
    white: {
      accent: '#f8fafc',
      glow: 'rgba(248, 250, 252, 0.38)',
      dim: 'rgba(248, 250, 252, 0.24)',
      bgGradient: ['rgba(248, 250, 252, 0.08)', 'rgba(6, 9, 17, 0.96)']
    }
  };

  let currentThemeKey = 'blue';

  function initAvatar3D() {
    const container = document.getElementById('avatar-3d-canvas-container');
    if (!container) return;

    container.innerHTML = '';

    const canvas = document.createElement('canvas');
    canvas.className = 'avatar-parallax-canvas';
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.cursor = 'grab';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      showFallback(container);
      return;
    }

    // Complete 3D Volumetric Model Node Array
    let bust3DNodes = [];
    let modelReady = false;

    // Rotation and Physics state
    let angleY = 0;           // Horizontal yaw
    let angleX = 0;           // Vertical tilt (pitch)
    let targetAngleY = 0;
    let targetAngleX = 0;
    let rotVelocityY = 0.007; // Default auto-spin speed
    let isSpinning = true;
    let isDragging = false;
    let lastPointer = { x: 0, y: 0 };

    // Orbiting particles cloud
    const PARTICLE_COUNT = 52;
    const ORBIT_PARTICLES = [];
    const orbitChars = ['0', '1', '+', '*', 'x', '>', '<', '#', 'λ', '§'];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      ORBIT_PARTICLES.push({
        theta: (i / PARTICLE_COUNT) * Math.PI * 2,
        radiusX: 1.05 + Math.random() * 0.35,
        radiusZ: 0.88 + Math.random() * 0.30,
        y: (Math.random() - 0.5) * 1.9,
        speed: 0.014 + Math.random() * 0.012,
        char: orbitChars[Math.floor(Math.random() * orbitChars.length)],
        alpha: 0.35 + Math.random() * 0.55
      });
    }

    // Load avatar photo to texture the front face of the 3D bust
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'assets/images/avatar.jpg';

    img.onload = function () {
      buildVolumetric3DBust(img);
      modelReady = true;
    };

    img.onerror = function () {
      console.warn('[Avatar3D] Could not load assets/images/avatar.jpg, using procedural bust');
      buildProcedural3DBust();
      modelReady = true;
    };

    /**
     * Build the Complete 3D Volumetric Human Bust (Front Face + Cranium Volume + Neck + Torso)
     */
    function buildVolumetric3DBust(image) {
      bust3DNodes = [];

      // 1. Sample Front Face from avatar.jpg
      const GRID_COLS = 88;
      const GRID_ROWS = 66;

      const offCanvas = document.createElement('canvas');
      offCanvas.width = GRID_COLS;
      offCanvas.height = GRID_ROWS;
      const offCtx = offCanvas.getContext('2d');
      offCtx.drawImage(image, 0, 0, GRID_COLS, GRID_ROWS);

      const imgData = offCtx.getImageData(0, 0, GRID_COLS, GRID_ROWS);
      const data = imgData.data;

      const centerX = GRID_COLS / 2;
      const centerY = GRID_ROWS * 0.44;
      const faceRadiusX = GRID_COLS * 0.38;
      const faceRadiusY = GRID_ROWS * 0.45;

      for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
          const idx = (r * GRID_COLS + c) * 4;
          const red = data[idx];
          const green = data[idx + 1];
          const blue = data[idx + 2];

          // Skip pure background
          const isWhiteBg = (red > 248 && green > 248 && blue > 248) ||
                            (red > 240 && green > 240 && blue > 238 && (red - blue) < 14);
          if (isWhiteBg) continue;

          const lum = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

          const isHair = (r < GRID_ROWS * 0.36 && lum < 0.40);
          const isShirt = (r >= GRID_ROWS * 0.68 && lum < 0.35);
          const isCollarOrButtons = (r >= GRID_ROWS * 0.68 && lum >= 0.35);

          let displayChar;
          let nodeType;
          let baseAlpha;

          if (isHair) {
            nodeType = 'hair';
            const hairRamp = ".~=s%#@";
            const hIdx = Math.floor((1 - lum / 0.40) * (hairRamp.length - 1));
            displayChar = hairRamp[Math.max(0, Math.min(hairRamp.length - 1, hIdx))];
            baseAlpha = 0.55 + (1 - lum) * 0.35;
          } else if (isShirt) {
            nodeType = 'shirt';
            const shirtRamp = " .,:-=+";
            const sIdx = Math.floor((lum / 0.35) * (shirtRamp.length - 1));
            displayChar = shirtRamp[Math.max(0, Math.min(shirtRamp.length - 1, sIdx))];
            baseAlpha = 0.30 + lum * 0.32;
          } else if (isCollarOrButtons) {
            nodeType = 'feature';
            displayChar = lum > 0.6 ? 'O' : '+';
            baseAlpha = 0.95;
          } else {
            if (lum < 0.42) {
              nodeType = 'feature';
              const featRamp = "@#8%*=";
              const fIdx = Math.floor((1 - lum / 0.42) * (featRamp.length - 1));
              displayChar = featRamp[Math.max(0, Math.min(featRamp.length - 1, fIdx))];
              baseAlpha = 0.98;
            } else {
              nodeType = 'skin';
              const skinRamp = " .:--==++**##";
              const sNorm = (lum - 0.42) / (1.0 - 0.42);
              const sIdx = Math.floor(sNorm * (skinRamp.length - 1));
              displayChar = skinRamp[Math.max(0, Math.min(skinRamp.length - 1, sIdx))];
              baseAlpha = 0.62 + sNorm * 0.38;
            }
          }

          // Normalized 3D Coordinates
          const normX = (c - centerX) / (GRID_COLS * 0.48);
          const normY = -(r - centerY) / (GRID_ROWS * 0.52);

          // Front facial 3D depth curvature
          let z = 0;
          let nx = 0, ny = 0, nz = 1;

          if (r < GRID_ROWS * 0.72) {
            // Head & Face
            const hx = (c - centerX) / faceRadiusX;
            const hy = (r - centerY) / faceRadiusY;
            const rSq = hx * hx + hy * hy * 0.85;
            if (rSq < 1.0) {
              z = Math.sqrt(Math.max(0, 1.0 - rSq)) * 0.46;
              // Nose bump
              if (Math.abs(hx) < 0.22 && hy > -0.15 && hy < 0.25) {
                z += 0.09 * (1 - Math.abs(hx) / 0.22);
              }
              // Bangs layer
              if (nodeType === 'hair' || (nodeType === 'feature' && hy < 0.1)) {
                z += 0.05;
              }
              nx = hx;
              ny = -hy;
              nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
            } else {
              z = Math.max(0, 1.15 - rSq) * 0.2 - 0.05;
              nz = 0.5;
            }
          } else {
            // Chest & Shoulders
            const sx = normX;
            z = Math.max(-0.18, 0.20 - sx * sx * 0.32);
            nz = 0.8;
          }

          bust3DNodes.push({
            x: normX * 0.92,
            y: normY * 0.95,
            z: z,
            nx: nx, ny: ny, nz: nz,
            char: displayChar,
            nodeType: nodeType,
            baseAlpha: baseAlpha,
            lum: lum
          });
        }
      }

      // 2. Build 3D Cranium / Skull Volume (Sides & Back of Head)
      // Generates the lateral and rear volume so turning sideways shows a real 3D head
      const craniumLayers = 32; // Vertical slices of the head
      for (let l = 0; l < craniumLayers; l++) {
        const vRatio = l / craniumLayers; // 0 (bottom of skull) to 1 (crown)
        const y = -0.22 + vRatio * 1.05;

        // Elliptical dome radius at this height
        const normH = (vRatio - 0.52) / 0.48; // -1 to 1
        const radFactor = Math.sqrt(Math.max(0, 1 - normH * normH));
        const radiusX = 0.44 * radFactor;
        const radiusZ = 0.54 * radFactor;
        const centerZ = -0.12;

        const pointsPerRing = Math.floor(36 * radFactor);
        for (let p = 0; p < pointsPerRing; p++) {
          const phi = (p / pointsPerRing) * Math.PI * 2; // Angle around head

          // Only generate for sides and back (angles where phi is between PI/3 and 5*PI/3)
          // to avoid duplicate nodes on the front face
          const isRearOrSide = (phi > Math.PI * 0.28 && phi < Math.PI * 1.72);
          if (!isRearOrSide) continue;

          const px = Math.sin(phi) * radiusX;
          const pz = centerZ - Math.cos(phi) * radiusZ;

          // Wavy Korean-style hair texture
          const wave = Math.sin(phi * 6 + y * 12) * 0.03;
          const finalX = px * (1 + wave);
          const finalZ = pz * (1 + wave);

          // Hair ASCII ramp for cranium
          const hairChars = ['~', 's', 'S', '%', '&', '#', '*', '.', ':'];
          const charIndex = Math.floor(Math.abs(Math.sin(phi * 4 + y * 8)) * hairChars.length);
          const hChar = hairChars[Math.min(hairChars.length - 1, charIndex)];

          bust3DNodes.push({
            x: finalX,
            y: y,
            z: finalZ,
            nx: Math.sin(phi),
            ny: normH * 0.5,
            nz: -Math.cos(phi),
            char: hChar,
            nodeType: 'hair',
            baseAlpha: 0.50 + Math.sin(phi) * 0.15,
            lum: 0.22
          });
        }
      }

      // 3. Build 3D Solid Cylindrical Neck Column
      const neckLayers = 10;
      for (let l = 0; l < neckLayers; l++) {
        const ny = -0.25 - (l / neckLayers) * 0.28;
        const nRadius = 0.21;
        const nCenterZ = -0.08;
        const neckPoints = 20;

        for (let p = 0; p < neckPoints; p++) {
          const phi = (p / neckPoints) * Math.PI * 2;
          const isBackNeck = (phi > Math.PI * 0.35 && phi < Math.PI * 1.65);
          if (!isBackNeck) continue; // Front neck is already in photo

          const px = Math.sin(phi) * nRadius;
          const pz = nCenterZ - Math.cos(phi) * nRadius;

          bust3DNodes.push({
            x: px,
            y: ny,
            z: pz,
            nx: Math.sin(phi),
            ny: 0,
            nz: -Math.cos(phi),
            char: (p + l) % 2 === 0 ? ':' : '.',
            nodeType: 'skin',
            baseAlpha: 0.40,
            lum: 0.35
          });
        }
      }

      // 4. Build 3D Shoulders & Torso Back (Depth from front chest to shoulder blades)
      const shoulderLayers = 12;
      for (let l = 0; l < shoulderLayers; l++) {
        const sy = -0.55 - (l / shoulderLayers) * 0.40;
        const sWidth = 0.52 + (l / shoulderLayers) * 0.35;
        const sDepth = 0.28;
        const sCenterZ = -0.06;
        const sPoints = 26;

        for (let p = 0; p < sPoints; p++) {
          const phi = (p / sPoints) * Math.PI * 2;
          const isBackTorso = (phi > Math.PI * 0.25 && phi < Math.PI * 1.75);
          if (!isBackTorso) continue;

          const px = Math.sin(phi) * sWidth;
          const pz = sCenterZ - Math.cos(phi) * sDepth;

          bust3DNodes.push({
            x: px,
            y: sy,
            z: pz,
            nx: Math.sin(phi),
            ny: -0.2,
            nz: -Math.cos(phi),
            char: (p % 3 === 0) ? '-' : '.',
            nodeType: 'shirt',
            baseAlpha: 0.28,
            lum: 0.18
          });
        }
      }

      // 5. Add 3D Holographic Latitude Contour Rings (6 cross-section depth slices)
      const ringHeights = [0.65, 0.38, 0.12, -0.15, -0.38, -0.72];
      const ringRadiiX = [0.36, 0.44, 0.42, 0.34, 0.23, 0.72];
      const ringRadiiZ = [0.42, 0.52, 0.48, 0.36, 0.22, 0.34];
      const ringCenterZ = [-0.10, -0.12, -0.10, -0.08, -0.08, -0.05];

      for (let ri = 0; ri < ringHeights.length; ri++) {
        const ry = ringHeights[ri];
        const rx = ringRadiiX[ri];
        const rz = ringRadiiZ[ri];
        const cz = ringCenterZ[ri];
        const ringPoints = 36;

        for (let p = 0; p < ringPoints; p++) {
          const phi = (p / ringPoints) * Math.PI * 2;
          const px = Math.sin(phi) * rx;
          const pz = cz + Math.cos(phi) * rz;

          bust3DNodes.push({
            x: px,
            y: ry,
            z: pz,
            nx: Math.sin(phi),
            ny: 0,
            nz: Math.cos(phi),
            char: '+',
            nodeType: 'grid',
            baseAlpha: 0.26,
            lum: 0.5
          });
        }
      }
    }

    function buildProcedural3DBust() {
      // Fallback generator in case image fails to load
      buildVolumetric3DBust(new Image());
    }

    // Pointer Drag Interaction
    function onPointerDown(e) {
      isDragging = true;
      isSpinning = false;
      canvas.style.cursor = 'grabbing';
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY) || 0;
      lastPointer = { x: clientX, y: clientY };
      rotVelocityY = 0;
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY) || 0;
      const dx = clientX - lastPointer.x;
      const dy = clientY - lastPointer.y;
      lastPointer = { x: clientX, y: clientY };

      targetAngleY += dx * 0.009;
      targetAngleX += dy * 0.005;
      targetAngleX = Math.max(-0.35, Math.min(0.35, targetAngleX));
      rotVelocityY = dx * 0.001;
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      canvas.style.cursor = 'grab';
      if (Math.abs(rotVelocityY) > 0.002) {
        isSpinning = true;
      } else {
        rotVelocityY = 0.006;
        isSpinning = true;
      }
    }

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // High-DPI Canvas Resizing
    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 330;
      if (w === 0 || h === 0) return;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);
    resizeCanvas();

    // Main 60fps Render Loop
    let lastTime = performance.now();

    function render(now) {
      requestAnimationFrame(render);
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Inertia & Auto Spin
      if (isSpinning) {
        targetAngleY += rotVelocityY;
      }

      // Smooth easing toward targets
      angleY += (targetAngleY - angleY) * 0.12;
      angleX += (targetAngleX - angleX) * 0.12;

      const w = container.clientWidth || 320;
      const h = container.clientHeight || 330;
      if (w === 0 || h === 0) return;

      const theme = THEMES[currentThemeKey] || THEMES.blue;

      // 1. Cyber Radial Background
      ctx.fillStyle = '#060911';
      ctx.fillRect(0, 0, w, h);

      const radGrad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, Math.max(w, h) * 0.65);
      radGrad.addColorStop(0, theme.bgGradient[0]);
      radGrad.addColorStop(1, theme.bgGradient[1]);
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Subtle Tech Grid Pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.022)';
      ctx.lineWidth = 1;
      const gridStep = 22;
      for (let gx = 0; gx < w; gx += gridStep) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      // 3. Orbiting ASCII Particle Cloud (Rear half, z < 0)
      drawOrbitRing(w, h, angleY, theme, false);

      // 4. Volumetric 3D ASCII Bust Nodes
      if (modelReady && bust3DNodes.length > 0) {
        drawVolumetricBust(w, h, angleY, angleX, theme);
      }

      // 5. Orbiting ASCII Particle Cloud (Front half, z >= 0)
      drawOrbitRing(w, h, angleY, theme, true);

      // 6. Cyber HUD Brackets & Status Metrics
      drawTechHUD(w, h, theme);

      // 7. CRT Scanline Overlay
      drawCRTScanlines(w, h);
    }

    /**
     * Project & Render the Full Volumetric 3D ASCII Bust
     */
    function drawVolumetricBust(w, h, rotY, rotX, theme) {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Scale bust comfortably within canvas
      const scaleX = w * 0.47;
      const scaleY = h * 0.49;
      const centerX = w / 2;
      const centerY = h / 2 - 4;

      // Dynamic lighting direction (key light from top-right-front)
      const lightDir = { x: 0.45, y: 0.65, z: 0.62 };

      // Font size adjusted for crisp density
      const fontSize = Math.max(5.5, Math.floor(w / 44));
      ctx.font = `bold ${fontSize}px "JetBrains Mono", Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const projectedNodes = [];
      const totalNodes = bust3DNodes.length;

      for (let i = 0; i < totalNodes; i++) {
        const node = bust3DNodes[i];

        // 3D rotation around Y (yaw) and X (pitch)
        // Position rotation:
        const rx = node.x * cosY + node.z * sinY;
        const rz = -node.x * sinY + node.z * cosY;
        const ry = -node.y * cosX - rz * sinX;
        const finalZ = -node.y * sinX + rz * cosX;

        // Normal vector rotation for dynamic lighting:
        const rnx = node.nx * cosY + node.nz * sinY;
        const rnz = -node.nx * sinY + node.nz * cosY;
        const rny = node.ny * cosX - rnz * sinX;

        // Surface diffuse shading:
        const diffuse = Math.max(0.20, (rnx * lightDir.x + rny * lightDir.y + rnz * lightDir.z));

        // Screen projection
        const screenX = centerX + rx * scaleX;
        const screenY = centerY + ry * scaleY;

        projectedNodes.push({
          char: node.char,
          x: screenX,
          y: screenY,
          z: finalZ,
          nodeType: node.nodeType,
          baseAlpha: node.baseAlpha,
          diffuse: diffuse,
          lum: node.lum
        });
      }

      // Sort nodes back-to-front (Z-buffer ordering)
      projectedNodes.sort((a, b) => a.z - b.z);

      // Render sorted 3D nodes
      const nodeCount = projectedNodes.length;
      for (let i = 0; i < nodeCount; i++) {
        const p = projectedNodes[i];

        let charColor = theme.accent;
        let charAlpha = p.baseAlpha * p.diffuse;

        if (p.nodeType === 'feature') {
          ctx.shadowBlur = 0;
          charAlpha = Math.min(1.0, p.baseAlpha * 1.15);
        } else if (p.nodeType === 'skin') {
          ctx.shadowColor = theme.accent;
          ctx.shadowBlur = p.lum > 0.65 ? 2.5 : 0;
          charAlpha = Math.min(1.0, p.baseAlpha * (0.4 + p.diffuse * 0.6));
        } else if (p.nodeType === 'grid') {
          // Holographic contour scan line
          ctx.shadowBlur = 0;
          charAlpha = 0.24;
        } else {
          // Hair or shirt volume
          ctx.shadowBlur = 0;
          charAlpha = Math.max(0.18, p.baseAlpha * (0.35 + p.diffuse * 0.65));
        }

        ctx.fillStyle = charColor;
        ctx.globalAlpha = Math.max(0.06, Math.min(1.0, charAlpha));
        ctx.fillText(p.char, p.x, p.y);
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;

      // Cyber rear-panel spec sheet when facing 180° back
      const normalizedAngle = ((rotY % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      if (normalizedAngle > Math.PI * 0.45 && normalizedAngle < Math.PI * 1.55) {
        const backIntensity = Math.sin(normalizedAngle - Math.PI * 0.45) / Math.sin(Math.PI * 0.55);
        drawBackHeadCyberGrid(w, h, backIntensity, theme);
      }
    }

    /**
     * Cyber Developer Spec Sheet shown at 180° rear view
     */
    function drawBackHeadCyberGrid(w, h, intensity, theme) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(0.88, intensity));
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = theme.accent;
      ctx.textAlign = 'center';

      const cx = w / 2;
      const cy = h / 2;

      ctx.fillText('[BIO-CORE // REAR_SCAN]', cx, cy - 54);
      ctx.fillText('================================', cx, cy - 42);
      ctx.fillText('CORE: CHU TUAN NGOC', cx, cy - 26);
      ctx.fillText('ROLE: MOBILE & BACKEND DEV', cx, cy - 12);
      ctx.fillText('PRIMARY: FLUTTER & DART', cx, cy + 2);
      ctx.fillText('SECONDARY: SPRING BOOT / JAVA', cx, cy + 16);
      ctx.fillText('STATUS: OPEN FOR WORK (FULL-TIME)', cx, cy + 30);
      ctx.fillText('SECURITY: SHA-256 VERIFIED OK', cx, cy + 44);
      ctx.fillText('================================', cx, cy + 58);
      ctx.fillText('>_ TERMINAL PORTRAIT // v4.5 <_', cx, cy + 72);

      ctx.restore();
    }

    /**
     * Orbiting ASCII Particle Cloud
     */
    function drawOrbitRing(w, h, rotY, theme, isFront) {
      const cx = w / 2;
      const cy = h / 2;
      const scaleX = w * 0.50;
      const scaleY = 32;

      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = ORBIT_PARTICLES[i];
        p.theta += p.speed;

        const currentAngle = p.theta - rotY * 0.5;
        const px = Math.cos(currentAngle) * p.radiusX;
        const pz = Math.sin(currentAngle) * p.radiusZ;

        if (isFront && pz < 0) continue;
        if (!isFront && pz >= 0) continue;

        const sx = cx + px * scaleX;
        const sy = cy + p.y * (h * 0.36) + pz * scaleY;
        const depthAlpha = p.alpha * (0.35 + (pz + 1) * 0.35);

        ctx.fillStyle = theme.accent;
        ctx.globalAlpha = Math.max(0.1, Math.min(1.0, depthAlpha));
        ctx.fillText(p.char, sx, sy);
      }

      ctx.globalAlpha = 1.0;
    }

    /**
     * Cyber HUD Brackets & Status Indicators
     */
    function drawTechHUD(w, h, theme) {
      ctx.save();
      const len = 9;
      ctx.strokeStyle = theme.accent;
      ctx.lineWidth = 1.5;

      // Top-Left bracket
      ctx.beginPath();
      ctx.moveTo(10, 10 + len); ctx.lineTo(10, 10); ctx.lineTo(10 + len, 10);
      ctx.stroke();

      // Top-Right bracket
      ctx.beginPath();
      ctx.moveTo(w - 10 - len, 10); ctx.lineTo(w - 10, 10); ctx.lineTo(w - 10, 10 + len);
      ctx.stroke();

      // Bottom-Left bracket
      ctx.beginPath();
      ctx.moveTo(10, h - 10 - len); ctx.lineTo(10, h - 10); ctx.lineTo(10 + len, h - 10);
      ctx.stroke();

      // Bottom-Right bracket
      ctx.beginPath();
      ctx.moveTo(w - 10 - len, h - 10); ctx.lineTo(w - 10, h - 10); ctx.lineTo(w - 10, h - 10 - len);
      ctx.stroke();

      // Realtime Yaw angle indicator
      const deg = Math.round((((angleY % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) * (180 / Math.PI));
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillStyle = theme.accent;
      ctx.fillText(`YAW: ${deg}°`, w - 14, h - 14);

      ctx.textAlign = 'left';
      ctx.fillStyle = theme.dim;
      ctx.fillText('RENDER: 3D VOLUMETRIC BUST', 14, h - 14);

      ctx.restore();
    }

    /**
     * Subtle CRT Scanlines
     */
    function drawCRTScanlines(w, h) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
      for (let y = 0; y < h; y += 3) {
        ctx.fillRect(0, y, w, 1);
      }
    }

    // Start 60fps rendering
    requestAnimationFrame(render);

    // Setup Theme Picker Buttons
    setupThemeButtons();
  }

  function setupThemeButtons() {
    const themeDots = document.querySelectorAll('.avatar-theme-dot');
    themeDots.forEach(dot => {
      dot.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const themeKey = this.getAttribute('data-theme');
        setAvatarTheme(themeKey);
      };
    });
  }

  // Global event delegation for theme buttons
  document.addEventListener('click', function (e) {
    const dot = e.target.closest('.avatar-theme-dot');
    if (dot) {
      e.preventDefault();
      e.stopPropagation();
      const themeKey = dot.getAttribute('data-theme');
      if (themeKey) {
        setAvatarTheme(themeKey);
      }
    }
  });

  function setAvatarTheme(themeKey) {
    if (!THEMES[themeKey]) return;
    currentThemeKey = themeKey;
    const themeDots = document.querySelectorAll('.avatar-theme-dot');
    themeDots.forEach(dot => {
      if (dot.getAttribute('data-theme') === themeKey) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    const wrapper = document.querySelector('.avatar-3d-wrapper');
    if (wrapper) {
      wrapper.style.borderColor = THEMES[themeKey].accent;
      wrapper.style.boxShadow = `0 12px 32px rgba(0, 0, 0, 0.6), 0 0 22px ${THEMES[themeKey].glow}`;
    }
  }

  function showFallback(container) {
    container.innerHTML = `
      <div class="avatar-fallback">
        <div class="avatar-fallback-frame">
          <img src="assets/images/avatar.jpg" alt="Chu Tuan Ngoc" class="avatar-fallback-img">
          <div class="avatar-fallback-border"></div>
        </div>
        <div class="avatar-fallback-tag">&gt;_ 2D_AVATAR // STATIC_FALLBACK</div>
      </div>
    `;
  }

  // Export globally
  window.initAvatar3D = initAvatar3D;
  window.setAvatarTheme = setAvatarTheme;
})();
