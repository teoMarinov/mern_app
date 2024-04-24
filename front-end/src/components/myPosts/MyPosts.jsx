import { useAuth } from "../../context/AuthProvider";
import { useState, useEffect } from 'react';
import { request } from "../../config/axios-helper";
import MyPostView from "./MyPostView";

const MyPosts = () => {

    const { user } = useAuth();

    const [myPosts, setMyPosts] = useState([]);

    const getPosts = () => {
        request("get", `/post/${user.userId}`)
            .then(({ data }) => {
                setMyPosts(data);
            })
    }

    const onDelete = (id) => {
        request("delete", `post/${id}`)
            .then(() => getPosts())
    }

    const onLike = (id) => {
        request("put", `post/like/${id}`)
            .then(() => getPosts())
    }

    const onDislike = (id) => {
        request("put", `post/dislike/${id}`)
            .then(() => getPosts())
    }

    useEffect(() => {
        getPosts()
    }, [])


    return (
        <div className="min-h-[857px] w-full flex flex-col items-center p-12 overflow-auto">
            <h1 className="text-5xl mb-20">My Postss</h1>
            <ul>
                {myPosts.map(post => (
                    <li key={post._id}>
                        <MyPostView
                            creator={post.creator}
                            title={post.title}
                            body={post.body}
                            likes={post.likes}
                            dislikes={post.dislikes}
                            onDelete={() => onDelete(post._id)}
                            onLike={() => onLike(post._id)}
                            onDislike={() => onDislike(post._id)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default MyPosts;