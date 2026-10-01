const now = new Date();
export const todaysDate = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
].join("-");
export const getCurrentWeek = () => {
  const today = new Date();

  const monday = new Date(today);
  const day = today.getDay();

  const diffToMonday = day === 0 ? -6 : 1 - day;

  monday.setDate(today.getDate() + diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    start: monday,
    end: sunday,
  };
};
export const filterByDateRange = <T extends { date: string }>(
  items: T[],
  start: Date,
  end: Date,
): T[] => {
  return items.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= start && itemDate <= end;
  });
};
export const sumDurationMinutes = (
  activities: { durationMinutes: number }[],
) => {
  return activities.reduce((acc, activity) => {
    return acc + activity.durationMinutes;
  }, 0);
};
