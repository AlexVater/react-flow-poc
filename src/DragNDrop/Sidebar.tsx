import React, {DragEvent} from 'react';
import styles from './dnd.module.css';
import customNodeStyles from '../Nodes/TextUpdaterNode/textUpadater.module.css';

const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
};

const Sidebar = () => {
    return (
        <aside className={styles.aside}>
            <div
                className='react-flow__node-input'
                onDragStart={(event: DragEvent) => onDragStart(event, 'input')}
                draggable
            >
                Input Node
            </div>
            <div
                className='react-flow__node-default'
                onDragStart={(event: DragEvent) => onDragStart(event, 'default')}
                draggable
            >
                Default Node
            </div>
            <div
                className={customNodeStyles.textUpdaterNodeEspec}
                onDragStart={(event: DragEvent) => onDragStart(event, 'textUpdater')}
                draggable
            >
                Custom Node
            </div>
            <div
                className='react-flow__node-output'
                onDragStart={(event: DragEvent) => onDragStart(event, 'output')}
                draggable
            >
                Output Node
            </div>


        </aside>
    );
};

export default Sidebar;

