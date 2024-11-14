import { useState } from "react";
import { getDatabase, push, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";

export default function TodosForm() {
    const db = getDatabase();
    const [model, setModel] = useState({});
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const save = () => {
        setLoader(true);
        console.log(model);
        const reference = push(ref(db, 'Todos'));
        set(reference, model)
            .then(() => {
                navigate('/DashBoard/Todos', {
                    state: {
                        data: model
                    }
                });
                setLoader(false);
            })
            .catch((err) => {
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
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-3xl font-semibold text-center mb-6">Add Todo</h2>
                    <div className="mb-4">
                        <Input
                            placeholder="Todo Title"
                            className="border-2 border-gray-300 p-4 rounded-lg"
                            onChange={(e) => setModel({ ...model, title: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            placeholder="Description"
                            className="border-2 border-gray-300 p-4 rounded-lg"
                            onChange={(e) => setModel({ ...model, description: e.target.value })}
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="primary" className="w-full py-3 rounded-lg bg-blue-500 text-white" onClick={save}>
                            Add Todo
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
