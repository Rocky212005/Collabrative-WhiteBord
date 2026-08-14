import { useEffect, useRef } from "react";
import socket from "../socket/socket";

function Canvas({ roomId, color, brushSize ,tool}) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // -----------------------------
    // Brush Settings
    // -----------------------------
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
    }

    // -----------------------------
    // RECEIVE: Start Drawing
    // -----------------------------
    const handleRemoteStart = (data) => {
      ctx.beginPath();

      if (data.tool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
  } else {
    ctx.globalCompositeOperation = "source-over";
  }

      ctx.strokeStyle = data.color;
      ctx.lineWidth = data.brushSize;

      ctx.moveTo(data.x, data.y);
    };

    // -----------------------------
    // RECEIVE: Drawing
    // -----------------------------
    const handleRemoteDrawing = (data) => {

        if (data.tool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
  } else {
    ctx.globalCompositeOperation = "source-over";
  }

      ctx.strokeStyle = data.color;
      ctx.lineWidth = data.brushSize;
      

      ctx.lineTo(data.x, data.y);
      ctx.stroke();
    };

    // -----------------------------
    // RECEIVE: Stop Drawing
    // -----------------------------
    const handleRemoteStop = () => {
      ctx.closePath();
    };

    const handleRemoteClear = () => {
     ctx.clearRect(
      0,
       0,
      canvas.width,
         canvas.height
      );
    };

    // -----------------------------
    // MOUSE DOWN
    // -----------------------------
    const handleMouseDown = (event) => {
      isDrawing.current = true;

      ctx.beginPath();

      ctx.moveTo(event.offsetX, event.offsetY);

      socket.emit("start-drawing", {
        roomId,
        x: event.offsetX,
        y: event.offsetY,
        color,
        brushSize,
        tool
      });
    };

    // -----------------------------
    // MOUSE MOVE
    // -----------------------------
    const handleMouseMove = (event) => {
      if (!isDrawing.current) return;

      const x = event.offsetX;
      const y = event.offsetY;

      // Draw locally
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;

      ctx.lineTo(x, y);
      ctx.stroke();

      // Send to server
      socket.emit("drawing", {
        roomId,
        x,
        y,
        color,
        brushSize,
        tool
      });
    };

    // -----------------------------
    // MOUSE UP
    // -----------------------------
    const handleMouseUp = () => {
      if (!isDrawing.current) return;

      isDrawing.current = false;

      ctx.closePath();

      socket.emit("stop-drawing", {
        roomId,
      });
    };

    // -----------------------------
    // MOUSE LEAVE
    // -----------------------------
    const handleMouseLeave = () => {
      if (!isDrawing.current) return;

      isDrawing.current = false;

      ctx.closePath();

      socket.emit("stop-drawing", {
        roomId,
      });
    };
   

    // -----------------------------
    // Add Mouse Events
    // -----------------------------
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // -----------------------------
    // Add Socket Events
    // -----------------------------
    socket.on("start-drawing", handleRemoteStart);
    socket.on("drawing", handleRemoteDrawing);
    socket.on("stop-drawing", handleRemoteStop);
    socket.on("clear-board", handleRemoteClear);

    // -----------------------------
    // Cleanup
    // -----------------------------
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);

      socket.off("start-drawing", handleRemoteStart);
      socket.off("drawing", handleRemoteDrawing);
      socket.off("stop-drawing", handleRemoteStop);
      socket.off("clear-board", handleRemoteClear);
    };
  }, [roomId, color, brushSize,tool]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        style={{
          border: "2px solid black",
          backgroundColor: "white",
          cursor: "crosshair",
        }}
      />
    </div>
  );
}

export default Canvas;