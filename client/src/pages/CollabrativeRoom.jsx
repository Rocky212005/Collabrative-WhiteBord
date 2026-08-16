import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FiUsers, FiPlus, FiArrowRight, FiHash } from "react-icons/fi";

function CollabrativeRoom() {
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  const createRoom = () => {
    const id = crypto.randomUUID().slice(0, 6);
    console.log(id);
    navigate(`/board/${id}`);
  };

  const joinRoom = () => {
    if (!roomId.trim()) {
      alert("Please enter room ID");
      return;
    }

    navigate(`/board/${roomId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-32 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="absolute bottom-0 left-10 h-60 w-60 rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <main className="relative flex min-h-[88vh] items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">

          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 shadow-xl">
              <FiUsers size={28} />
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Realtime Whiteboard
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Collaborate in
              <span className="block text-slate-400">
                real time.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-slate-400 md:text-base">
              Create a room and invite others to draw, sketch,
              and brainstorm together on the same canvas.
            </p>
          </div>

          {/* Main Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl md:p-10">

            {/* Create Room */}
            <div className="text-center">
              <button
                onClick={createRoom}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-slate-200 hover:shadow-xl md:w-auto md:min-w-[280px]"
              >
                <FiPlus size={20} />

                Create New Room

                <FiArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-800" />

              <span className="text-xs font-medium uppercase tracking-widest text-slate-600">
                or
              </span>

              <div className="h-px flex-1 bg-slate-800" />
            </div>

            {/* Join Room */}
            <div>
              <label className="mb-3 block text-left text-sm font-medium text-slate-300">
                Join an existing room
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <FiHash
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="text"
                    placeholder="Enter room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        joinRoom();
                      }
                    }}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 py-4 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-slate-400 focus:ring-2 focus:ring-slate-700"
                  />
                </div>

                <button
                  onClick={joinRoom}
                  className="group flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-7 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700"
                >
                  Join Room

                  <FiArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom info */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-600">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Real-time collaboration powered by Socket.IO
          </div>

        </div>
      </main>
    </div>
  );
}

export default CollabrativeRoom;