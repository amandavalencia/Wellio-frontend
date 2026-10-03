import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { useAuth } from "../../hooks/useAuth";

const signupSchema = z
  .object({
    email: z.email("Ange en giltig e-postadress."),
    password: z.string().min(8, "Lösenordet måste innehålla minst 8 tecken."),
    confirmPassword: z.string().min(1, "Bekräfta ditt lösenord."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lösenorden måste matcha.",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });
  const { signUp } = useAuth();

  const onSubmit = (data: SignupValues) => {
    signUp(data.email, data.password);
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="signup-email">E-post</FieldLabel>
        <Input
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder="namn@exempel.se"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "signup-email-error" : undefined}
          {...register("email")}
        />
        <FieldError id="signup-email-error" errors={[errors.email]} />
      </Field>
      <Field data-invalid={!!errors.password}>
        <FieldLabel htmlFor="signup-password">Lösenord</FieldLabel>
        <Input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          aria-describedby={
            errors.password ? "signup-password-error" : undefined
          }
          {...register("password", { deps: ["confirmPassword"] })}
        />
        <FieldError id="signup-password-error" errors={[errors.password]} />
      </Field>
      <Field data-invalid={!!errors.confirmPassword}>
        <FieldLabel htmlFor="signup-confirm-password">
          Bekräfta lösenord
        </FieldLabel>
        <Input
          id="signup-confirm-password"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={
            errors.confirmPassword ? "signup-confirm-password-error" : undefined
          }
          {...register("confirmPassword")}
        />
        <FieldError
          id="signup-confirm-password-error"
          errors={[errors.confirmPassword]}
        />
      </Field>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        Skapa konto
      </Button>
    </form>
  );
};
