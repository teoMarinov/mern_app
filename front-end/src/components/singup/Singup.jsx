import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { request } from '../../config/axios-helper';

const Singup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useAuth();
    const nav = useNavigate()

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        request('post', "/auth/register", { name, email, password })
            .then(() => {
                nav("/singin")
            })
            .catch(e => console.log(e))
            .finally(() => signIn())
    };

    return (
        <div className="h-[857px] w-full flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-7">Singup</h1>
            <form onSubmit={onSubmit} className="w-96 pb-3">
                <label className="block mb-2">
                    <span className="text-gray-700">Name:</span>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </label>
                <label className="block mb-2">
                    <span className="text-gray-700">Email:</span>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Password:</span>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </label>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
            <Link to="/singin">Login</Link>

        </div>
    );
};

export default Singup;
