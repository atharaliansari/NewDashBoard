import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Albums from './Albums';
import Comments from './Comments';
import Photos from './Photos';
import Posts from './Posts';
import Todos from './Todos';
import Users from './Users';
import SignUp from '../Authentication/SignUp';
import AlbumsForm from '../pagesForm/AlbumsForm';
import CommentsForm from '../pagesForm/CommentsForm';
import PhotosForm from '../pagesForm/PhotosForm';
import PostsForm from '../pagesForm/PostsForm';
import TodosForm from '../pagesForm/TodosForm';

import { IoMdAlbums } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa6";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { FiUploadCloud } from "react-icons/fi";
import { LuListTodo } from "react-icons/lu";
import { PiUsersFill } from "react-icons/pi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function DashBoard() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle link click and close the sidebar
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Mobile Navbar Toggle Button */}
      <div className="lg:hidden bg-gray-800 text-white flex items-center justify-between p-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative bg-gray-900 text-white w-64 lg:w-1/5 h-full p-4 lg:p-6 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 z-50 lg:z-auto shadow-lg`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <nav className="space-y-4">
          <Link
            to={'/DashBoard/Albums'}
            onClick={handleLinkClick}
            className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors"
          >
            <IoMdAlbums className="mr-3 text-lg" /> Albums
          </Link>
          <Link
            to={'/DashBoard/Comments'}
            onClick={handleLinkClick}
            className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors"
          >
            <FaRegCommentDots className="mr-3 text-lg" /> Comments
          </Link>
          <Link
            to={'/DashBoard/Photos'}
            onClick={handleLinkClick}
            className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors"
          >
            <TbPhotoSquareRounded className="mr-3 text-lg" /> Photos
          </Link>
          <Link
            to={'/DashBoard/Posts'}
            onClick={handleLinkClick}
            className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors"
          >
            <FiUploadCloud className="mr-3 text-lg" /> Posts
          </Link>
          <Link
            to={'/DashBoard/Todos'}
            onClick={handleLinkClick}
            className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors"
          >
            <LuListTodo className="mr-3 text-lg" /> Todos
          </Link>
          <Link
            to={'/DashBoard/Users'}
            onClick={handleLinkClick}
            className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors"
          >
            <PiUsersFill className="mr-3 text-lg" /> Users
          </Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 lg:ml-0 overflow-y-auto">
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Albums" element={<Albums />} />
          <Route path="/AlbumsForm" element={<AlbumsForm />} />
          <Route path="/Comments" element={<Comments />} />
          <Route path="/CommentsForm" element={<CommentsForm />} />
          <Route path="/Photos" element={<Photos />} />
          <Route path="/PhotosForm" element={<PhotosForm />} />
          <Route path="/Posts" element={<Posts />} />
          <Route path="/PostsForm" element={<PostsForm />} />
          <Route path="/Todos" element={<Todos />} />
          <Route path="/TodosForm" element={<TodosForm />} />
          <Route path="/Users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}
