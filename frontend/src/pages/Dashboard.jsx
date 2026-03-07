import {useState} from 'react'
import Navbar from '../components/Navbar'

function Dashboard(){
    return(
        <>
            <div className="min-h-screen bg-black flex items-center justify-center margin-b-300">
                <Navbar/>
            </div>
        </>
    )
}

export default Dashboard