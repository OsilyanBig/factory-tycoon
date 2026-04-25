import { useRef, useEffect, useCallback, useState } from 'react';
import { Renderer, CELL_SIZE } from '@/engine/Renderer';
import { useGameStore } from '@/stores/gameStore';
import { Direction, MachineType } from '@/types';
import { MACHINES, isConveyor } from '@/data/machines';

// ============================================
// CANVAS YÖNETİM HOOK
// ============================================

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const animFrameRef = useRef<number>(0);

  // Store
  const grid = useGameStore(s => s.grid);
  const camera = useGameStore(s => s.camera);
  const gridWidth = useGameStore(s => s.gridWidth);
  const gridHeight = useGameStore(s => s.gridHeight);
  const currentChapter = useGameStore(s => s.currentChapter);
  const selectedTool = useGameStore(s => s.selectedTool);
  const setCamera = useGameStore(s => s.setCamera);
  const placeMachine = useGameStore(s => s.placeMachine);
  const removeMachine = useGameStore(s => s.removeMachine);
  const rotateMachine = useGameStore(s => s.rotateMachine);
  const setSelectedMachine = useGameStore(s => s.setSelectedMachine);
  const placeConveyorLine = useGameStore(s => s.placeConveyorLine);

  // Lokal state
  const [hoverCell, setHoverCell] = useState<{ x: number; y: number } | null>(null);

  // Sürükleme durumu
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startCamX: 0,
    startCamY: 0,
    moved: false,
  });

  // Konveyör sürükleme
  const conveyorDragRef = useRef({
    isDragging: false,
    startX: -1,
    startY: -1,
    currentX: -1,
    currentY: -1,
    path: [] as { x: number; y: number; direction: Direction }[],
  });

  // Pinch zoom
  const pinchRef = useRef({
    active: false,
    startDist: 0,
    startZoom: 1,
  });

  // Ekran → Grid koordinat dönüşümü
  const screenToGrid = useCallback((screenX: number, screenY: number): { x: number; y: number } => {
    const cam = useGameStore.getState().camera;
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const canvasX = screenX - rect.left;
    const canvasY = screenY - rect.top;

    const zoom = cam.zoom;
    const offsetX = canvas.width / 2 - cam.x * CELL_SIZE * zoom;
    const offsetY = canvas.height / 2 - cam.y * CELL_SIZE * zoom;

    const worldX = (canvasX - offsetX) / zoom;
    const worldY = (canvasY - offsetY) / zoom;

    return {
      x: Math.floor(worldX / CELL_SIZE),
      y: Math.floor(worldY / CELL_SIZE),
    };
  }, []);

  // Konveyör yolu hesapla
  const calculateConveyorPath = useCallback((
    startX: number, startY: number, endX: number, endY: number
  ): { x: number; y: number; direction: Direction }[] => {
    const path: { x: number; y: number; direction: Direction }[] = [];
    const state = useGameStore.getState();

    const dx = endX - startX;
    const dy = endY - startY;

    // Önce yatay sonra dikey
    if (Math.abs(dx) >= Math.abs(dy)) {
      // Yatay git
      const dirX: Direction = dx >= 0 ? 'right' : 'left';
      for (let x = startX; x !== endX; x += (dx > 0 ? 1 : -1)) {
        if (!state.grid[startY]?.[x]?.machine) {
          path.push({ x, y: startY, direction: dirX });
        }
      }
      // Dikey git
      if (dy !== 0) {
        const dirY: Direction = dy > 0 ? 'down' : 'up';
        for (let y = startY; y !== endY + (dy > 0 ? 1 : -1); y += (dy > 0 ? 1 : -1)) {
          if (y === startY && endX !== startX) {
            // Köşe noktası - yön dikeye çevir
            const idx = path.findIndex(p => p.x === endX && p.y === startY);
            if (idx === -1 && !state.grid[startY]?.[endX]?.machine) {
              path.push({ x: endX, y: startY, direction: dirY });
            }
            continue;
          }
          if (!state.grid[y]?.[endX]?.machine) {
            path.push({ x: endX, y, direction: dirY });
          }
        }
      } else {
        // Sadece yatay - son hücre
        if (!state.grid[startY]?.[endX]?.machine) {
          path.push({ x: endX, y: startY, direction: dirX });
        }
      }
    } else {
      // Dikey git
      const dirY: Direction = dy >= 0 ? 'down' : 'up';
      for (let y = startY; y !== endY; y += (dy > 0 ? 1 : -1)) {
        if (!state.grid[y]?.[startX]?.machine) {
          path.push({ x: startX, y, direction: dirY });
        }
      }
      // Yatay git
      if (dx !== 0) {
        const dirX: Direction = dx > 0 ? 'right' : 'left';
        for (let x = startX; x !== endX + (dx > 0 ? 1 : -1); x += (dx > 0 ? 1 : -1)) {
          if (x === startX && endY !== startY) {
            const idx = path.findIndex(p => p.x === startX && p.y === endY);
            if (idx === -1 && !state.grid[endY]?.[startX]?.machine) {
              path.push({ x: startX, y: endY, direction: dirX });
            }
            continue;
          }
          if (!state.grid[endY]?.[x]?.machine) {
            path.push({ x, y: endY, direction: dirX });
          }
        }
      } else {
        if (!state.grid[endY]?.[startX]?.machine) {
          path.push({ x: startX, y: endY, direction: dirY });
        }
      }
    }

    return path;
  }, []);

  // Mouse/Touch → Grid tıklama
  const handleInteraction = useCallback((gridX: number, gridY: number) => {
    const state = useGameStore.getState();
    const tool = state.selectedTool;

    if (tool === 'select') {
      const cell = state.grid[gridY]?.[gridX];
      if (cell?.machine) {
        setSelectedMachine(cell.machine);
      } else {
        setSelectedMachine(null);
      }
    } else if (tool === 'delete') {
      removeMachine(gridX, gridY);
    } else {
      // Makine yerleştir
      const direction: Direction = 'right';
      placeMachine(gridX, gridY, tool as MachineType, direction);
    }
  }, [placeMachine, removeMachine, setSelectedMachine]);

  // ═══════════════════════════════
  // MOUSE EVENTS
  // ═══════════════════════════════
  const handleMouseDown = useCallback((e: MouseEvent) => {
    const cam = useGameStore.getState().camera;
    const tool = useGameStore.getState().selectedTool;

    if (e.button === 2 || e.button === 1) {
      // Sağ tık veya orta tık: Sürükle
      dragRef.current = {
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
        startCamX: cam.x,
        startCamY: cam.y,
        moved: false,
      };
      return;
    }

    if (isConveyor(tool) && tool !== 'select' && tool !== 'delete') {
      // Konveyör sürükleme başlat
      const grid = screenToGrid(e.clientX, e.clientY);
      conveyorDragRef.current = {
        isDragging: true,
        startX: grid.x,
        startY: grid.y,
        currentX: grid.x,
        currentY: grid.y,
        path: [],
      };
      return;
    }

    // Sol tık: Yerleştir/Seç
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startCamX: cam.x,
      startCamY: cam.y,
      moved: false,
    };
  }, [screenToGrid]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const gridPos = screenToGrid(e.clientX, e.clientY);
    setHoverCell(gridPos);

    // Kamera sürükleme
    if (dragRef.current.isDragging) {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        dragRef.current.moved = true;
      }

      const cam = useGameStore.getState().camera;
      const zoom = cam.zoom;
      setCamera(
        dragRef.current.startCamX - dx / (CELL_SIZE * zoom),
        dragRef.current.startCamY - dy / (CELL_SIZE * zoom),
        cam.zoom
      );
    }

    // Konveyör sürükleme
    if (conveyorDragRef.current.isDragging) {
      conveyorDragRef.current.currentX = gridPos.x;
      conveyorDragRef.current.currentY = gridPos.y;
      conveyorDragRef.current.path = calculateConveyorPath(
        conveyorDragRef.current.startX,
        conveyorDragRef.current.startY,
        gridPos.x,
        gridPos.y
      );
    }
  }, [screenToGrid, setCamera, calculateConveyorPath]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    // Konveyör yerleştir
    if (conveyorDragRef.current.isDragging) {
      const path = conveyorDragRef.current.path;
      if (path.length > 0) {
        const state = useGameStore.getState();
        const convType = state.selectedTool as MachineType;
        path.forEach(p => {
          placeMachine(p.x, p.y, convType, p.direction);
        });
      } else {
        // Tek tık
        const gridPos = screenToGrid(e.clientX, e.clientY);
        const state = useGameStore.getState();
        placeMachine(gridPos.x, gridPos.y, state.selectedTool as MachineType, 'right');
      }
      conveyorDragRef.current.isDragging = false;
      conveyorDragRef.current.path = [];
      return;
    }

    if (dragRef.current.isDragging && !dragRef.current.moved) {
      // Tıklama (sürüklenmedi)
      const gridPos = screenToGrid(e.clientX, e.clientY);
      handleInteraction(gridPos.x, gridPos.y);
    }

    dragRef.current.isDragging = false;
  }, [screenToGrid, handleInteraction, placeMachine]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const cam = useGameStore.getState().camera;
    const zoomDelta = e.deltaY > 0 ? -0.1 : 0.1;
    setCamera(cam.x, cam.y, cam.zoom + zoomDelta);
  }, [setCamera]);

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
  }, []);

  // Çift tıklama - döndürme
  const handleDoubleClick = useCallback((e: MouseEvent) => {
    const gridPos = screenToGrid(e.clientX, e.clientY);
    rotateMachine(gridPos.x, gridPos.y);
  }, [screenToGrid, rotateMachine]);

  // ═══════════════════════════════
  // TOUCH EVENTS
  // ═══════════════════════════════
  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault();

    if (e.touches.length === 2) {
      // Pinch start
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      pinchRef.current = {
        active: true,
        startDist: dist,
        startZoom: useGameStore.getState().camera.zoom,
      };
      return;
    }

    const touch = e.touches[0];
    const cam = useGameStore.getState().camera;
    const tool = useGameStore.getState().selectedTool;

    if (isConveyor(tool) && tool !== 'select' && tool !== 'delete') {
      const gridPos = screenToGrid(touch.clientX, touch.clientY);
      conveyorDragRef.current = {
        isDragging: true,
        startX: gridPos.x,
        startY: gridPos.y,
        currentX: gridPos.x,
        currentY: gridPos.y,
        path: [],
      };
      return;
    }

    dragRef.current = {
      isDragging: true,
      startX: touch.clientX,
      startY: touch.clientY,
      startCamX: cam.x,
      startCamY: cam.y,
      moved: false,
    };
  }, [screenToGrid]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();

    if (e.touches.length === 2 && pinchRef.current.active) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const scale = dist / pinchRef.current.startDist;
      const cam = useGameStore.getState().camera;
      setCamera(cam.x, cam.y, pinchRef.current.startZoom * scale);
      return;
    }

    const touch = e.touches[0];

    if (conveyorDragRef.current.isDragging) {
      const gridPos = screenToGrid(touch.clientX, touch.clientY);
      conveyorDragRef.current.currentX = gridPos.x;
      conveyorDragRef.current.currentY = gridPos.y;
      conveyorDragRef.current.path = calculateConveyorPath(
        conveyorDragRef.current.startX,
        conveyorDragRef.current.startY,
        gridPos.x,
        gridPos.y
      );
      return;
    }

    if (dragRef.current.isDragging) {
      const dx = touch.clientX - dragRef.current.startX;
      const dy = touch.clientY - dragRef.current.startY;

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        dragRef.current.moved = true;
      }

      const cam = useGameStore.getState().camera;
      setCamera(
        dragRef.current.startCamX - dx / (CELL_SIZE * cam.zoom),
        dragRef.current.startCamY - dy / (CELL_SIZE * cam.zoom),
        cam.zoom
      );
    }
  }, [screenToGrid, setCamera, calculateConveyorPath]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    pinchRef.current.active = false;

    if (conveyorDragRef.current.isDragging) {
      const path = conveyorDragRef.current.path;
      if (path.length > 0) {
        const state = useGameStore.getState();
        path.forEach(p => {
          placeMachine(p.x, p.y, state.selectedTool as MachineType, p.direction);
        });
      } else if (e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        const gridPos = screenToGrid(touch.clientX, touch.clientY);
        const state = useGameStore.getState();
        placeMachine(gridPos.x, gridPos.y, state.selectedTool as MachineType, 'right');
      }
      conveyorDragRef.current.isDragging = false;
      conveyorDragRef.current.path = [];
      return;
    }

    if (dragRef.current.isDragging && !dragRef.current.moved && e.changedTouches.length > 0) {
      const touch = e.changedTouches[0];
      const gridPos = screenToGrid(touch.clientX, touch.clientY);
      handleInteraction(gridPos.x, gridPos.y);
    }

    dragRef.current.isDragging = false;
  }, [screenToGrid, handleInteraction, placeMachine]);

  // ═══════════════════════════════
  // RENDER LOOP
  // ═══════════════════════════════
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas boyutu
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      if (rendererRef.current) {
        rendererRef.current.resize(rect.width, rect.height);
      }
    };

    rendererRef.current = new Renderer(ctx, canvas.clientWidth, canvas.clientHeight);
    resize();

    window.addEventListener('resize', resize);

    // Event listeners
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('contextmenu', handleContextMenu);
    canvas.addEventListener('dblclick', handleDoubleClick);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    // Render loop
    let lastTime = 0;
    const renderLoop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const state = useGameStore.getState();
      const renderer = rendererRef.current;

      if (renderer) {
        const dpr = window.devicePixelRatio || 1;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Konveyör preview çizimi
        let previewHover = hoverCell;

        renderer.render(
          state.grid,
          state.camera,
          state.gridWidth,
          state.gridHeight,
          state.currentChapter,
          state.selectedTool,
          previewHover,
          dt
        );

        // Konveyör sürükleme preview
        if (conveyorDragRef.current.isDragging && conveyorDragRef.current.path.length > 0) {
          const cam = state.camera;
          const zoom = cam.zoom;
          const offsetX = canvas.clientWidth / 2 - cam.x * CELL_SIZE * zoom;
          const offsetY = canvas.clientHeight / 2 - cam.y * CELL_SIZE * zoom;

          ctx.save();
          ctx.translate(offsetX, offsetY);
          ctx.scale(zoom, zoom);

          for (const p of conveyorDragRef.current.path) {
            ctx.fillStyle = 'rgba(74, 144, 217, 0.3)';
            ctx.fillRect(p.x * CELL_SIZE, p.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            ctx.strokeStyle = 'rgba(74, 144, 217, 0.6)';
            ctx.lineWidth = 2;
            ctx.strokeRect(p.x * CELL_SIZE, p.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }

          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('contextmenu', handleContextMenu);
      canvas.removeEventListener('dblclick', handleDoubleClick);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [
    handleMouseDown, handleMouseMove, handleMouseUp,
    handleWheel, handleContextMenu, handleDoubleClick,
    handleTouchStart, handleTouchMove, handleTouchEnd,
    hoverCell,
  ]);

  return { canvasRef, hoverCell };
}
