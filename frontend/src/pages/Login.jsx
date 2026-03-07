import {EyeIcon, EyeClosedIcon} from '@primer/octicons-react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'


function Login(){
    const navigate = useNavigate() //Allows for redirects.
    const {login} = useAuth() //Login function from AuthContext.jsx. Checks to see if the page loads.

    const [isPasswordShown, setIsPasswordShown] = useState(false) 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            
            const data = await response.json()
            
            if (!response.ok) {
                setError(data.message || 'Login failed')
                return
            }
            
            // Save the token using AuthContext
            login(data.token)
            setSuccess('Login successful!')
            
            // Redirect to dashboard
            navigate('/dashboard')
        } catch (err) {
            setError('Failed to connect to server')
        }
    }

    return (
        <>
            <div className="min-h-screen bg-black flex items-center justify-center margin-b-300">
                <form onSubmit={handleSubmit} className='w-96 text-white   border-gray-600 p-10 flex flex-col gap-5'>
                    <h1 className ='text-3xl text-center text-white'>Login to SecureBox</h1>
                    
                    <input id="email-input" type="text" placeholder='Username' className="transition-colors border rounded-sm bg-black text-white p-2 border-gray-500 focus:border-blue-500 focus:outline-none"></input>
                     
                    <div className="relative">
                        <input 
                            id="password-input"
                            type={isPasswordShown ? "text" : "password"}
                            placeholder='Password' 
                            className="w-full transition-colors border rounded-sm bg-black text-white p-2 border-gray-500  focus:border-blue-500 focus:outline-none">
                        </input>
                        <button type="button" id="showPwd" onClick={() => setIsPasswordShown(!isPasswordShown)}className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'>
                            {isPasswordShown ? <EyeClosedIcon size={16} /> : <EyeIcon size={16} />}
                        </button>
                    </div>
                    
                    <button type="submit" className='transition-colors rounded-2xl border bg-none text-white p-1 border-gray-500 cursor-pointer hover:bg-gray-800 my-4'>Login</button>
                    
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}
                </form>
            </div>
        </>
    )
}

export default Login