import React, { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import socket from "../socket/socket";

const Chat = ({ roomId, onClose }) => {

  // ================= STATES =================

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null);


  useEffect(() => {

    const receiveMessage = (data) => {
      console.log("Received message:", data)

      setMessages((prev) => [
        ...prev,
        data
      ])
    }
    socket.on("receive-message", receiveMessage);
    return () => {
      socket.off("receive-message", receiveMessage);

    }
  }, [])



  const handleSend = (e) => {
    e.preventDefault()

    if (!message.trim()) {
      return;
    }

    const messageData = {
      roomId: roomId,
      message: message.trim(),
      sender: socket.id
    }

    socket.emit("send-message", messageData)

    setMessages((prev) => [
      ...prev,
      messageData
    ])

    setMessage("");
  }




  return (
    <div className="flex h-full flex-col bg-slate-900">


      {/* ================================================= */}
      {/* CHAT HEADER */}
      {/* ================================================= */}

      <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-4 py-3">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700">

            <FiMessageCircle
              size={18}
              className="text-white"
            />

          </div>


          <div>

            <h2 className="text-sm font-semibold text-white">
              Room Chat
            </h2>

            <p className="text-xs text-slate-400">
              Room: {roomId}
            </p>

          </div>

        </div>


        {/* CLOSE BUTTON */}

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
          title="Close Chat"
        >

          <FiX size={18} />

        </button>

      </div>


      {/* ================================================= */}
      {/* MESSAGES */}
      {/* ================================================= */}

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-slate-500">
              No message yet
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg, index) => {

              const isMe = msg.sender === socket.id;

              return (
                <div
                  key={index}
                  className={`flex ${isMe ? "justify-end" : "justify-start"
                    }`}
                >

                  <div
                    className={`max-w-[75%] rounded-2xl px-3 py-2 ${isMe
                        ? "rounded-br-sm bg-white text-slate-900"
                        : "rounded-bl-sm bg-slate-800 text-white"
                      }`}
                  >

                    <p className="break-words text-sm">
                      {msg.message}
                    </p>

                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>



      {/* ================================================= */}
      {/* MESSAGE INPUT */}
      {/* ================================================= */}

      <form
        onSubmit={handleSend}

        className="border-t border-slate-700 bg-slate-800 p-3"
      >

        <div className="flex items-center gap-2">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}

            placeholder="Type a message..."
            className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-slate-500"
          />


          <button
            type="submit"

            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
          >

            <FiSend size={17} />

          </button>

        </div>

      </form>

    </div>
  );
};

export default Chat;