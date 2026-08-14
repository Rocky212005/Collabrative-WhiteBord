import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";
import Canvas from "../components/Canvas";
import Toolbar from "../components/Toolbar";
import { FiUsers, FiCopy, FiCheck } from "react-icons/fi";

const CollabrativeBoard = () => {
  const { roomId } = useParams();

  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(2);
  const [tool, setTool] = useState("pencil");
  const [copied, setCopied] = useState(false);

  const handleClear = () => {
    socket.emit("clear-board", {
      roomId,
    });
  };

  const copyRoomId = async () => {
    await navigator.clipboard.writeText(roomId);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    socket.emit("join-room", roomId);

    return () => {
      socket.emit("leave-room", roomId);
    };
  }, [roomId]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">

      {/* ================= HEADER ================= */}
      <header className="fixed left-0 right-0 top-0 z-30 flex h-[9vh] items-center justify-between border-b border-slate-800 bg-slate-900 px-5 md:px-8">

        {/* Logo */}
        <div>
          <h1 className="text-xl font-bold text-white md:text-2xl">
            White<span className="text-slate-400">Board</span>
          </h1>

          <p className="hidden text-xs text-slate-500 sm:block">
            Collaborative workspace
          </p>
        </div>

        {/* Room */}
        <div className="flex items-center gap-3">

          <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 sm:flex">
            <FiUsers size={16} className="text-slate-400" />

            <span className="text-xs text-slate-500">
              Room
            </span>

            <span className="font-mono text-sm font-semibold text-white">
              {roomId}
            </span>
          </div>

          <button
            onClick={copyRoomId}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
          >
            {copied ? (
              <>
                <FiCheck size={16} />
                <span className="hidden sm:inline">Copied</span>
              </>
            ) : (
              <>
                <FiCopy size={16} />
                <span className="hidden sm:inline">Copy ID</span>
              </>
            )}
          </button>

        </div>
      </header>


      {/* ================= SIDEBAR ================= */}
      <aside className="fixed bottom-0 left-0 top-[9vh] z-20 w-20 border-r border-slate-800 bg-slate-900">

        <div className="flex h-full flex-col items-center py-5">

          {/* Toolbar */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-2 shadow-xl">

            <Toolbar
              color={color}
              setColor={setColor}
              brushSize={brushSize}
              setBrushSize={setBrushSize}
              tool={tool}
              setTool={setTool}
              handleClear={handleClear}
            />

          </div>

        </div>

      </aside>


      {/* ================= CANVAS AREA ================= */}
      <main className="ml-20 mt-[9vh] h-[91vh] w-[calc(100%-5rem)] overflow-hidden bg-slate-100">

        <Canvas
          roomId={roomId}
          color={color}
          brushSize={brushSize}
          tool={tool}
        />

      </main>

    </div>
  );
};

export default CollabrativeBoard;