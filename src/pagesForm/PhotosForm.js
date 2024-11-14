import { Button, Input } from "antd";
import { getDatabase, push, ref, set } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PhotosForm() {
    const db = getDatabase();
    const [model, setModel] = useState({});
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const save = () => {
        setLoader(true);
        console.log(model);
        const reference = push(ref(db, 'Photos', model.id));
        set(reference, model)
            .then(() => {
                navigate('/DashBoard/Photos', {
                    state: { data: model }
                });
                setLoader(false);
            })
            .catch((err) => {
                console.error(err);
                setLoader(false);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
           {loader && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
                    <span className="text-white text-lg">Saving...</span>
                </div>
            )}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Add Photo</h2>

                <div className="mb-4">
                    <Input
                        placeholder="Photo URL"
                        onChange={(e) => setModel({ ...model, url: e.target.value })}
                        className="border-2 border-gray-300 rounded-lg p-4"
                    />
                </div>
                <div className="mb-4">
                    <Input
                        placeholder="Name"
                        onChange={(e) => setModel({ ...model, name: e.target.value })}
                        className="border-2 border-gray-300 rounded-lg p-4"
                    />
                </div>
                <div className="mb-4">
                    <Input
                        placeholder="Price"
                        type="number"
                        onChange={(e) => setModel({ ...model, price: e.target.value })}
                        className="border-2 border-gray-300 rounded-lg p-4"
                    />
                </div>

                <Button
                    type="primary"
                    className="w-full py-3 bg-green-500 text-white rounded-lg"
                    onClick={save}
                >
                    Save Photo
                </Button>
            </div>
        </div>
    );
}
