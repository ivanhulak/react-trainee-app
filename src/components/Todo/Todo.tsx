import { useEffect, useState } from 'react';
import './todo.css'
import close_icon from './close-icon.svg';
import { v4 as uuidv4 } from 'uuid';
import randomColor from 'randomcolor';
import Draggable, { DraggableData } from 'react-draggable';
import { useTranslation } from 'react-i18next';

type TodoItemType = {
  id: string
  item: string
  color: { luminosity: string }
  defaultPos: { x: number, y: number }
}

export const Todo = () => {
  const {t} = useTranslation(['todos'])
  const [itemValue, setItemValue] = useState('')
  const [todos, setTodos] = useState(() => {
    const todos = localStorage.getItem('todos');
    if (todos) {
      return JSON.parse(localStorage.getItem('todos') || '');
    } else {
      return [];
    }
  })
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  const createTodoItem = () => {
    if (itemValue.trim() !== '') {
      const newTodoItem = {
        id: uuidv4(),
        item: itemValue,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPos: { x: -100, y: -100 }
      }
      setTodos((todos: TodoItemType[]) => [...todos, newTodoItem])
      setItemValue('')
    } else {
      alert('Enter something')
    }
  }
  const deleteItem = (itemId: string) => {
    setTodos(todos.filter((item: TodoItemType) => item.id !== itemId))
  }
  const updatePos = (data: DraggableData, itemId: string) => {
    let newTodos = [...todos]
    newTodos.forEach((elem: TodoItemType) => {
      if(elem.id === itemId) {
        elem.defaultPos = {x: data.x, y: data.y}
      }
    })
    setTodos(newTodos)
  }

  return (
    <div className='todo-wrapper'>
      <div>
        <input
          className='todo-input'
          type="text"
          placeholder={`${t('placeholder')}`}
          value={itemValue}
          onChange={(e) => setItemValue(e.target.value)} />
        <button onClick={createTodoItem} className='btn btn-lg btn-dark'>{t('enter')}</button>
      </div>
      {todos.map((item: TodoItemType) => {
        return (
          <Draggable
            key={item.id}
            defaultPosition={item.defaultPos}
            onStop={(_, data: DraggableData) => {
              updatePos(data, item.id)
            }}
          >
            <div className='todo-item' style={{ backgroundColor: `${item.color}` }}>
              {item.item}
              <button className='delete-todoItem' onClick={() => deleteItem(item.id)}>
               <img src={close_icon} alt="" />
              </button>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

