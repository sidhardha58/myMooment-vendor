import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/UseAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    // Simulated backend response
    const fakeToken = "abc123";
    const fakeUser = {
      id: "1",
      name: "Vendor Name",
      isOnboarded: false, // change to true to test
    };

    login(fakeToken, fakeUser);

    // Redirect based on onboarding status
    if (!fakeUser.isOnboarded) {
      navigate("/onboarding");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login (Dummy)</button>
    </div>
  );
};

export default Login;
