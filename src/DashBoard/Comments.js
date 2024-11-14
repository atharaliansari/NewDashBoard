// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { MdDelete } from "react-icons/md";


// export default function Comments() {
//     const location = useLocation();
//     const [user, setUser] = useState([]);

//     const deleteList = (i) => {
//         user.splice(i, 1)
//         setUser([...user])
//     }

//     useEffect(() => {
//         const dataSaved = JSON.parse(localStorage.getItem("USER")) || [];

//         if (location.state?.data) {
//             const userNew = location.state.data;
//             const existData = dataSaved.some(user => user.id === userNew.id);

//             if (!existData) {
//                 dataSaved.push(userNew);
//                 localStorage.setItem("USER", JSON.stringify(dataSaved));
//             }
//         }

//         setUser(dataSaved);
//     }, [location.state]);

//     return (
//         <>
//             <div className="border rounded-lg mb-4">
//                 <header className="bg-black text-white flex justify-between items-center p-4">
//                     <div className="text-start">
//                         <h1 className="text-xl sm:text-2xl md:text-3xl">Users</h1>
//                     </div>
//                     <div className="text-end">
//                         <Link to={'/DashBoard/CommentsForm'} className="text-white hover:text-cyan-400 text-sm sm:text-base md:text-lg">Feed</Link>
//                     </div>
//                 </header>
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//                     <thead className="bg-gray-100 text-gray-600">
//                         <tr>
//                             <th className="py-3 px-4 text-left font-semibold text-sm sm:text-base md:text-lg">User Id</th>
//                             <th className="py-3 px-4 text-left font-semibold text-sm sm:text-base md:text-lg">Title</th>
//                             <th className="py-3 px-4 text-left font-semibold text-sm sm:text-base md:text-lg">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="text-gray-700">
//                         {user.map((x, i) => (
//                             <tr key={i} className={`hover:bg-gray-100 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
//                                 <td className="py-3 px-4 text-sm sm:text-base md:text-lg">{x.id}</td>
//                                 <td className="py-3 px-4 text-sm sm:text-base md:text-lg">{x.title}</td>
//                                 <td className="py-3 px-4 flex justify-between items-center">
//                                     {/* Actions Column Content */}
//                                     <button
//                                         onClick={() => deleteList(i)}
//                                         className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
//                                     >
//                                         <MdDelete className="text-lg sm:text-xl md:text-2xl text-black" />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// }









// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { MdDelete } from "react-icons/md";

// export default function Comments() {
//     const location = useLocation();
//     const [user, setUser] = useState([]);

//     const deleteList = (i) => {
//         user.splice(i, 1);
//         setUser([...user]);
//     };

//     useEffect(() => {
//         const dataSaved = JSON.parse(localStorage.getItem("Users")) || [];
//         if (location.state?.data) {
//             const newComment = location.state.data;
//             const exists = dataSaved.some(user => user.comment === newComment.comment);
//             if (!exists) {
//                 dataSaved.push(newComment);
//                 localStorage.setItem("Users", JSON.stringify(dataSaved));
//             }
//         }
//         setUser(dataSaved);
//     }, [location.state]);

//     return (
//         <>
//             <div className="border rounded-lg mb-4">
//                 <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
//                     <h1 className="text-xl">Comments</h1>
//                     <Link to={'/DashBoard/CommentsForm'} className="text-white hover:text-cyan-400">Add Comment</Link>
//                 </header>
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//                     <thead className="bg-gray-100 text-gray-600">
//                         <tr>
//                             <th className="py-3 px-4 text-left">Comment</th>
//                             <th className="py-3 px-4 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {user.map((x, i) => (
//                             <tr key={i} className={`hover:bg-gray-100 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
//                                 <td className="py-3 px-4">{x.comment}</td>
//                                 <td className="py-3 px-4">
//                                     <button
//                                         onClick={() => deleteList(i)}
//                                         className="text-red-500 hover:text-red-700"
//                                     >
//                                         <MdDelete className="text-xl" />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// }




import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

export default function Comments() {
    const location = useLocation();
    const [user, setUser] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editComment, setEditComment] = useState("");

    const deleteList = (i) => {
        const updatedUsers = user.filter((_, index) => index !== i);
        setUser(updatedUsers);
        localStorage.setItem("Users", JSON.stringify(updatedUsers));
    };

    const handleEdit = (i) => {
        setEditIndex(i);
        setEditComment(user[i].comment);
    };

    const saveEdit = () => {
        const updatedUsers = [...user];
        updatedUsers[editIndex].comment = editComment;
        setUser(updatedUsers);
        localStorage.setItem("Users", JSON.stringify(updatedUsers));
        setEditIndex(null);
        setEditComment("");
    };

    useEffect(() => {
        const dataSaved = JSON.parse(localStorage.getItem("USEr")) || [];
        if (location.state?.data) {
            const newComment = location.state.data;
            const exists = dataSaved.some(user => user.comment === newComment.comment);
            if (!exists) {
                dataSaved.push(newComment);
                localStorage.setItem("USEr", JSON.stringify(dataSaved));
            }
        }
        setUser(dataSaved);
    }, [location.state]);

    return (
        <>
            <div className="border rounded-lg mb-4">
                <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                    <h1 className="text-xl">Comments</h1>
                    <Link to={'/DashBoard/CommentsForm'} className="text-white hover:text-cyan-400">
                        Add Comment
                    </Link>
                </header>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="py-3 px-4 text-left">Comment</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((x, i) => (
                            <tr key={i} className={`hover:bg-gray-100 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                <td className="py-3 px-4">
                                    {editIndex === i ? (
                                        <input
                                            type="text"
                                            value={editComment}
                                            onChange={(e) => setEditComment(e.target.value)}
                                            className="border p-2 rounded w-full"
                                        />
                                    ) : (
                                        x.comment
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
                                        onClick={() => deleteList(i)}
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
