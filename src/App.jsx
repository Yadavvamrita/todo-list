import {useState, useEffect} from 'react'
import TodoInput  from "./components/Todoinput"
import TodoList from "./components/TodoList"



function App() {

  const[todos, setTodos]= useState([ ])
  const [todoValue, setTodosValue]= useState('')

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({ todos: newList}))
  }
  function handleAddTodos(newTodo){
    if(!newTodo.trim())return
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodos(index){
    const newTodoList = todos.filter((todo, todoIndex)=>{
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }
  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodosValue(valueToBeEdited)
    handleDeleteTodos(index)
  }
   
  useEffect(()=>{
    if (!localStorage){
      return
    }
    let localTodo = localStorage.getItem('todos')
    if (!localTodo){
      return
    }
    console.log(localTodo)
    localTodo = JSON.parse(localTodo).todos
    setTodos(localTodo)
  }, [])
  return (
    <>
<TodoInput todoValue={todoValue} setTodoValue = {setTodosValue}
  handleAddTodos= {handleAddTodos}/>
<TodoList handleEditTodo = {handleEditTodo} 
 handleDeleteTodos = {handleDeleteTodos}
todos ={todos}/>
    </>
    
  
  )
}

export default App
