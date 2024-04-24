import { useNavigate } from "react-router-dom";
import { request } from "../../config/axios-helper"

const MyPostView = ({ creator, title, likes, dislikes, body, onDelete }) => {
    const nav = useNavigate



    return (
        <div className="bg-gray-300 p-12 rounded-md my-6 w-[900px] ">

            <div className="mb-4 ml-2 flex justify-between">
                <p>
                    Posted by: {creator.name}
                </p>
                <div className="flex gap-x-4">
                    <p onClick={onDelete} className="cursor-pointer">delete</p>
                    <p className="cursor-pointer">edit</p>
                </div>
            </div>
            <h1 className="mb-5 text-3xl ">{title}</h1>
            <p className="text-2xl">
                {body}
            </p>
            <div className="space-x-5 mt-5 text-xl cursor-pointer">
                <span>Likes: {likes}</span>
                <span >Dislikes: {dislikes}</span>
            </div>
        </div>
    );
};

export default MyPostView;