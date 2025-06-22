import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/auth/useLogin.hook";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const login = useLogin();
  const navigate = useNavigate();

  const handle = async () => {
    await login.mutateAsync(userId.trim());
    navigate("/channels");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm p-6 space-y-4">
        <h1 className="text-xl font-semibold text-center">Sign in</h1>
        <CardContent className="space-y-4">
          <Input
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handle}
            disabled={!userId.trim() || login.isPending}
          >
            {login.isPending ? "Signing in…" : "Continue"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
