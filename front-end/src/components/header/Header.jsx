import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Header = () => {
    const { user, signOut } = useAuth();
    return (
        <div>
            <ul className="flex w-screen h-12 border-b items-center justify-between px-12">
                <li><Link to="/">All posts</Link></li>
                <li><Link to="/new-post">New post</Link></li>
                <li><Link to="/my-posts">My posts</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                {
                    user ?
                        (<li onClick={signOut}>Logout</li>) :
                        (<li><Link to="/singup">Singup</Link></li>)
                }
            </ul>
        </div>
    );
};

export default Header;