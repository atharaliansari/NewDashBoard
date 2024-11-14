import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";

export default function Photos() {
    const location = useLocation();
    const [photos, setPhotos] = useState([]);

    const deletePhoto = (index) => {
        const updatedPhotos = [...photos];
        updatedPhotos.splice(index, 1);
        setPhotos(updatedPhotos);
        localStorage.setItem("Photos", JSON.stringify(updatedPhotos));
    };

    useEffect(() => {
        const savedPhotos = JSON.parse(localStorage.getItem("PHOTOs")) || [];

        if (location.state?.data) {
            const newPhoto = location.state.data;

            const isDuplicate = savedPhotos.some(
                (photo) => photo.url === newPhoto.url && photo.name === newPhoto.name
            );

            if (!isDuplicate) {
                savedPhotos.push(newPhoto);
                localStorage.setItem("PHOTOs", JSON.stringify(savedPhotos));
            }
        }

        setPhotos(savedPhotos);
    }, [location.state]);

    return (
        <>
            <div className="border rounded-lg mb-4">
                <header className="bg-black text-white flex justify-between items-center p-4">
                    <h1 className="text-xl">Photos</h1>
                    <Link to={'/DashBoard/PhotosForm'}>
                        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg">
                            + Add New Photo
                        </button>
                    </Link>
                </header>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {photos.map((photo, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                        <img src={photo.url} alt={photo.name} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{photo.name}</h3>
                            <p className="text-gray-600">${photo.price}</p>
                        </div>
                        <button
                            onClick={() => deletePhoto(index)}
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
