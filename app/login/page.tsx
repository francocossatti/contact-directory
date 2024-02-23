import Footer from "@/components/footer";
import LoginForm from "@/components/loginForm";
import Navbar from "@/components/navbar";

export default function LoginPage(){
    return(
        <main>
            <Navbar />
            <LoginForm/>
            <Footer />
        </main>
    )
}