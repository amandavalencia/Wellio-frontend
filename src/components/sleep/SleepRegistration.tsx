import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { todaysDate } from "../../utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { DialogClose } from "../ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { createSleep } from "../../service/sleepService";
import type { CreateSleep } from "../../types/Sleep";

const sleepSchema = z
  .object({
    date: z
      .string()
      .min(1, "Ange ett datum.")
      .refine((date) => date <= todaysDate, {
        message: "Datum får inte vara i framtiden.",
      }),
    hours: z.number().int("Ange hela timmar.").min(0, "Ange minst 0 timmar."),
    minutes: z
      .number()
      .int("Ange hela minuter.")
      .min(0, "Ange minst 0 minuter.")
      .max(59, "Ange högst 59 minuter."),
    sleepQuality: z
      .number()
      .int("Ange en siffra mellan 1 och 5.")
      .min(1, "Ange en sömnkvalitet.")
      .max(5, "Sömnkvaliteten måste vara mellan 1 och 5."),
  })
  .refine((data) => data.hours * 60 + data.minutes >= 1, {
    message: "Ange en sömntid på minst 1 minut.",
    path: ["minutes"],
  });

type SleepFormValues = z.infer<typeof sleepSchema>;

export const SleepRegistration = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<SleepFormValues>({
    resolver: zodResolver(sleepSchema),
    defaultValues: {
      date: todaysDate,
      hours: 0,
      minutes: 0,
      sleepQuality: 0,
    },
  });

  const onSubmit = async (data: SleepFormValues) => {
    const { hours, minutes, ...sleep } = data;
    const sleepData: CreateSleep = {
      ...sleep,
      durationMinutes: hours * 60 + minutes,
    };
    await createSleep(sleepData);
    reset();
    closeRef.current?.click();
  };

  return (
    <form onSubmit={(event) => handleSubmit(onSubmit)(event)} noValidate>
      <Field data-invalid={!!errors.date}>
        <FieldLabel htmlFor="sleep-date">Datum</FieldLabel>
        <Input
          id="sleep-date"
          type="date"
          max={todaysDate}
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? "sleep-date-error" : undefined}
          {...register("date")}
        />
        <FieldError id="sleep-date-error" errors={[errors.date]} />
      </Field>
      <Field data-invalid={!!errors.hours}>
        <FieldLabel htmlFor="sleep-hours">Timmar</FieldLabel>
        <Input
          id="sleep-hours"
          type="number"
          min={0}
          step={1}
          aria-invalid={!!errors.hours}
          aria-describedby={errors.hours ? "sleep-hours-error" : undefined}
          {...register("hours", { valueAsNumber: true, deps: ["minutes"] })}
        />
        <FieldError id="sleep-hours-error" errors={[errors.hours]} />
      </Field>
      <Field data-invalid={!!errors.minutes}>
        <FieldLabel htmlFor="sleep-minutes">Minuter</FieldLabel>
        <Input
          id="sleep-minutes"
          type="number"
          min={0}
          max={59}
          step={1}
          aria-invalid={!!errors.minutes}
          aria-describedby={errors.minutes ? "sleep-minutes-error" : undefined}
          {...register("minutes", { valueAsNumber: true })}
        />
        <FieldError id="sleep-minutes-error" errors={[errors.minutes]} />
      </Field>
      <Controller
        name="sleepQuality"
        control={control}
        render={({ field }) => (
          <Field data-invalid={!!errors.sleepQuality}>
            <FieldLabel id="sleep-quality-label">Sömnkvalitet (1–5)</FieldLabel>
            <ToggleGroup
              type="single"
              variant="outline"
              value={field.value ? String(field.value) : ""}
              onValueChange={(value) =>
                field.onChange(value ? Number(value) : 0)
              }
              onBlur={field.onBlur}
              aria-labelledby="sleep-quality-label"
              aria-invalid={!!errors.sleepQuality}
              aria-describedby={
                errors.sleepQuality ? "sleep-quality-error" : undefined
              }
            >
              {[1, 2, 3, 4, 5].map((quality) => (
                <ToggleGroupItem
                  key={quality}
                  value={String(quality)}
                  ref={quality === 1 ? field.ref : undefined}
                  aria-label={`Sömnkvalitet ${quality} av 5`}
                >
                  {quality}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <FieldError
              id="sleep-quality-error"
              errors={[errors.sleepQuality]}
            />
          </Field>
        )}
      />
      <Button className="mt-4" type="submit">
        Registrera sömn
      </Button>
      <DialogClose ref={closeRef} type="button" hidden />
    </form>
  );
};
