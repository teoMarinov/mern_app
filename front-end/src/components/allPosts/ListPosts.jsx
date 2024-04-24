import { request } from "../../config/axios-helper";
import { useState, useEffect } from 'react';
import PostView from "./PostView";

const ListPosts = () => {

    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        request("get", "/post/all-posts")
            .then(({ data }) => {
                setAllPosts(data);
            })
    }, [])


    return (
        <div className="min-h-[857px] w-full flex flex-col items-center p-12 overflow-auto">
            <h1 className="text-5xl mb-20">All Postss</h1>
            <ul>
                {allPosts.map(post => (
                    <li key={post._id}>
                        <PostView creator={post.creator} title={post.title} body={post.body} likes={post.likes} dislikes={post.dislikes} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListPosts;