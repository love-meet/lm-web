import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, MoreHorizontal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function Login() {
    const { fetchWithGoogle } = useAuth()  
    const navigate = useNavigate();
    // const login = useGoogleLogin({
    //     onSuccess: tokenResponse => fetchWithGoogle(tokenResponse.access_token),
    // });

    return (
        <section className="fixed inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] z-50 flex flex-col">

          <div className='relative w-screen flex h-screen justify-center items-center' >
              <div className="flex items-center space-x-4 absolute top-3 left-3">
                {/* Back Button */}
                <button 
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ArrowLeft size={20} className="text-white" />
                </button>
              </div>
              
            {/* Login Card */}
            <div className="relative w-[90%] z-10 flex flex-col items-center justify-center bg-[var(--bg-secondary)] bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-lg p-4  ">
                <h1 className="text-3xl font-bold mb-4 text-gradient-primary">Welcome Back</h1>
                <p className="text-md mb-8 text-[var(--text-secondary)]">Sign in to continue your journey.</p>
                
                {/* <button 
                    onClick={() => login()} 
                    className="flex items-center justify-center gap-3 w-full button-primary bg-opacity-10 hover:bg-opacity-20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    <FcGoogle size={24} />
                    <span>Sign in with Google</span>
                </button> */}

                <GoogleLogin
                  theme="filled_blue"
                  logo_alignment="left"
                  onSuccess={(event)=> fetchWithGoogle(jwtDecode(event.credential))} 
                  onError={()=> console.log("Login Failed")}
                />

                <p className="text-xs text-[var(--text-secondary)] mt-6">
                    By signing in, you agree to our{' '}
                    <a href="/terms" className="text-[var(--accent-pink)] hover:underline">Terms of Service</a> and{' '}
                    <a href="/privacy" className="text-[var(--accent-pink)] hover:underline">Privacy Policy</a>.
                </p>
            </div>

          </div>

        </section>
    );
}