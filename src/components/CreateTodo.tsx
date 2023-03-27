
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import plusIcon from './../assets/plus.svg';

import { ListItems } from '../App'

import styles from './CreateTodo.module.css';

interface CreateTodoProps {
    list: ListItems[];
    setList: (list:ListItems[]) => void
}

export function CreateTodo({list, setList}:CreateTodoProps){
    const [newItem, setNewItem] = useState('');

    function handleNewItemChange(event:ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity('');
        setNewItem(event.target.value);
    }

    function handleCreateNewItem(event:FormEvent<HTMLFormElement>){
        event.preventDefault();

        const id = (Math.random() * 5000).toString().replace('.', '');

        if(newItem.trim().length > 0){
            setList([...list, {id: id, content: newItem, taskCompleted: false}]);
            setNewItem('');
        }
    }

    function handleNewItemInvalid(event:InvalidEvent<HTMLInputElement>){
        event.target.setCustomValidity('Esse campo é obrigatório');
    }

    return (
        <form onSubmit={handleCreateNewItem} className={styles.createTodoForm}>
            <input 
                className={styles.createTodoField} 
                type="text" 
                placeholder='Adicione uma nova tarefa'
                value={newItem} 
                onChange={handleNewItemChange}
                onInvalid={handleNewItemInvalid}
                required
            />
            <button 
                className={styles.createTodoButton}
                type="submit">Criar
                <img src={plusIcon} alt="icone de mais" 
            />
            </button>
        </form>
    )
}