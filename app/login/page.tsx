import { AuthPage } from "@/Components/AuthPage";
import Link from "next/link";

const LoginPage: React.FC = () => {
  return (
    <>
      <AuthPage
        mode={"login"}
        imageSrc="/images/login.png"
        imageAlt="login now"
      />
      <Link href={"/dashboard"}>User dashboard</Link>
    </>
  );
};

export default LoginPage;
