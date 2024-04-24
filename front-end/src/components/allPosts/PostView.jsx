
const PostView = ({ creator, title, likes, dislikes, body }) => {
    return (
        <div className="bg-gray-300 p-12 rounded-md my-6 w-[900px] ">
            <p className="mb-4 ml-2">Posted by: {creator.name}</p>
            <h1 className="mb-5 text-3xl ">{title}</h1>
            <p className="text-2xl">
                {body}
            </p>
            <div className="space-x-5 mt-5 text-xl cursor-pointer">
                <span>Likes: {likes}</span>
                <span>Dislikes: {dislikes}</span>
            </div>
        </div>
    );
};

export default PostView;