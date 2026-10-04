import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldLabel, FieldError } from "../ui/field";

import type { Activity } from "../../types/Activity";
import { convertMinutesToHoursAndMinutes } from "../../utils";
import { updateActivity } from "../../service/activityService";

const activitySchema = z
  .object({
    date: z.string().min(1, "Ange ett datum."),
    activityType: z.string().min(1, "Ange en aktivitetstyp."),
    hours: z.number().int("Ange hela timmar.").min(0, "Ange minst 0 timmar."),
    minutes: z
      .number()
      .int("Ange hela minuter.")
      .min(0, "Ange minst 0 minuter.")
      .max(59, "Ange högst 59 minuter."),
    intensity: z
      .number()
      .int("Ange en siffra mellan 1 och 5.")
      .min(1, "Ange en intensitet.")
      .max(5, "Intensiteten måste vara mellan 1 och 5."),
  })
  .refine((data) => data.hours * 60 + data.minutes >= 1, {
    message: "Ange en varaktighet på minst 1 minut.",
    path: ["minutes"],
  });

type ActivityFormValues = z.infer<typeof activitySchema>;

type EditActivityProps = {
  activity: Activity;
  refreshActivities: () => void;
};

export const EditActivityForm = ({
  activity,
  refreshActivities,
}: EditActivityProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),

    // Här ska defaultValues baseras på activity
    defaultValues: {
      date: activity.date,
      activityType: activity.activityType,
      hours: convertMinutesToHoursAndMinutes(activity.durationMinutes).hours,
      minutes: convertMinutesToHoursAndMinutes(activity.durationMinutes)
        .minutes,
      intensity: activity.intensity,
    },
  });

  const onSubmit = async (data: ActivityFormValues) => {
    const { hours, minutes, ...activityData } = data;
    await updateActivity(activity.id, {
      ...activityData,
      durationMinutes: hours * 60 + minutes,
    });
    refreshActivities();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field data-invalid={!!errors.date}>
        <FieldLabel htmlFor="activity-date">Datum</FieldLabel>
        <Input
          id="activity-date"
          type="date"
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? "activity-date-error" : undefined}
          {...register("date")}
        />
        <FieldError id="activity-date-error" errors={[errors.date]} />
      </Field>

      <Field data-invalid={!!errors.activityType}>
        <FieldLabel htmlFor="activity-type">Aktivitetstyp</FieldLabel>
        <Input
          id="activity-type"
          type="text"
          aria-invalid={!!errors.activityType}
          aria-describedby={
            errors.activityType ? "activity-type-error" : undefined
          }
          {...register("activityType")}
        />
        <FieldError id="activity-type-error" errors={[errors.activityType]} />
      </Field>

      <Field data-invalid={!!errors.hours}>
        <FieldLabel htmlFor="activity-hours">Timmar</FieldLabel>
        <Input
          id="activity-hours"
          type="number"
          min={0}
          step={1}
          aria-invalid={!!errors.hours}
          aria-describedby={errors.hours ? "activity-hours-error" : undefined}
          {...register("hours", {
            valueAsNumber: true,
            deps: ["minutes"],
          })}
        />
        <FieldError id="activity-hours-error" errors={[errors.hours]} />
      </Field>

      <Field data-invalid={!!errors.minutes}>
        <FieldLabel htmlFor="activity-minutes">Minuter</FieldLabel>
        <Input
          id="activity-minutes"
          type="number"
          min={0}
          max={59}
          step={1}
          aria-invalid={!!errors.minutes}
          aria-describedby={
            errors.minutes ? "activity-minutes-error" : undefined
          }
          {...register("minutes", { valueAsNumber: true })}
        />
        <FieldError id="activity-minutes-error" errors={[errors.minutes]} />
      </Field>

      <Field data-invalid={!!errors.intensity}>
        <FieldLabel htmlFor="activity-intensity">Intensitet (1–5)</FieldLabel>
        <Input
          id="activity-intensity"
          type="number"
          min={1}
          max={5}
          aria-invalid={!!errors.intensity}
          aria-describedby={
            errors.intensity ? "activity-intensity-error" : undefined
          }
          {...register("intensity", { valueAsNumber: true })}
        />
        <FieldError id="activity-intensity-error" errors={[errors.intensity]} />
      </Field>

      <Button type="submit">Spara ändringar</Button>
    </form>
  );
};
