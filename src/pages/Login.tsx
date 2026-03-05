import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/UseAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    const fakeToken = "abc123";

    const fakeUser = {
      id: "1",
      name: "Vendor Name",
      status: "approved", // change to test
    };

    login(fakeToken, fakeUser);

    if (fakeUser.status === "not_started") {
      navigate("/onboarding");
    } else if (fakeUser.status === "pending") {
      navigate("/submission-success");
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
