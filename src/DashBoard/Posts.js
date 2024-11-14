import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";

export default function Posts() {
    const location = useLocation();
    const [posts, setPosts] = useState([]);

    const deletePost = (index) => {
        const updatedPosts = [...posts];
        updatedPosts.splice(index, 1);
        setPosts(updatedPosts);
        localStorage.setItem("Posts", JSON.stringify(updatedPosts));
    };

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem("Posts")) || [];

        if (location.state?.data) {
            const newPost = location.state.data;
            savedPosts.push(newPost);
            localStorage.setItem("Posts", JSON.stringify(savedPosts));
        }

        setPosts(savedPosts);
    }, [location.state]);

    return (
        <>
            <div className="border rounded-lg mb-4">
                <header className="bg-black text-white flex justify-between items-center p-4">
                    <h1 className="text-xl">Posts</h1>
                    <Link to={'/DashBoard/PostsForm'}>
                        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg">
                            + Add New Post
                        </button>
                    </Link>
                </header>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {posts.map((post, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                        <img src={post.imageURL} alt={post.title} className="w-full h-40 object-cover rounded-t-lg" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{post.title}</h3>
                            <p className="text-gray-600">{post.description}</p>
                        </div>
                        <button
                            onClick={() => deletePost(index)}
                            className="text-red-500 hover:text-red-700 mt-2"
                        >
                            <MdDelete className="text-2xl" />
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
