// import { Input, Button } from "antd";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { signUpUser } from "../Firebase/FirebaseFunctions";
// import { getDatabase, push, ref, set } from "firebase/database";
// import app from "../Firebase/FirebaseConfig";

// export default function SignUp() {
//     const db = getDatabase(app)


//     const [model, setModel] = useState({});
//     const [loader, setLoader] = useState(false)
//     const navigate = useNavigate()


//     const save = () => {
//         setLoader(true)
//         console.log(model)
//         signUpUser(model)
//         const reference = push(ref(db, 'signUpUsers', model.id))
//         set(reference, model)
//             .then((res) => {
//                 console.log(res)
//                 navigate('/DashBoard/Users', {
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
//                 {loader ? (
//                     <div className="fixed inset-x-0 top-0 bottom-0 flex justify-center items-center z-50">
//                         <img
//                             className="w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/8 xl:w-1/12"
//                             src="https://res.cloudinary.com/bytesizedpieces/image/upload/v1656084931/article/a-how-to-guide-on-making-an-animated-loading-image-for-a-website/animated_loader_gif_n6b5x0.gif"
//                             alt="Loading..."
//                         />
//                     </div>
//                 ) : false}

//             </div>
//             <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//                 <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//                     <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Sign In</h2>

//                     <div className="mb-4">
//                         <Input
//                             placeholder="User Name"
//                             className="border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             onChange={(e) => setModel({ ...model, name: e.target.value })}
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <Input
//                             placeholder="Email"
//                             className="border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             onChange={(e) => setModel({ ...model, email: e.target.value })}
//                         />
//                     </div>

//                     <div className="mb-6">
//                         <Input.Password
//                             placeholder="Password"
//                             className="border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             onChange={(e) => setModel({ ...model, password: e.target.value })}
//                         />
//                     </div>

//                     <div className="flex justify-center">
//                         <Button
//                             type="primary"
//                             className="w-full py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             onClick={save}
//                         >
//                             Sign In
//                         </Button>
//                     </div>

//                     <div className="mt-4 text-center text-gray-600">
//                         <p>Don't have an account? <Link to={'/'} className="text-blue-500">Sign Up</Link></p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }




import { Input, Button, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../Firebase/FirebaseFunctions";
import { getDatabase, push, ref, set } from "firebase/database";
import app from "../Firebase/FirebaseConfig";

export default function SignUp() {
    const db = getDatabase(app);

    const [model, setModel] = useState({});
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    // Validation function
    const validateFields = () => {
        if (!model.name || !model.email || !model.password) {
            message.error('All fields are required');
            return false;
        }
        return true;
    };

    const save = () => {
        // Validate inputs before proceeding
        if (!validateFields()) {
            return;
        }

        setLoader(true);
        console.log(model);
        signUpUser(model);
        const reference = push(ref(db, 'signUpUsers', model.id));
        set(reference, model)
            .then((res) => {
                console.log(res);
                navigate('/DashBoard/Users', {
                    state: {
                        data: model
                    }
                });
                setLoader(false);
            })
            .catch((err) => {
                console.log(err);
                setLoader(false);
            });
    };

    return (
        <>
            <div>
            {loader && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
                    <span className="text-white text-lg">Saving...</span>
                </div>
            )}
            </div>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Sign Up</h2>

                    <div className="mb-4">
                        <Input
                            placeholder="User Name"
                            className="border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setModel({ ...model, name: e.target.value })}
                            value={model.name}
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            placeholder="Email"
                            className="border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setModel({ ...model, email: e.target.value })}
                            value={model.email}
                        />
                    </div>

                    <div className="mb-6">
                        <Input.Password
                            placeholder="Password"
                            className="border-2 border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setModel({ ...model, password: e.target.value })}
                            value={model.password}
                        />
                    </div>

                    <div className="flex justify-center">
                        <Button
                            type="primary"
                            className="w-full py-3 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={save}
                        >
                            Sign Up
                        </Button>
                    </div>

                    <div className="mt-4 text-center text-gray-600">
                        <p>Already have an account? <Link to={'/'} className="text-blue-500">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}
