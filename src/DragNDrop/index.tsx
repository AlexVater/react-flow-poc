import ReactFlow, {
    ReactFlowProvider,
    Controls,
    Background,
    MiniMap,
} from "reactflow";
import useDragAndDrop from "./useDragAndDrop";
import Sidebar from "./Sidebar";

import styles from "./dnd.module.css";
import "reactflow/dist/style.css";

// @ts-ignore
const DnDFlow = ({nodeTypes}) => {
    const {
        nodes,
        edges,
        onEdgesChange,
        onNodesChange,
        onConnect,
        onInit,
        onDrop,
        onDragOver,
        nodeOrigin,
        initBgColor,
        nodeName,
        setNodeName,
        onLayout,
        nodeColor
    } = useDragAndDrop();

    return (
        <div className={styles.dndflow}>
            <ReactFlowProvider>
                <div className={styles.wrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onEdgesChange={onEdgesChange}
                        onNodesChange={onNodesChange}
                        onConnect={onConnect}
                        onInit={onInit}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        nodeOrigin={nodeOrigin}
                        style={{background: initBgColor}}
                        nodeTypes={nodeTypes}
                    >
                        <Controls/>
                        <Background />
                        <MiniMap nodeColor={nodeColor} style={{background: initBgColor}}/>
                        {/*<div className={styles.controls}>*/}
                        {/*    <label>label:</label>*/}
                        {/*    <input*/}
                        {/*        value={nodeName}*/}
                        {/*        onChange={(evt) => setNodeName(evt.target.value)}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </ReactFlow>
                </div>
                <div className={styles.buttons}>
                    <button onClick={() => onLayout('TB')}>
                        vertical layout
                    </button>
                    <button onClick={() => onLayout('LR')} >
                        horizontal layout
                    </button>
                    <Sidebar/>
                </div>

            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
