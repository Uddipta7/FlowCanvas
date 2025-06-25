import React from 'react';
import { Handle, Position } from '@xyflow/react';

const BlockB = ({ data }) => {
  return (
    <div className="block block-b">
      {data.label || 'Block B'}
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default BlockB;
