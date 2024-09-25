// date-fns
import { formatDistance, parseISO } from "date-fns";
import { sr } from "date-fns/locale";

export const formatDistanceFromNow = (dateString) =>
    formatDistance(parseISO(dateString), new Date(), { addSuffix: true, locale: sr });

export const formatCurrency = (value) =>
    new Intl.NumberFormat('de', { currency: 'BAM', style: 'currency', currencyDisplay: 'narrowSymbol' }).format(value);
