export function dateFormatter(date: Date | null | string | undefined): string {
    if (!date) return "";

    const dateObj = new Date(date);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();

    const localDate = new Date(year, month, day);

    const formatter = Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
        year: "numeric",
    });

    return formatter.format(localDate);
}
