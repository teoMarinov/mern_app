import { useState, useEffect } from 'react';
import { request } from '../../config/axios-helper';
import { useNavigate } from 'react-router-dom';
const NewPost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const nav = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault();
        setTitle("");
        setBody("");

        request("post", "/post/new-post", { title, body })
            .catch((e) => console.log(e))
            .then(() => nav('/'))
    };
    return (
        <div className="h-[857px] w-full">
            <p className="w-full text-center py-6 text-5xl">NewPosts</p>
            <form onSubmit={onSubmit} className="max-w-md mx-auto mt-8">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block h-8 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                        Body:
                    </label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        rows="5"
                        className="mt-1 block w-full border h-44 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default NewPost;