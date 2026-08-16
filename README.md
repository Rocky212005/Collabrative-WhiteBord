# 🎨 Real-Time Collaborative Whiteboard

A real-time collaborative whiteboard application that allows multiple users to join the same room and draw together on a shared canvas.

The project is built with **React.js, Node.js, Express.js, Socket.IO, and Tailwind CSS**. Users can create a room, share the room ID, and collaborate on the same whiteboard in real time.

---

## ✨ Features

* 🎨 Interactive drawing canvas
* 🤝 Real-time multi-user collaboration
* 🏠 Create a unique whiteboard room
* 🔗 Join an existing room using Room ID
* ✏️ Pencil drawing tool
* 📏 Brush size control
* 🎨 Custom color selection
* 🧹 Clear entire whiteboard
* ⚡ Real-time synchronization using Socket.IO
* 📋 Copy Room ID functionality
* 🟢 Real-time connection status
* 📱 Responsive UI
* 🌙 Modern dark-themed interface
* 🧭 Separate Simple Board and Collaborative Board pages

---

## 🖥️ Demo

### Home Page

Users can choose between:

* **Simple Board** — for individual drawing
* **Collaborative Board** — for real-time collaboration

### Collaborative Room

A user can either:

1. Create a new room
2. Enter an existing Room ID

Example:

```text
Room ID: a82f31
```

Other users can enter the same Room ID to join the room.

---

## 🏗️ Project Architecture

```text
User A
   │
   │ Draw
   ▼
React Canvas
   │
   │ Socket.IO
   ▼
Node.js + Express Server
   │
   │ Room
   ▼
Socket.IO
   │
   │ Broadcast
   ▼
React Canvas
   │
   ▼
User B
```

Each collaborative board is associated with a unique Room ID.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Socket.IO Client
* React Icons
* Vite

### Backend

* Node.js
* Express.js
* Socket.IO
* CORS

---

## 📁 Folder Structure

```text
WhiteBoard/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Canvas.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Toolbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── SimpleBoard.jsx
│   │   │   ├── CollabrativeRoom.jsx
│   │   │   └── CollabrativeBoard.jsx
│   │   │
│   │   ├── socket/
│   │   │   └── socket.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/real-time-whiteboard.git
```

Move into the project:

```bash
cd real-time-whiteboard
```

---

# ⚙️ Frontend Setup

Go to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

Open another terminal and navigate to the server:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm run dev
```

or:

```bash
node server.js
```

The Socket.IO server will run on your configured backend port.

---

## 🔌 Socket.IO Events

The application uses Socket.IO to synchronize drawing actions between users.

### Join Room

```js
socket.emit("join-room", roomId);
```

A user joins the specified collaborative room.

---

### Start Drawing

```js
socket.emit("start-drawing", {
  roomId,
  x,
  y,
});
```

Notifies other users that drawing has started.

---

### Drawing

```js
socket.emit("drawing", {
  roomId,
  x,
  y,
});
```

Sends drawing coordinates to users inside the same room.

---

### Stop Drawing

```js
socket.emit("stop-drawing", {
  roomId,
});
```

Notifies other clients that drawing has stopped.

---

### Clear Board

```js
socket.emit("clear-board", {
  roomId,
});
```

Clears the canvas for everyone inside the room.

---

## 🏠 Room Creation

A new room ID is generated using:

```js
const id = crypto.randomUUID().slice(0, 6);
```

The user is then redirected to:

```text
/board/:roomId
```

For example:

```text
/board/a82f31
```

---

## 🔗 Joining a Room

Users can enter an existing Room ID:

```text
Enter Room ID
        ↓
    a82f31
        ↓
   Join Room
        ↓
/board/a82f31
```

Every user who joins the same Room ID receives drawing updates from the same Socket.IO room.

---

## 🎨 Whiteboard Tools

The collaborative board currently supports:

| Tool          | Description               |
| ------------- | ------------------------- |
| ✏️ Pencil     | Draw freely on the canvas |
| 🎨 Color      | Change drawing color      |
| ↕️ Brush Size | Adjust brush thickness    |
| 🧹 Clear      | Clear the shared board    |

---

## 🧭 Application Routes

```text
/home
    ↓
Home Page

/home/simpleboard
    ↓
Simple Board

/home/collabrativeboard
    ↓
Collaborative Room

/board/:roomId
    ↓
Real-Time Collaborative Canvas
```

---

## 🔄 How Collaboration Works

Suppose two users join:

```text
User A → /board/abc123
User B → /board/abc123
```

Both users are connected to:

```text
Socket.IO Room: abc123
```

When User A draws:

```text
User A
   │
   │ drawing event
   ▼
Socket.IO Server
   │
   │ emit to abc123
   ▼
User B
```

User B immediately sees the drawing on their canvas.

The same process works in the opposite direction.

---

## 🧠 Key Concepts Learned

This project helped implement several important real-world concepts:

* React component architecture
* React Router navigation
* Dynamic routes
* URL parameters with `useParams()`
* React state management
* Canvas API
* Mouse events
* Socket.IO rooms
* Real-time event broadcasting
* Client-server communication
* WebSocket-based collaboration
* Responsive UI design
* Tailwind CSS
* Component reusability

---

## 🔮 Future Improvements

Planned improvements include:

* [ ] Multiple drawing shapes
* [ ] Eraser tool
* [ ] Undo / Redo
* [ ] Text tool
* [ ] Line tool
* [ ] Arrow tool
* [ ] Multiple cursors
* [ ] Show active users in a room
* [ ] User names
* [ ] Board persistence
* [ ] Export whiteboard as PNG
* [ ] Authentication
* [ ] Save previous boards
* [ ] Dark/light canvas
* [ ] Real-time user cursor tracking
* [ ] Mobile touch support

---

## 🔐 Authentication

Authentication is intentionally not required for the current version.

Users can create or join rooms directly using a Room ID.

Authentication can be added later using:

```text
JWT
   ↓
Login/Register
   ↓
Protected Board Routes
   ↓
Collaborative Workspace
```

---

## ⚡ Performance Considerations

The application sends drawing coordinates through Socket.IO instead of continuously sending the entire canvas.

This keeps the communication lightweight:

```text
Mouse Movement
      ↓
Coordinates
      ↓
Socket.IO
      ↓
Room Members
      ↓
Canvas Rendering
```

For future optimization, drawing events can be throttled or batched to reduce the number of Socket.IO messages.

---

## 📸 Screenshots

Add screenshots of your project here:

```text
screenshots/
├── home.png
├── collaborative-room.png
├── collaborative-board.png
└── simple-board.png
```

Example:

```md
![Home Page](./screenshots/home.png)

![Collaborative Board](./screenshots/collaborative-board.png)
```

---

## 👨‍💻 Author

**Rahul Mishra**

Computer Science & Engineering
Bhopal, India

### Tech Interests

* MERN Stack
* React.js
* Node.js
* MongoDB
* Express.js
* Socket.IO
* Full Stack Development

---

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is open source and available under the MIT License.
