import { useState } from "react";
import { Button } from "../components/ui/button";
import { LoginForm } from "../components/auth/LoginForm";
import { SignupForm } from "../components/auth/SignupForm";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  if (user) {
    return (
      <section
        className="flex min-h-svh items-center justify-center px-3 py-10 sm:px-6 sm:py-16"
        aria-labelledby="login-title"
      >
        <p>Välkommen, {user.email}!</p>
      </section>
    );
  }
  return (
    <section
      className="flex min-h-svh items-center justify-center px-3 py-10 sm:px-6 sm:py-16"
      aria-labelledby="login-title"
    >
      <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/70 px-5 py-8 text-(--muted-plum) shadow-[0_16px_60px_rgb(85_73_81/0.08)] backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <span className="mb-6 inline-block rounded-full bg-(--dusty-powder-blue)/35 px-4 py-1.5 text-xs font-medium tracking-[0.15em] uppercase">
            Wellio
          </span>
          <h1
            id="login-title"
            className="mb-3! font-serif text-[clamp(1.5rem,3vw,2.25rem)]! leading-tight! font-normal text-balance"
          >
            {isLogin ? "Välkommen tillbaka" : "Skapa ett konto"}
          </h1>

          <p className="mx-auto max-w-xs text-sm leading-relaxed">
            {isLogin
              ? "Logga in för att fortsätta till Wellio."
              : "Skapa ett konto för att komma igång med Wellio."}
          </p>
        </div>

        {isLogin ? <LoginForm /> : <SignupForm />}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-(--muted-plum)/10 pt-6 text-center text-sm">
          <span className="text-muted-foreground">
            {isLogin ? "Har du inget konto?" : "Har du redan ett konto?"}
          </span>

          <Button
            variant="link"
            type="button"
            className="h-auto! rounded-sm px-1! py-1! text-sm! font-semibold underline underline-offset-4 hover:text-(--muted-plum)/75"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "Skapa konto" : "Logga in"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Login;
