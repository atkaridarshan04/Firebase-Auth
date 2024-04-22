import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { app } from "../firebaseConfig"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import GoogleOAuth from "../components/GoogleOAuth";
import GitHubOAuth from "../components/GitHubOAuth";


export default function Signin() {

    const auth = getAuth();

    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                setLoading(false)

                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                setError(errorMessage)
                setLoading(false)
            });
    }

    return (
        <div className="w-[80%] min-h-[70vh] sm:min-h-[80vh] sm:pt-10 pt-20 sm:max-w-[35vw] mx-auto flex flex-col">
            <div className="flex flex-col ">

                <h1 className="text-5xl font-bold mb-7 mx-auto">Sign In</h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="text" id="email" className="grow" placeholder="Email" onChange={handleChange} />
                    </label>

                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password" id="password" className="grow" placeholder="Password" onChange={handleChange} />
                    </label>

                    {error && <div role="alert" className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{error}</span>
                    </div>}

                    <button disabled={loading} className="btn btn-outline" >
                        {loading ? "Loading..." : "Sign In"}
                    </button>

                    <div className="flex mx-auto justify-between gap-6 w-full">
                        <GoogleOAuth />
                        <GitHubOAuth />
                    </div>

                </form>

                <div className="flex sm:flex-row flex-col gap-3 justify-between py-6">
                    <p>Dont have an account? <Link to="/sign-up" className="link link-primary">Sign up</Link></p>
                </div>

            </div>
        </div>
    )
}