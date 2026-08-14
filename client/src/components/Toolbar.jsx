import React from "react";
import {
  FiEdit3,
  FiSquare,
  FiCircle,
  FiMinus,
  FiTrash2,
} from "react-icons/fi";

const Toolbar = ({
  color,
  setColor,
  brushSize,
  setBrushSize,
  tool,
  setTool,
  handleClear,
}) => {
  const toolButton = (name) => `
    group relative flex h-11 w-11 items-center justify-center
    rounded-xl transition-all duration-200
    ${
      tool === name
        ? "bg-white text-black shadow-lg shadow-white/10"
        : "text-slate-400 hover:bg-white/10 hover:text-white"
    }
  `;

  return (
    <div className="flex flex-col items-center gap-2">

      {/* Pencil */}
      <button
        onClick={() => setTool("pencil")}
        className={toolButton("pencil")}
      >
        <FiEdit3 size={19} />

        <span className="pointer-events-none absolute left-14 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-xl transition group-hover:opacity-100">
          Pencil
        </span>
      </button>


      {/* Line */}
      <button
        onClick={() => setTool("line")}
        className={toolButton("line")}
      >
        <FiMinus size={19} />

        <span className="pointer-events-none absolute left-14 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-xl transition group-hover:opacity-100">
          Line
        </span>
      </button>


      {/* Rectangle */}
      <button
        onClick={() => setTool("rectangle")}
        className={toolButton("rectangle")}
      >
        <FiSquare size={19} />

        <span className="pointer-events-none absolute left-14 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-xl transition group-hover:opacity-100">
          Rectangle
        </span>
      </button>


      {/* Circle */}
      <button
        onClick={() => setTool("circle")}
        className={toolButton("circle")}
      >
        <FiCircle size={19} />

        <span className="pointer-events-none absolute left-14 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-xl transition group-hover:opacity-100">
          Circle
        </span>
      </button>


      {/* Divider */}
      <div className="my-2 h-px w-7 bg-white/10" />


      {/* Color */}
      <label className="group relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/10">

        <div
          className="h-6 w-6 rounded-full border-2 border-white/30 shadow-inner"
          style={{ backgroundColor: color }}
        />

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />

        <span className="pointer-events-none absolute left-14 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-xl transition group-hover:opacity-100">
          Color
        </span>

      </label>


      {/* Brush Size */}
      <div className="group relative flex flex-col items-center">

        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="h-20 w-1 cursor-pointer appearance-none rounded-full bg-slate-700 [writing-mode:vertical-lr]"
        />

        <span className="pointer-events-none absolute left-14 top-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-xl transition group-hover:opacity-100">
          Size: {brushSize}
        </span>

      </div>


      {/* Divider */}
      <div className="my-2 h-px w-7 bg-white/10" />


      {/* Clear */}
      <button
        onClick={handleClear}
        className="group relative flex h-11 w-11 items-center justify-center rounded-xl text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
      >
        <FiTrash2 size={19} />

        <span className="pointer-events-none absolute left-14 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-xl transition group-hover:opacity-100">
          Clear board
        </span>
      </button>

    </div>
  );
};

export default Toolbar;