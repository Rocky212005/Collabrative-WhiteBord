import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import Canvas from "../components/Canvas";
import Toolbar from "../components/Toolbar";
import {
  FiUsers,
  FiCopy,
  FiCheck,
  FiArrowLeft,
  FiWifi,
} from "react-icons/fi";

const CollabrativeBoard = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

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
    <div className="h-screen overflow-hidden bg-[#0b0f19] text-white">

      {/* ================= HEADER ================= */}

      <header className="fixed left-0 right-0 top-0 z-50 h-[72px] border-b border-white/10 bg-[#0b0f19]/90 px-4 backdrop-blur-xl md:px-6">

        <div className="flex h-full items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/home")}
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/10"
            >
              <FiArrowLeft
                size={18}
                className="text-slate-400 transition group-hover:-translate-x-1 group-hover:text-white"
              />
            </button>

            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight">
                White<span className="text-slate-500">Board</span>
              </h1>

              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                Collaborative workspace
              </p>
            </div>

          </div>


          {/* CENTER - ROOM */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 shadow-lg shadow-black/20">

              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                <FiUsers size={14} className="text-slate-300" />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-widest text-slate-600">
                  Room
                </p>

                <p className="font-mono text-sm font-semibold tracking-wider text-slate-200">
                  {roomId}
                </p>
              </div>

              <button
                onClick={copyRoomId}
                className="ml-2 rounded-lg p-2 text-slate-500 transition hover:bg-white/10 hover:text-white"
              >
                {copied ? (
                  <FiCheck size={15} />
                ) : (
                  <FiCopy size={15} />
                )}
              </button>

            </div>

          </div>


          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* Connection */}
            <div className="hidden items-center gap-2 rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-3 py-2 sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-xs text-emerald-400">
                Connected
              </span>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <FiWifi size={16} className="text-slate-400" />
            </div>

          </div>

        </div>
      </header>


      {/* ================= WORKSPACE ================= */}

      <main className="relative h-screen pt-[72px]">

        {/* CANVAS */}
        <div className="h-full w-full bg-[#f8fafc]">

          <Canvas
            roomId={roomId}
            color={color}
            brushSize={brushSize}
            tool={tool}
          />

        </div>


        {/* ================= FLOATING TOOLBAR ================= */}

        <div className="absolute left-5 top-1/2 z-40 -translate-y-1/2">

          <div className="group relative rounded-2xl border border-white/10 bg-[#111827]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl">

            {/* Top glow */}
            <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

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


        {/* ================= MOBILE ROOM INFO ================= */}

        <div className="absolute left-1/2 top-20 z-30 -translate-x-1/2 md:hidden">

          <button
            onClick={copyRoomId}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-lg"
          >
            <FiUsers size={14} className="text-slate-500" />

            <span className="font-mono text-xs font-semibold text-slate-700">
              {roomId}
            </span>

            {copied ? (
              <FiCheck size={14} className="text-green-500" />
            ) : (
              <FiCopy size={14} className="text-slate-400" />
            )}
          </button>

        </div>


        {/* ================= BOTTOM STATUS ================= */}

        <div className="absolute bottom-5 left-1/2 z-30 hidden -translate-x-1/2 md:block">

          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-4 py-2 shadow-lg backdrop-blur">

            <div className="flex items-center gap-2">

              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-medium text-slate-600">
                Live
              </span>

            </div>

            <div className="h-3 w-px bg-slate-200" />

            <span className="text-xs text-slate-400">
              Changes are synced in real-time
            </span>

          </div>

        </div>

      </main>

    </div>
  );
};

export default CollabrativeBoard;