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

type ActivityListItemProps = {
  activity: Activity;
};

export const ActivityListItem = ({ activity }: ActivityListItemProps) => {
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
            <DropdownMenuItem>
              <Pencil />
              Redigera
            </DropdownMenuItem>

            <DropdownMenuItem variant="destructive">
              <Trash2 />
              Ta bort
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
