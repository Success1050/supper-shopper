import { AuthPage } from "@/Components/AuthPage";

const SignupPage: React.FC = () => {
  return (
    <AuthPage
      mode={"signup"}
      imageSrc="/images/signup.png"
      imageAlt="signup now"
    />
  );
};

export default SignupPage;
