// date-fns
import { formatDistance, parseISO } from "date-fns";

export const formatDistanceFromNow = (dateString) =>
    formatDistance(parseISO(dateString), new Date(), { addSuffix: true })
        .replace("in", "за")
        .replace("days", "дана")
        .replace("months", "мјесеца")