import {BrowserRouter} from 'react-router-dom'
import {EyeIcon, EyeClosedIcon} from '@primer/octicons-react'
import {useState} from 'react'


function Login(){

    const [isPasswordShown, setIsPasswordShown] = useState(false)

    return (
        <>
            <div className="min-h-screen bg-gray-900 flex items-center justify-center margin-b-300">
                <div className='w-96 text-white   border-gray-600 p-10 flex flex-col gap-2'>
                    <h1 className ='text-3xl text-center text-white'>Login to SecureBox</h1>
                    <h3>Username:</h3>
                    <input type="text" placeholder='Username' className="transition-colors border rounded-sm bg-gray-950 text-white p-2 border-gray-500 focus:border-blue-500 focus:outline-none"></input>
                    <h3>Password:</h3>
                    
                    <div className="relative">
                        <input 
                            type={isPasswordShown ? "text" : "password"}
                            placeholder='Password' 
                            className="w-full transition-colors border rounded-sm bg-gray-950 text-white p-2 border-gray-500  focus:border-blue-500 focus:outline-none">
                        </input>
                        <button type="button" id="showPwd" onClick={() => setIsPasswordShown(!isPasswordShown)}className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'>
                            {isPasswordShown ? <EyeClosedIcon size={16} /> : <EyeIcon size={16} />}
                        </button>
                    </div>
                    
                    <button type="button" className='transition-colors rounded-2xl border bg-green-600 p-1 border-green-900 cursor-pointer hover:bg-green-500 my-4'>Login</button>
                    
                    <div className="flex items-center gap-2">
                        <hr className="flex-1 border-t border-gray-500" />
                        <span className="text-gray-500 text-sm">Or Login With:</span>
                        <hr className="flex-1 border-t border-gray-500" />
                        </div>
                </div>
            </div>
        </>
    )
}

export default Login