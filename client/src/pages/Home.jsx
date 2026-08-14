import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FiEdit3, FiUsers, FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Hero */}
      <section className="px-6 pt-16 pb-10 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-slate-400">
          WhiteBoard
        </p>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Choose a board to{" "}
          <span className="text-slate-400">start creating.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
          Draw ideas, sketch concepts, and collaborate with your team
          in a simple and interactive workspace.
        </p>
      </section>

      {/* Board Cards */}
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-20 md:flex-row md:justify-center">

        {/* Simple Board */}
        <Link
          to="Simpleboard"
          className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-slate-600 hover:shadow-2xl hover:shadow-black/40 md:w-[380px]"
        >
          {/* Background glow */}
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/5 blur-3xl transition-all duration-500 group-hover:bg-white/10" />

          <div className="relative">
            {/* Icon */}
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black transition-transform duration-300 group-hover:scale-110">
              <FiEdit3 size={25} />
            </div>

            <h2 className="text-2xl font-semibold">
              Simple Board
            </h2>

            <p className="mt-3 min-h-[56px] text-sm leading-6 text-slate-400">
              A clean and distraction-free canvas for your personal
              sketches, ideas, and diagrams.
            </p>

            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white">
              Start drawing
              <FiArrowRight
                className="transition-transform duration-300 group-hover:translate-x-2"
                size={18}
              />
            </div>
          </div>
        </Link>

        {/* Collaborative Board */}
        <Link
          to="Collabrativeboard"
          className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-slate-600 hover:shadow-2xl hover:shadow-black/40 md:w-[380px]"
        >
          {/* Background glow */}
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/5 blur-3xl transition-all duration-500 group-hover:bg-white/10" />

          <div className="relative">
            {/* Icon */}
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black transition-transform duration-300 group-hover:scale-110">
              <FiUsers size={25} />
            </div>

            <h2 className="text-2xl font-semibold">
              Collaborative Board
            </h2>

            <p className="mt-3 min-h-[56px] text-sm leading-6 text-slate-400">
              Create a shared room and work together in real time
              with your team using Socket.IO.
            </p>

            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white">
              Create a room
              <FiArrowRight
                className="transition-transform duration-300 group-hover:translate-x-2"
                size={18}
              />
            </div>
          </div>
        </Link>

      </section>

      
    </div>
  );
};

export default Home;