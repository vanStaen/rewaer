import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "antd";
import { CropValues } from "../types/cropTypes";
import "./CropModal.less";

interface CropModalProps {
  visible: boolean;
  imageUrl?: string;
  onCropSubmit: (cropValues: CropValues) => void;
  onCancel: () => void;
}

export const CropModal: React.FC<CropModalProps> = ({
  visible,
  imageUrl = "",
  onCropSubmit,
  onCancel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cropArea, setCropArea] = useState<CropValues>({
    left: 50,
    top: 50,
    width: 400,
    height: 300,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<string | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [loading, setLoading] = useState(false);

  // Load image when modal opens
  useEffect(() => {
    if (visible && imageUrl) {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        // Set initial crop area to be smaller than the image
        const maxWidth = Math.min(img.width - 100, 400);
        const maxHeight = Math.min(img.height - 100, 300);
        setCropArea({
          left: 50,
          top: 50,
          width: maxWidth,
          height: maxHeight,
        });
      };
      img.src = imageUrl;
    }
  }, [visible, imageUrl]);

  // Draw canvas with image and crop area
  useEffect(() => {
    if (!canvasRef.current || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match image
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw full image
    ctx.drawImage(image, 0, 0);

    // Draw semi-transparent overlay on areas outside crop
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";

    // Top overlay
    ctx.fillRect(0, 0, image.width, cropArea.top);

    // Bottom overlay
    ctx.fillRect(
      0,
      cropArea.top + cropArea.height,
      image.width,
      image.height - (cropArea.top + cropArea.height),
    );

    // Left overlay
    ctx.fillRect(0, cropArea.top, cropArea.left, cropArea.height);

    // Right overlay
    ctx.fillRect(
      cropArea.left + cropArea.width,
      cropArea.top,
      image.width - (cropArea.left + cropArea.width),
      cropArea.height,
    );

    // Draw border around crop area
    ctx.strokeStyle = "#1890ff";
    ctx.lineWidth = 2;
    ctx.strokeRect(cropArea.left, cropArea.top, cropArea.width, cropArea.height);

    // Draw handles
    drawHandles(ctx);
  }, [image, cropArea]);

  const drawHandles = (ctx: CanvasRenderingContext2D) => {
    const handleSize = 10;
    const { left, top, width, height } = cropArea;

    // Corner handles
    const handles = [
      { x: left, y: top }, // top-left
      { x: left + width, y: top }, // top-right
      { x: left, y: top + height }, // bottom-left
      { x: left + width, y: top + height }, // bottom-right
      // Edge handles
      { x: left + width / 2, y: top }, // top
      { x: left + width / 2, y: top + height }, // bottom
      { x: left, y: top + height / 2 }, // left
      { x: left + width, y: top + height / 2 }, // right
    ];

    ctx.fillStyle = "#1890ff";
    handles.forEach((handle) => {
      ctx.fillRect(
        handle.x - handleSize / 2,
        handle.y - handleSize / 2,
        handleSize,
        handleSize,
      );
    });
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const getHandleAtPosition = (x: number, y: number, threshold = 15) => {
    const { left, top, width, height } = cropArea;

    // Check corners and edges
    if (Math.abs(x - left) < threshold && Math.abs(y - top) < threshold)
      return "top-left";
    if (
      Math.abs(x - (left + width)) < threshold &&
      Math.abs(y - top) < threshold
    )
      return "top-right";
    if (
      Math.abs(x - left) < threshold &&
      Math.abs(y - (top + height)) < threshold
    )
      return "bottom-left";
    if (
      Math.abs(x - (left + width)) < threshold &&
      Math.abs(y - (top + height)) < threshold
    )
      return "bottom-right";

    // Check edges
    if (
      Math.abs(y - top) < threshold &&
      x > left + threshold &&
      x < left + width - threshold
    )
      return "top";
    if (
      Math.abs(y - (top + height)) < threshold &&
      x > left + threshold &&
      x < left + width - threshold
    )
      return "bottom";
    if (
      Math.abs(x - left) < threshold &&
      y > top + threshold &&
      y < top + height - threshold
    )
      return "left";
    if (
      Math.abs(x - (left + width)) < threshold &&
      y > top + threshold &&
      y < top + height - threshold
    )
      return "right";

    // Check if inside crop area for dragging
    if (
      x > left + threshold &&
      x < left + width - threshold &&
      y > top + threshold &&
      y < top + height - threshold
    )
      return "move";

    return null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    const handle = getHandleAtPosition(pos.x, pos.y);

    if (handle) {
      setIsDragging(true);
      setDragType(handle);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !dragType) {
      const pos = getMousePos(e);
      const cursor = getHandleAtPosition(pos.x, pos.y) ? "pointer" : "default";
      canvasRef.current!.style.cursor = cursor;
      return;
    }

    const pos = getMousePos(e);
    const { left, top, width, height } = cropArea;
    const minSize = 50;

    let newCropArea = { ...cropArea };

    switch (dragType) {
      case "move":
        newCropArea.left = pos.x - width / 2;
        newCropArea.top = pos.y - height / 2;
        break;
      case "top-left":
        newCropArea.left = pos.x;
        newCropArea.top = pos.y;
        newCropArea.width = width + (left - pos.x);
        newCropArea.height = height + (top - pos.y);
        break;
      case "top-right":
        newCropArea.top = pos.y;
        newCropArea.width = pos.x - left;
        newCropArea.height = height + (top - pos.y);
        break;
      case "bottom-left":
        newCropArea.left = pos.x;
        newCropArea.width = width + (left - pos.x);
        newCropArea.height = pos.y - top;
        break;
      case "bottom-right":
        newCropArea.width = pos.x - left;
        newCropArea.height = pos.y - top;
        break;
      case "top":
        newCropArea.top = pos.y;
        newCropArea.height = height + (top - pos.y);
        break;
      case "bottom":
        newCropArea.height = pos.y - top;
        break;
      case "left":
        newCropArea.left = pos.x;
        newCropArea.width = width + (left - pos.x);
        break;
      case "right":
        newCropArea.width = pos.x - left;
        break;
    }

    // Enforce minimum size
    if (newCropArea.width < minSize) newCropArea.width = minSize;
    if (newCropArea.height < minSize) newCropArea.height = minSize;

    // Keep within image bounds
    if (image) {
      if (newCropArea.left < 0) newCropArea.left = 0;
      if (newCropArea.top < 0) newCropArea.top = 0;
      if (newCropArea.left + newCropArea.width > image.width) {
        newCropArea.width = image.width - newCropArea.left;
      }
      if (newCropArea.top + newCropArea.height > image.height) {
        newCropArea.height = image.height - newCropArea.top;
      }
    }

    setCropArea(newCropArea);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType(null);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      onCropSubmit(cropArea);
      setLoading(false);
    }, 300);
  };

  return (
    <Modal
      title="Crop Image - Drag to adjust crop area"
      open={visible}
      onCancel={onCancel}
      width={800}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Apply Crop
        </Button>,
      ]}
    >
      <div className="crop-modal__container">
        <canvas
          ref={canvasRef}
          className="crop-modal__canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        <div className="crop-modal__info">
          <p>Left: {Math.round(cropArea.left)}px</p>
          <p>Top: {Math.round(cropArea.top)}px</p>
          <p>Width: {Math.round(cropArea.width)}px</p>
          <p>Height: {Math.round(cropArea.height)}px</p>
        </div>
      </div>
    </Modal>
  );
};
