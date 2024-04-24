import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <ul className="flex w-screen h-12 border-b items-center justify-between px-12">
                <li><Link to="/">All posts</Link></li>
                <li><Link to="/add">New post</Link></li>
                <li><Link to="/update">Update Post</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/singup">Singup</Link></li>
            </ul>
        </div>
    );
};

export default Header;