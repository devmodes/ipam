import { Button } from '@components/ui/button'
import { useAuth } from '@providers/auth-provider'
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  return (
    <div className="flex items-center justify-center h-svh">
      <div className='flex flex-col items-center gap-5'>
        <h1 className="text-xl font-bold" style={{ fontSize: "3rem" }}>Page Not Found</h1>
        <Button onClick={() => navigate(isSignedIn ? "/app" : "/") }>Go back</Button>
      </div>

    </div>
  )
}

export default NotFoundPage