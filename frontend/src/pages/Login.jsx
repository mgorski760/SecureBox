import {BrowserRouter} from 'react-router-dom'
import {EyeIcon, EyeClosedIcon} from '@primer/octicons-react'
import {useState} from 'react'


function Login(){

    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        
        
    }

    return (
        <>
            <div className="min-h-screen bg-gray-900 flex items-center justify-center margin-b-300">
                <form onSubmit={handleSubmit} className='w-96 text-white   border-gray-600 p-10 flex flex-col gap-5'>
                    <h1 className ='text-3xl text-center text-white'>Login to SecureBox</h1>
                    
                    <input id="email-input" type="text" placeholder='Username' className="transition-colors border rounded-sm bg-gray-950 text-white p-2 border-gray-500 focus:border-blue-500 focus:outline-none"></input>
                     
                    <div className="relative">
                        <input 
                            id="password-input"
                            type={isPasswordShown ? "text" : "password"}
                            placeholder='Password' 
                            className="w-full transition-colors border rounded-sm bg-gray-950 text-white p-2 border-gray-500  focus:border-blue-500 focus:outline-none">
                        </input>
                        <button type="button" id="showPwd" onClick={() => setIsPasswordShown(!isPasswordShown)}className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'>
                            {isPasswordShown ? <EyeClosedIcon size={16} /> : <EyeIcon size={16} />}
                        </button>
                    </div>
                    
                    <button type="submit" className='transition-colors rounded-2xl border bg-green-600 p-1 border-green-900 cursor-pointer hover:bg-green-500 my-4'>Login</button>
                    
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}
                </form>
            </div>
        </>
    )
}

export default Login