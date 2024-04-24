import { useAuth } from "../../context/AuthProvider";
import { useState, useEffect } from 'react';
import { request } from "../../config/axios-helper";
import MyPostView from "./MyPostView";

const MyPosts = () => {

    const { user } = useAuth();

    const [myPosts, setMyPosts] = useState([]);
    console.log("🚀 ~ MyPosts ~ myPosts:", myPosts)


    useEffect(() => {
        request("get", `/post/${user.userId}`)
            .then(({ data }) => {
                setMyPosts(data);
            })
    }, [user.userId])


    return (
        <div className="min-h-[857px] w-full flex flex-col items-center p-12 overflow-auto">
            <h1 className="text-5xl mb-20">My Postss</h1>
            <ul>
                {myPosts.map(post => (
                    <li key={post._id}>
                        <MyPostView creator={post.creator} title={post.title} body={post.body} likes={post.likes} dislikes={post.dislikes} id={post._id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default MyPosts;