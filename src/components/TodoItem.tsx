import { Trash } from 'phosphor-react';
import { ChangeEvent, useState } from 'react';

import styles from './TodoItem.module.css';

interface TodoItemProps {
    id: string;
    content: string;
    taskCompleted: boolean;
    updateList: (text: string, isChecked: boolean) => void;
    deleteTask: (text: string) => void;
}

export function TodoItem({id, content, taskCompleted, updateList, deleteTask}:TodoItemProps){
   const [isChecked, setIsChecked] = useState(taskCompleted);

   function handleValueTaskChange(){
        setIsChecked(!isChecked);
        updateList(content, !isChecked);
    }
    
    function handleDeleteTask(){
        deleteTask(id);
    }

    return (
        <div className={styles.todoItem}>
            <label>
                <input type="checkbox" checked={isChecked} onChange={handleValueTaskChange}/>
                <span className={styles.checkmark}></span>
            </label>
            <p className={isChecked ? styles.taskCompleted : ''}>{content}</p>
            <button onClick={handleDeleteTask}>
                <Trash size={24} />
            </button>
        </div>
    )
}