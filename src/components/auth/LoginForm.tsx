import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { useAuth } from "../../hooks/useAuth";

const loginSchema = z.object({
  email: z.email("Ange en giltig e-postadress."),
  password: z.string().min(1, "Ange ditt lösenord."),
});

type LoginValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const { signIn } = useAuth();

  const onSubmit = (data: LoginValues) => {
    signIn(data.email, data.password);
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="login-email">E-post</FieldLabel>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="namn@exempel.se"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "login-email-error" : undefined}
          {...register("email")}
        />
        <FieldError id="login-email-error" errors={[errors.email]} />
      </Field>
      <Field data-invalid={!!errors.password}>
        <FieldLabel htmlFor="login-password">Lösenord</FieldLabel>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          aria-describedby={
            errors.password ? "login-password-error" : undefined
          }
          {...register("password")}
        />
        <FieldError id="login-password-error" errors={[errors.password]} />
      </Field>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        Logga in
      </Button>
    </form>
  );
};

export default LoginForm;
