import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useNodesState,
  useEdgesState,
  Handle,
  Position
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import '../customStyles.css';
import { v4 as uuidv4 } from 'uuid';

const CustomNode = ({ data }) => {
  return (
    <div className={`custom-node ${data.rawType === 'blockA' ? 'block-a' : 'block-b'}`}>
      <Handle
        type="source"
        position={Position.Bottom}
        id="source"
        style={{ background: '#000' }}
      />
      <div className="node-content">
        <span className="node-label">{data.label}</span>
        {data.rawType === 'blockA' && <span className="node-icon">🟠</span>}
        {data.rawType === 'blockB' && <span className="node-icon">🔵</span>}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        style={{ background: '#000' }}
      />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

export default function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [darkMode, setDarkMode] = useState(false);

  const history = useRef([{ nodes: [], edges: [] }]);
  const historyIndex = useRef(0);

  const updateHistory = (newNodes, newEdges) => {
    const snapshot = {
      nodes: JSON.parse(JSON.stringify(newNodes)),
      edges: JSON.parse(JSON.stringify(newEdges)),
    };
    const newHistory = history.current.slice(0, historyIndex.current + 1);
    newHistory.push(snapshot);
    history.current = newHistory;
    historyIndex.current = newHistory.length - 1;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'z') {
        if (historyIndex.current > 0) {
          historyIndex.current--;
          const { nodes, edges } = history.current[historyIndex.current];
          setNodes(nodes);
          setEdges(edges);
          setContextMenu({ visible: false, x: 0, y: 0 }); // hide context
        }
      } else if (e.ctrlKey && e.key === 'y') {
        if (historyIndex.current < history.current.length - 1) {
          historyIndex.current++;
          const { nodes, edges } = history.current[historyIndex.current];
          setNodes(nodes);
          setEdges(edges);
          setContextMenu({ visible: false, x: 0, y: 0 }); // hide context
        }
      } else if (e.key === 'Delete') {
        const newNodes = nodes.filter((n) => !n.selected);
        const newEdges = edges.filter((e) => !e.selected);
        setNodes(newNodes);
        setEdges(newEdges);
        updateHistory(newNodes, newEdges);
        setContextMenu({ visible: false, x: 0, y: 0 }); // hide context
      }
    };

    const handleClick = () => setContextMenu({ visible: false, x: 0, y: 0 });

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, [nodes, edges]);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));
    const newNode = {
      id: uuidv4(),
      type: 'custom',
      position: { x: event.clientX - 300, y: event.clientY - 100 },
      data: {
        label: data.label,
        rawType: data.type,
      },
    };
    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    updateHistory(updatedNodes, edges);
  }, [nodes, edges]);

  const onConnect = useCallback((params) => {
    const sourceNode = nodes.find((n) => n.id === params.source);
    const targetNode = nodes.find((n) => n.id === params.target);

    const sourceIsA = sourceNode?.data?.rawType === 'blockA';
    const targetIsB = targetNode?.data?.rawType === 'blockB';

    if (sourceIsA && targetIsB) {
      const updatedEdges = addEdge({
        ...params,
        animated: true,
        style: { strokeWidth: 2 },
      }, edges);
      setEdges(updatedEdges);
      updateHistory(nodes, updatedEdges);
    } else {
      alert('❌ Invalid connection: Only Block A ➝ Block B is allowed.');
    }
  }, [nodes, edges]);

  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY });
  }, []);

  return (
    <div className={`canvas ${darkMode ? 'dark' : 'light'}`} onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeContextMenu={onNodeContextMenu}
        fitView
        nodeTypes={nodeTypes}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      {contextMenu.visible && (
        <div
          style={{
            position: 'absolute',
            top: contextMenu.y,
            left: contextMenu.x,
            background: '#fff',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            fontSize: '14px',
          }}
        >
          Hello World
        </div>
      )}
    </div>
  );
}
