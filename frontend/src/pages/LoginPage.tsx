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

  const loginAndNavigate = async (id: string) => {
    await login.mutateAsync({
      userId: id,
      nickname: id,
      profileUrl: "https://i.pravatar.cc/150?img=2",
    });
    navigate("/users");
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
            onClick={() => loginAndNavigate(userId.trim())}
            disabled={!userId.trim() || login.isPending}
          >
            {login.isPending ? "Signing in…" : "Continue"}
          </Button>
          <div className="text-center text-xs text-gray-500">or</div>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => loginAndNavigate("admin")}
            disabled={login.isPending}
          >
            {login.isPending ? "Signing in…" : "Continue as Admin"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
