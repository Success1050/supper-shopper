import { AuthPage } from "@/Components/AuthPage";

const LoginPage: React.FC = () => {
  return (
    <AuthPage
      mode={"login"}
      imageSrc="/images/login.png"
      imageAlt="login now"
    />
  );
};

export default LoginPage;
