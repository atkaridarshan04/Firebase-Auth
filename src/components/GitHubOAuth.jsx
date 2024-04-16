import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function GitHubOAuth() {
    const auth = getAuth();
    const gitHubProvider = new GithubAuthProvider();

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        signInWithPopup(auth, gitHubProvider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)

                setLoading(false)
                navigate('/');

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...

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

            <button disabled={loading} onClick={handleSubmit} className="btn btn-outline btn-accent w-full uppercase">Continue with GitHub</button>
        </div>
    )
}