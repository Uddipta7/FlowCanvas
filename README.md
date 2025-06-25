# 🎨 FlowCanvas – A Visual Drag & Connect Flow Builder

FlowCanvas is an interactive visual editor built with **React** and **@xyflow/react** (React Flow), where users can drag predefined blocks, place them on a canvas, and connect them with meaningful restrictions (e.g., only Block A ➝ Block B connections are allowed). The application supports **undo/redo**, **dark/light themes**, and a **modern aesthetic using glassmorphism**.

---

## 🔧 Features

- ✅ **Drag & Drop** Block A and B onto the canvas
- 🔗 **Only valid connection allowed** (Block A ➝ Block B)
- ⚠️ **Error handled visually** when invalid connections attempted
- 🌗 **Dark/Light theme toggle** with matching designs
- ♻️ **Undo/Redo** (Ctrl+Z / Ctrl+Y) and Delete support
- 🌈 **Stylish UI** using gradients, glassmorphism, shadows
- 📍 **Context menu popup** on right-click (e.g., “Hello World”)
- ⚡ Responsive and smooth animations

---

## 📦 Tech Stack

- **React** (CRA)
- **@xyflow/react** (React Flow library)
- **CSS Modules** & custom styles
- **UUID** for unique node IDs

---

## 🚀 Live Demo

👉 [https://flowcanvas.vercel.app](https://flow-canvas-five.vercel.app/) 

---

## 📥 Installation

Follow these steps to run locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/flowcanvas.git
cd flowcanvas
```
### 2. Install Dependencies
Make sure you have Node.js and npm installed.

```bash
npm install
```
### 3. Run the App Locally

```bash
npm start
```
The app should open at http://localhost:3000

## 🛠 Design Decisions
### 🎯 Valid Connection Logic
- All nodes have both source and target handles.

- Connections are validated in onConnect handler.

- If invalid (e.g., B ➝ A or A ➝ A), an alert message is shown.

### 🌗 Theme Support
- light mode: soft pastel gradient background, dark edges

- dark mode: deep purple/blue with neon borders

- Toggle button on canvas top-right (🌞 / 🌙)

### 📦 Component Structure
- FlowCanvas.jsx – Canvas, logic for connection and node state

- Sidebar.jsx – Draggable block options (A and B)

- blocks.json – Static block definitions

- customStyles.css – UI styling, transitions, themes

## 🧼 Folder Structure
```pgsql
src/
│
├── components/
│   ├── FlowCanvas.jsx
│   └── Sidebar.jsx
│
├── data/
│   └── blocks.json
│
├── App.jsx
├── customStyles.css
└── index.js
```

## 🌍 Deployment (Vercel)

- Push your project to GitHub

- Go to vercel.com → Import GitHub repo

- Choose root directory (where package.json is)

- Click Deploy

- Copy the live link shown at the end
