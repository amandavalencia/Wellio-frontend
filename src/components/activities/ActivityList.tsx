import type { Activity } from "../../types/Activity";
import { ActivityListItem } from "./ActivityListItem";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type ActivityListProps = {
  activities: Activity[];
  refreshActivities: () => void;
};

export const ActivityList = ({
  activities,
  refreshActivities,
}: ActivityListProps) => {
  return (
    <div className="rounded-lg bg-white/72 shadow-[0_8px_28px_rgb(85_73_81/0.05)] backdrop-blur-sm p-4 m-4">
      <Table className="p-4">
        <TableHeader>
          <TableRow>
            <TableHead className="font-[Georgia,serif] text-md">
              Aktivitet
            </TableHead>
            <TableHead className="font-[Georgia,serif] text-md">
              Datum
            </TableHead>
            <TableHead className="font-[Georgia,serif] text-md">Tid</TableHead>
            <TableHead className="font-[Georgia,serif] text-md">
              Intensitet
            </TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {activities.map((activity) => (
            <ActivityListItem
              key={activity.id}
              activity={activity}
              refreshActivities={refreshActivities}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
