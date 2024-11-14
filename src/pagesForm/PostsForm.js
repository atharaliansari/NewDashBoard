import { useState } from "react";
import { getDatabase, push, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";

export default function PostsForm() {
    const [model, setModel] = useState({});
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const db = getDatabase();

    const savePost = () => {
        setLoader(true);
        const reference = push(ref(db, 'Posts'));
        set(reference, model)
            .then(() => {
                navigate('/DashBoard/Posts', { state: { data: model } });
                setLoader(false);
            })
            .catch((error) => {
                console.log(error);
                setLoader(false);
            });
    };

    return (
        <>
            {loader && <div className="fixed inset-0 flex items-center justify-center">Loading...</div>}
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-3xl font-semibold text-center mb-6">Add New Post</h2>
                    <Input
                        placeholder="Title"
                        className="mb-4"
                        onChange={(e) => setModel({ ...model, title: e.target.value })}
                    />
                    <Input
                        placeholder="Description"
                        className="mb-4"
                        onChange={(e) => setModel({ ...model, description: e.target.value })}
                    />
                    <Input
                        placeholder="Image URL"
                        className="mb-4"
                        onChange={(e) => setModel({ ...model, imageURL: e.target.value })}
                    />
                    <Button type="primary" block onClick={savePost}>
                        Save Post
                    </Button>
                </div>
            </div>
        </>
    );
}
