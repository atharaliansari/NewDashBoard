import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";


export default function Users() {
    const location = useLocation();
    const [user, setUser] = useState([]);

    const deleteList = (i) => {
        user.splice(i, 1)
        setUser([...user])
    }

    useEffect(() => {
        const dataSaved = JSON.parse(localStorage.getItem("USERS")) || [];

        if (location.state?.data) {
            const newUser = location.state.data;
            const existData = dataSaved.some(user => user.email === newUser.email);

            if (!existData) {
                dataSaved.push(newUser);
                localStorage.setItem("USERS", JSON.stringify(dataSaved));
            }
        }

        setUser(dataSaved);
    }, [location.state]);

    return (
        <div>



            <header className="bg-black text-white flex justify-between items-center p-4">
                <h1 className="text-xl">Albums</h1>
                <Link to={'/DashBoard/SignUp'}>
                    <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform duration-200 active:scale-95">
                        SignUp
                    </button>
                </Link>
            </header>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold text-sm sm:text-base md:text-lg">User Name</th>
                            <th className="py-3 px-4 text-left font-semibold text-sm sm:text-base md:text-lg">Email</th>
                            <th className="py-3 px-4 text-left font-semibold text-sm sm:text-base md:text-lg">Password</th>
                            <th className="py-3 px-4 text-left font-semibold text-sm sm:text-base md:text-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {user.map((x, i) => (
                            <tr key={i} className={`hover:bg-gray-100 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                <td className="py-3 px-4 text-sm sm:text-base md:text-lg">{x.name}</td>
                                <td className="py-3 px-4 text-sm sm:text-base md:text-lg">{x.email}</td>
                                <td className="py-3 px-4 text-sm sm:text-base md:text-lg">{x.password}</td>
                                <td className="py-3 px-4 flex justify-between items-center">
                                    {/* Actions Column Content */}
                                    <button
                                        onClick={() => deleteList(i)}
                                        className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
                                    >
                                        <MdDelete className="text-lg sm:text-xl md:text-2xl text-black" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}