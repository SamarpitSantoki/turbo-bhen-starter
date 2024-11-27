import useAuthStore from "@/store/auth.store";
import { AuthService } from "@repo/core/services/AuthService";
import { AuthFormFields } from "@repo/core/types/forms/auth-form";

function useAuth() {
  const {
    isAuthenticated,
    authenticate,
    onboardingCompleted,
    setOnboardingCompleted,
    logout,
    ...rest
  } = useAuthStore();

  const handleSignIn = async (values: AuthFormFields): Promise<void> => {
    console.log("Logging in with:", values);

    const data = await AuthService.login(values);

    console.log(data);

    authenticate(data.user, data.access_token, data.refresh_token);

    console.log("Login data:", data);
  };

  const handleSignUp = async (values: AuthFormFields): Promise<void> => {
    console.log("Signing up with:", values);
    const data = await AuthService.signup(values);

    authenticate(data.user, data.access_token, data.refresh_token);

    console.log(data);
    console.log("Signup data:", data);
  };

  const handleOnboardingCompleted = () => {
    setOnboardingCompleted(true);
  };

  const handleLogout = async () => {
    logout();
  };

  return {
    handleSignIn,
    handleSignUp,
    isAuthenticated,
    onboardingCompleted,
    handleOnboardingCompleted,
    handleLogout,
    ...rest,
  };
}

export default useAuth;
