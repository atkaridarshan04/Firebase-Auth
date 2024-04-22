import { Link } from 'react-router-dom'
// import mern_Img from '../assets/mern_Img.webp'

export default function Home() {
    return (
        <div className="hero sm:min-h-[80vh] min-h-[90vh] bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='w-[85%] sm:w-[60%]'>
                    <h1 className="text-5xl font-bold">Build Authentication with Firebase</h1>
                    <p className="py-6">The front-end of the application is built with React ,uses React Router for client-side routing and daisyUI for styling . Build custom Authentication and OAuth's like Google and Github by using Firebase.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    )
}