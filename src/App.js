import { ReactFlowProvider } from '@xyflow/react';
import Sidebar from './components/Sidebar';
import FlowCanvas from './components/FlowCanvas';
import './App.css';

function App() {
  return (
    <div className="app">
      <ReactFlowProvider>
        <FlowCanvas />
      </ReactFlowProvider>
      <Sidebar /> {/* Now on the right side */}
    </div>
  );
}

export default App;
