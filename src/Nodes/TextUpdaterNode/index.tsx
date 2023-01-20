import { useCallback } from "react";
import { Handle, Position } from "reactflow";

import styles from "./textUpadater.module.css";

const handleStyle = { left: 10 };

export const TextUpdaterNode = ({}) => {
  const onChange = useCallback((evt: { target: { value: any } }) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className={styles.textUpdaterNode}>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </div>
  );
};

export default TextUpdaterNode;
