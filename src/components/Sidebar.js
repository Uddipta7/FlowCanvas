import blocks from '../data/blocks.json';
import '../customStyles.css';

export default function Sidebar() {
  const onDragStart = (event, block) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({
      type: block.type,
      label: block.label,
    }));
    event.dataTransfer.effectAllowed = 'move';
  };

  const getIcon = (type) => {
    if (type === 'blockA') return '🟠';
    if (type === 'blockB') return '🔵';
    return '📦';
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Available Blocks</h3>
      {blocks.map((block) => (
        <div
          key={block.id}
          onDragStart={(event) => onDragStart(event, block)}
          draggable
          className={`draggable-block ${block.type}`}
        >
          <div className="block-icon">{getIcon(block.type)}</div>
          <div className="block-label">{block.label}</div>
        </div>
      ))}
    </div>
  );
}
