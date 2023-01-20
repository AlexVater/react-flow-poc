import {DragEvent, useEffect, useState} from "react";
import {
    addEdge,
    Connection,
    Edge,
    Node,
    NodeOrigin,
    ReactFlowInstance,
    useEdgesState,
    useNodesState,
    Position
} from "reactflow";
// @ts-ignore
import dagre from "dagre";

const initialNodes: Node[] = [
    {
        id: "1",
        type: "textUpdater",
        data: {label: "input node"},
        position: {x: 500, y: 300},
    },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const useDragAndDrop = () => {
    const [reactFlowInstance, setReactFlowInstance] =
        useState<ReactFlowInstance>();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodeName, setNodeName] = useState<string>("Node 1");

    const onDragOver = (event: DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    };



    const nodeOrigin: NodeOrigin = [0.5, 0.5];

    const initBgColor = "#ffffff";

    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const nodeColor = (nodes: Node) => {
        switch (nodes.type) {
            case 'input':
                return '#0041d0';
            case 'output':
                return '#ff0072';
            case 'textUpdater':
                return '#5922ac';
            default:
                return '#c3c3c3';
        }
    };

    const onConnect = (params: Connection | Edge) =>
        setEdges((eds) => addEdge(params, eds));

    const onInit = (rfi: ReactFlowInstance) => {
        setReactFlowInstance(rfi)
        onLayout('TB')
    };

    const onLayout = (direction: string) => {
        const isHorizontal = direction === 'LR';
        dagreGraph.setGraph({rankdir: direction});

        nodes.forEach((node) => {
            dagreGraph.setNode(node.id, {width: 150, height: 50});
        });

        edges.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target);
        });

        dagre.layout(dagreGraph);

        const layoutedNodes = nodes.map((node) => {
            const nodeWithPosition = dagreGraph.node(node.id);
            node.targetPosition = isHorizontal ? Position.Left : Position.Top;
            node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
            node.position = {
                x: nodeWithPosition.x + Math.random() / 1000,
                y: nodeWithPosition.y,
            };

            return node;
        });

        setNodes(layoutedNodes);
    };

    const onDrop = (event: DragEvent) => {
        event.preventDefault();
        if (reactFlowInstance) {
            const type = event.dataTransfer.getData("application/reactflow");
            const position = reactFlowInstance.project({
                x: event.clientX,
                y: event.clientY - 40,
            });
            const newNode: Node = {
                id: getId(),
                type,
                position,
                data: {label: `${type} node`},
            };

            setNodes((nds) => nds.concat(newNode));
        }
    };

    useEffect(() => {
        setNodes((nds) =>
            nds.map((n) => {
                if (n.id === "1") {
                    n.data = {
                        ...n.data,
                        label: nodeName,
                    };
                }

                return n;
            })
        );
    }, [nodeName]);

    return {
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
    }

}

export default useDragAndDrop
