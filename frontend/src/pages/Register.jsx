import {EyeIcon, EyeClosedIcon} from '@primer/octicons-react'
import {useState} from 'react'


function Register(){

    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        //email check.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address')
            return
        }

        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if(password.length < 8){
            setError("Error: Password must be at least 8 characters long.")
            return
        }

        if(!(/[^a-zA-Z0-9\s]/.test(password))){
            setError("Error: Password must have at least one special character.")
            return
        }

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Registration failed')
                return
            }

            setSuccess('Account created successfully!')
            // Clear form
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        } catch (err) {
            setError('Failed to connect to server')
        }
    }


    return (
        <>
            <div className="min-h-screen bg-black flex items-center justify-center margin-b-300">
                <form onSubmit={handleSubmit} className='w-96 text-white   border-gray-600 p-10 flex flex-col gap-5'>
                    <h1 className ='text-3xl text-center text-white'>Sign Up to SecureBox</h1>
                    
                    <input 
                        id="email-input" 
                        type="text" 
                        placeholder='Email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="transition-colors border rounded-sm bg-black text-white p-2 border-gray-500 focus:border-blue-500 focus:outline-none"
                    />

                    {/* Password input with see pwd button */}
                    <div className="relative">
                        <input 
                            id="password-input"
                            type={isPasswordShown ? "text" : "password"}
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full transition-colors border rounded-sm bg-black text-white p-2 border-gray-500  focus:border-blue-500 focus:outline-none">
                        </input>
                        <button 
                            type="button" 
                            id="showPwd" onClick={() => setIsPasswordShown(!isPasswordShown)}
                            className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors'>
                            {isPasswordShown ? <EyeClosedIcon size={16} /> : <EyeIcon size={16} />}
                        </button>
                    </div>

                    <input
                        id="confirm-password-input"
                        type="password"
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full transition-colors border rounded-sm bg-black text-white p-2 border-gray-500  focus:border-blue-500 focus:outline-none">
                    </input>

                    <button type="submit" className='transition-colors rounded-2xl border bg-none text-white p-1 border-gray-500 cursor-pointer hover:bg-gray-800 my-4'>Register</button>
                    
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {success && <p className="text-green-500 text-center">{success}</p>}

                </form>
            </div>
        </>
    )
}

export default Register