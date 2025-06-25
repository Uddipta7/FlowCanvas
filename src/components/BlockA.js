import React from 'react';
import { Handle, Position } from '@xyflow/react';

const BlockA = ({ data }) => {
  return (
    <div className="block block-a">
      {data.label || 'Block A'}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default BlockA;
