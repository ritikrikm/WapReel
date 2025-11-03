import { useDispatch } from 'react-redux'
import { register } from '../features/authSlice'
import { useState } from 'react'

export default function Register({ onFlip }) {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match')
            return
        }
        dispatch(register(formData))
        alert('Registration successful')
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div
            className="flex rounded-2xl shadow-lg max-w-3xl p-5 items-center"
            style={{ backgroundColor: 'var(--thistle)' }}
        >
            {/* form */}
            <div className="md:w-1/2 px-8 md:px-16">
                <h2
                    className="font-bold text-2xl"
                    style={{ color: 'var(--ultra-violet)' }}
                >
                    Register
                </h2>
                <p
                    className="text-xs mt-4"
                    style={{ color: 'var(--dark-slate-gray)' }}
                >
                    Create your account to get started
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="relative mt-8">
                        <input
                            id="username"
                            className="peer p-2 w-full rounded-xl border focus:outline-none focus:ring-2 border-[var(--tropical-indigo)] text-[var(--dark-slate-gray)] placeholder-transparent"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <label
                            htmlFor="username"
                            className="absolute left-3 top-2.5 text-white-500 text-sm transition-all duration-300 
      peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-white-400 peer-placeholder-shown:text-base 
      peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-white
      peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-white
      bg-[var(--tropical-indigo)] px-1 rounded-md"
                        >
                            Username
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            className="peer p-2 w-full rounded-xl border focus:outline-none focus:ring-2 border-[var(--tropical-indigo)] text-[var(--dark-slate-gray)] placeholder-transparent"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{
                                borderColor: 'var(--tropical-indigo)',
                                color: 'var(--dark-slate-gray)',
                            }}
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-3 top-2.5 text-white-500 text-sm transition-all duration-300 
      peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-white-400 peer-placeholder-shown:text-base 
      peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-white
      peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-white
      bg-[var(--tropical-indigo)] px-1 rounded-md"
                        >
                            Email
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            className="peer p-2 w-full rounded-xl border focus:outline-none focus:ring-2 border-[var(--tropical-indigo)] text-[var(--dark-slate-gray)] placeholder-transparent"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{
                                borderColor: 'var(--tropical-indigo)',
                                color: 'var(--dark-slate-gray)',
                            }}
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-3 top-2.5 text-white-500 text-sm transition-all duration-300 
      peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-white-400 peer-placeholder-shown:text-base 
      peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-white
      peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-white
      bg-[var(--tropical-indigo)] px-1 rounded-md"
                        >
                            Password
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            className="peer p-2 w-full rounded-xl border focus:outline-none focus:ring-2 border-[var(--tropical-indigo)] text-[var(--dark-slate-gray)] placeholder-transparent"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            style={{
                                borderColor: 'var(--tropical-indigo)',
                                color: 'var(--dark-slate-gray)',
                            }}
                        />
                        <label
                            htmlFor="confirmPassword"
                            className="absolute left-3 top-2.5 text-white-500 text-sm transition-all duration-300 
      peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-white-400 peer-placeholder-shown:text-base 
      peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-white
      peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-white
      bg-[var(--tropical-indigo)] px-1 rounded-md"
                        >
                            Confirm Password
                        </label>
                    </div>

                    {/* <input
                            className="p-2 rounded-xl border focus:outline-none focus:ring-2"
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                            style={{
                                borderColor: 'var(--tropical-indigo)',
                                color: 'var(--dark-slate-gray)',
                            }}
                        /> */}
                    <button
                        type="submit"
                        className="rounded-xl text-white py-2 hover:scale-105 duration-300"
                        style={{
                            backgroundColor: 'var(--ultra-violet)',
                        }}
                    >
                        Register
                    </button>
                </form>

                <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                    <hr className="border-gray-300" />
                    <p
                        className="text-center text-sm"
                        style={{ color: 'var(--dark-slate-gray)' }}
                    >
                        OR
                    </p>
                    <hr className="border-gray-300" />
                </div>

                <button
                    className="w-full rounded-xl mt-5 flex justify-center items-center text-sm border hover:scale-105 duration-300"
                    style={{
                        backgroundColor: 'var(--ultra-violet)',
                        borderColor: 'var(--tropical-indigo)',
                        color: 'white',
                    }}
                >
                    <svg
                        className="mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="25px"
                    >
                        <path
                            fill="#FFC107"
                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4
                C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20
                C44,22.659,43.862,21.35,43.611,20.083z"
                        />
                        <path
                            fill="#FF3D00"
                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12
                c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4
                C16.318,4,9.656,8.337,6.306,14.691z"
                        />
                        <path
                            fill="#4CAF50"
                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238
                C29.211,35.091,26.715,36,24,36
                c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025
                C9.505,39.556,16.227,44,24,44z"
                        />
                        <path
                            fill="#1976D2"
                            d="M43.611,20.083H42V20H24v8h11.303
                c-0.792,2.237-2.231,4.166-4.087,5.571
                c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238
                C36.971,39.205,44,34,44,24
                C44,22.659,43.862,21.35,43.611,20.083z"
                        />
                    </svg>
                    Register with Google
                </button>

                <div
                    className="mt-3 text-xs flex justify-between items-center"
                    style={{ color: 'var(--dark-slate-gray)' }}
                >
                    <p>Already have an account?</p>
                    <button
                        className="py-2 px-5 border rounded-xl hover:scale-110 duration-300"
                        onClick={onFlip}
                        style={{
                            backgroundColor: 'white',
                            borderColor: 'var(--tropical-indigo)',
                            color: 'var(--ultra-violet)',
                        }}
                    >
                        Login
                    </button>
                </div>
            </div>

            {/* video instead of image */}
            <div className="md:block hidden w-1/2">
                <video
                    className="rounded-2xl object-cover w-full h-full"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&auto=format&fit=crop&w=1887&q=80"
                >
                    <source
                        src="../public/videos/register.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}
