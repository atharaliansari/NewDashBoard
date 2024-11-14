// import { Button, Input } from "antd";
// import { getDatabase, push, ref, set } from "firebase/database";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";


// export default function AlbumsForm() {

//     const db = getDatabase()
//     const [model, setModel] = useState({});
//     const [loader, setLoader] = useState(false)
//     const navigate = useNavigate()

//     const save = () => {
//         setLoader(true)
//         console.log(model)
//         const reference = push(ref(db, 'AlbumsUser', model.id))
//         set(reference, model)
//             .then((res) => {
//                 console.log(res)
//                 navigate('/DashBoard/Albums', {
//                     state: {
//                         data: model
//                     }
//                 })
//                 setLoader(false)
//             })
//             .catch((err) => {
//                 console.log(err,)
//             })

//     }
//     return (
//         <>
//             <div>
//             {loader ? (
//                     <div className="fixed inset-x-0 top-0 bottom-0 flex justify-center items-center z-50">
//                         <img
//                             className="w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/8 xl:w-1/12"
//                             src="https://res.cloudinary.com/bytesizedpieces/image/upload/v1656084931/article/a-how-to-guide-on-making-an-animated-loading-image-for-a-website/animated_loader_gif_n6b5x0.gif"
//                             alt="Loading..."
//                         />
//                     </div>
//                 ) : false}
//                 <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//                     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//                         <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Albums</h2>

//                         <div className="mb-4">
//                             <Input
//                                 placeholder="User Id"
//                                 className="border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 onChange={(e) => setModel({ ...model, id: e.target.value })}
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <Input
//                                 placeholder="Title"
//                                 className="border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 onChange={(e) => setModel({ ...model, title: e.target.value })}
//                             />
//                         </div>

//                         <div className="flex justify-center">
//                             <Button
//                                 type="primary"
//                                 className="w-full py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 onClick={save}
//                             >
//                                 Albums
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }



import { Button, Input } from "antd";
import { getDatabase, push, ref, set } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AlbumsForm() {
    const db = getDatabase();
    const [model, setModel] = useState({ id: "", title: "" });
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const save = () => {
        setLoader(true);
        const reference = push(ref(db, 'AlbumsUser', model.id));
        set(reference, model)
            .then(() => {
                navigate('/DashBoard/Albums', { state: { data: model } });
                setLoader(false);
            })
            .catch(err => {
                console.error(err);
                setLoader(false);
            });
    };

    return (
        <>
           {loader && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
                    <span className="text-white text-lg">Saving...</span>
                </div>
            )}

            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-3xl font-semibold text-center mb-6">Add Album</h2>

                    <Input
                        placeholder="User Id"
                        className="mb-4 p-4 border rounded"
                        onChange={(e) => setModel({ ...model, id: e.target.value })}
                    />
                    <Input
                        placeholder="Title"
                        className="mb-4 p-4 border rounded"
                        onChange={(e) => setModel({ ...model, title: e.target.value })}
                    />

                    <Button
                        type="primary"
                        className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md transition-transform duration-200 active:scale-95"
                        onClick={save}
                        loading={loader}
                    >
                        Save Album
                    </Button>

                </div>
            </div>
        </>
    );
}
