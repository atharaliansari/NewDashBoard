import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

export default function Todos() {
  const location = useLocation();
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTodo, setEditTodo] = useState({ id: "", title: "", description: "" });

  const deleteTodo = (i) => {
    const updatedTodos = todos.filter((_, index) => index !== i);
    setTodos(updatedTodos);
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
  };

  const handleEdit = (i) => {
    setEditIndex(i);
    setEditTodo(todos[i]); 
  };

  const saveEdit = () => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = editTodo;
    setTodos(updatedTodos); 
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    setEditIndex(null);
    setEditTodo({ id: "", title: "", description: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  useEffect(() => {
    const dataSaved = JSON.parse(localStorage.getItem("TODOS")) || [];

    if (location.state?.data) {
      const newTodo = location.state.data;
      const exists = dataSaved.some(todo => todo.id === newTodo.id);
      if (!exists) {
        dataSaved.push(newTodo);
        localStorage.setItem("TODOS", JSON.stringify(dataSaved));
      }
    }
    setTodos(dataSaved);
  }, [location.state]);

  return (
    <>
      <header className="bg-black text-white flex justify-between items-center p-4">
        <h1 className="text-xl">Todos</h1>
        <Link to={'/DashBoard/TodosForm'}>
          <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform duration-200 active:scale-95">
            + Add New Todo
          </button>
        </Link>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left">User Id</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {todos.map((todo, i) => (
              <tr key={i} className={`hover:bg-gray-100 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <td className="py-3 px-4">
                  {editIndex === i ? (
                    <input
                      type="text"
                      name="id"
                      value={editTodo.id}
                      onChange={handleInputChange}
                      className="border p-2 rounded"
                    />
                  ) : (
                    todo.id
                  )}
                </td>
                <td className="py-3 px-4">
                  {editIndex === i ? (
                    <input
                      type="text"
                      name="title"
                      value={editTodo.title}
                      onChange={handleInputChange}
                      className="border p-2 rounded"
                    />
                  ) : (
                    todo.title
                  )}
                </td>
                <td className="py-3 px-4">
                  {editIndex === i ? (
                    <input
                      type="text"
                      name="description"
                      value={editTodo.description}
                      onChange={handleInputChange}
                      className="border p-2 rounded"
                    />
                  ) : (
                    todo.description
                  )}
                </td>
                <td className="py-3 px-4 flex space-x-4 items-center">
                  {editIndex === i ? (
                    <button
                      onClick={saveEdit}
                      className="text-green-500 hover:text-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(i)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <MdEdit />
                    </button>
                  )}
                  <button
                    onClick={() => deleteTodo(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
