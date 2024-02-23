import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import RegisterForm from "@/components/registerForm";

export default function RegisterPage(){
    return(
        <main>
            <Navbar />
            <RegisterForm/>
            <Footer />
        </main>
    )
}