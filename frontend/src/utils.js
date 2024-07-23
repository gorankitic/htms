// date-fns
import { formatDistance, parseISO } from "date-fns";
import { sr } from "date-fns/locale";

export const formatDistanceFromNow = (dateString) =>
    formatDistance(parseISO(dateString), new Date(), { addSuffix: true, locale: sr })
