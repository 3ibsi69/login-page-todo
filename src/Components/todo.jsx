import axios from 'axios';
import { useEffect, useState } from 'react';


function TodoForm() {
   const [todos,setTodos]=useState([]);
   const [newtodo,setNewTodo]=useState('');
   const [name,setName]=useState('');
   const [id,setId]=useState('');

   useEffect(()=>{

    axios.get('http://localhost:3636/signup').then((res)=>{
        setName(res.data[0].name);

    }).catch((err)=>{
        console.log(err);
    });

        axios.get('http://localhost:3636/todo').then((res)=>{
            setTodos(res.data);
        }).catch((err)=>{
            console.log(err);
        });
    },[]);
    const addtodo=()=>{
        if(newtodo===''){
            alert('Please enter a todo');
            return;
        }
    
        axios.post('http://localhost:3636/todo',{todo:newtodo})
        .then((res)=>{
            const createdTodo=res.data;
            setTodos([...todos,createdTodo]); 
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    const deletetodo=(id)=>{
        axios.delete(`http://localhost:3636/todo/${id}`)
        .then((res)=>{
            const deletedTodo=res.data;
            const filteredTodos=todos.filter((todo)=>todo._id!==deletedTodo._id);
            setTodos(filteredTodos);
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    const edittodo=(id)=>{
        const edittodo=prompt('Enter your new todo');
        if(edittodo===''){
            alert('Please enter a todo');
            return;
        }
        axios.put(`http://localhost:3636/todo/${id}`,{todo:edittodo})
        .then((res)=>{
            const editedTodo=res.data;
            const editedTodos=todos.map((todo)=>{
                if(todo._id===editedTodo._id){
                    return editedTodo;
                }
                return todo;
            });
            setTodos(editedTodos);
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    
  return (
    <div className="todo-form">
    <div className="container-todo">
        <h1>welcome {name}  </h1>
      <div className="inputs">
        <input className="input" type="text" placeholder="Enter your todo.... " value={newtodo} onChange={(e)=>setNewTodo(e.target.value)} />
        <button id="add-btn" onClick={addtodo}>Add</button>
      </div>
      <hr />
      
      <div className="todos">
        <div className="todo">
           {todos.map((todo)=>(

            <div className="todo-item" key={todo._id}>
                <p>{todo.todo}</p>
                <svg onClick={()=>edittodo(todo._id)} id="edit" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6V19ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Zm-3.525-.725l-.7-.7l1.4 1.4l-.7-.7Z"/></svg>
                <svg onClick={()=>deletetodo(todo._id)} id="del" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24ZM100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0Zm48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0Z"/></svg>

                
                </div>
           ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default TodoForm;