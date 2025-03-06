import { Button } from "@components/ui/button";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">IP Address Management System</h1>
        <p className="text-xl font-light text-muted-foreground">
          by: Clark Dave Ibarreta
        </p>

        <div className="mt-5 flex justify-center items-center gap-5">
          <Button onClick={() => navigate("/signup")}>Sign up now</Button>
          <p className="text-sm">OR</p>
          <Button onClick={() => navigate("/signin")} variant="outline">
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
