import LoginForm from '@/app/components/login-form';

export default function LoginPage() {
    return (
        <main className="h-screen bg-[url('/bicycle-bg.jpeg')] bg-cover bg-center">
            <div className="h-full flex justify-center items-center">
                <LoginForm />
            </div>
        </main>
    );
}