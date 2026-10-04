import type { Activity } from "../../types/Activity";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";

import { TableCell, TableRow } from "../ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { FormDialog } from "../Dialog";
import { useState } from "react";
import { EditActivityForm } from "./EditActivityForm";
import { deleteActivity } from "../../service/activityService";

type ActivityListItemProps = {
  activity: Activity;
  refreshActivities: () => void;
};

export const ActivityListItem = ({
  activity,
  refreshActivities,
}: ActivityListItemProps) => {
  const [open, setOpen] = useState(false);
  const handleDeleteActivity = async (activityId: number) => {
    await deleteActivity(activityId);
    refreshActivities();
  };
  return (
    <TableRow>
      <TableCell className="font-medium">{activity.activityType}</TableCell>

      <TableCell>{activity.date}</TableCell>

      <TableCell>{activity.durationMinutes} min</TableCell>

      <TableCell>{activity.intensity}</TableCell>

      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => setOpen(true)}>
              <Pencil />
              Redigera
            </DropdownMenuItem>

            <DropdownMenuItem
              variant="destructive"
              onClick={() => handleDeleteActivity(activity.id)}
            >
              <Trash2 />
              Ta bort
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <FormDialog
          open={open}
          onOpenChange={setOpen}
          title={`Uppdatera ${activity.activityType.toLowerCase()}`}
          description="Ändra de fält du vill uppdatera och klicka på 'Uppdatera aktivitet' för att spara ändringarna."
        >
          <EditActivityForm
            activity={activity}
            refreshActivities={refreshActivities}
          />
        </FormDialog>
      </TableCell>
    </TableRow>
  );
};
