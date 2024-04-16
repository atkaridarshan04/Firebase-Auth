import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { app } from "../firebaseConfig"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function GoogleOAuth() {

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleGoogleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        signInWithPopup(auth, googleProvider)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
                setLoading(false)

                navigate('/sign-in');
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
        <div className="w-[50%] mx-auto">
            {error && <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
            </div>}

            <button disabled={loading} onClick={handleGoogleSubmit} className="btn btn-outline btn-info w-full uppercase">Continue with Google</button>
        </div>
    )

}