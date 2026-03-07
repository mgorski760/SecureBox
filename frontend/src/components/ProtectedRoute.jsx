import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/*
What this does:

Checks to see if the user's route is protected with a valid token.

IF VALID: Accesses the required route.
IF NOT: Redirect's the user to login.

*/

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth()


    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
