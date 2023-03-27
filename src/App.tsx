
import { useState } from 'react';

import { Header } from './components/Header';
import { CreateTodo } from './components/CreateTodo';
import { TodoItem } from './components/TodoItem'

import Clipboard from './assets/Clipboard.svg';

import styles from './App.module.css';

import './global.css'

export interface ListItems {
  id: string;
  content: string;
  taskCompleted: boolean;
}


function App() {
  const [list, setList] = useState<ListItems[]>([])


  function updateList(text: string, isChecked:boolean){

    const atualizedList = list.map(item => {
      if(item.content === text){
        item.taskCompleted = isChecked;
      }

      return item;
    })

    setList(atualizedList);
  }


  function deleteTask(id: string){

    const newList = list.filter(item => { 
        return item.id !== id;
    });


    setList(newList);
  }

  const isTasks = list.length > 0;
  const amountOfTasks = list.length;
  const completedTasks = list.filter(item => item.taskCompleted).length;

  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <CreateTodo list={list} setList={setList}/>

        <div className={styles.todoList}>
          <header className={styles.header}>
              <div className={styles.tasksCreated}>
                <p>Tarefas criadas</p>
                <span>{amountOfTasks}</span>
              </div>

              <div className={styles.tasksCompleted}>
                <p>Concluídas</p>
                <span>{completedTasks}</span>
              </div>
          </header>

          <div className={styles.list}>
              {!isTasks ?  
                <div className={styles.noChores}>
                  <img src={Clipboard} alt="imagem de uma caderneta de tarefas" />
                  <p>Você ainda não tem tarefas cadastradas</p>
                  <p>Crie tarefas e organize seus itens a fazer</p>
                </div> 
              : list.map(item => < TodoItem 
                            key={item.id}
                            id={item.id} 
                            content={item.content} 
                            taskCompleted={item.taskCompleted}
                            updateList={updateList}
                            deleteTask={deleteTask}
                          />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
