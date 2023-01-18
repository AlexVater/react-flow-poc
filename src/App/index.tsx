import React, { useMemo } from "react";
import DnDFlow from "../DragNDrop";

import { TextUpdaterNode } from "../Nodes";

function App() {
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  return (
    <div className="App">
      <div style={{ height: "100vh" }}>
        <DnDFlow nodeTypes={nodeTypes} />
      </div>
    </div>
  );
}

export default App;
