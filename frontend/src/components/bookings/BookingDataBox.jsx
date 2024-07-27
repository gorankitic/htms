// components
import DataItem from "../DataItem";
// utils
import { format, isToday } from "date-fns";
import { sr } from "date-fns/locale";
import { formatDistanceFromNow } from "../../utils/utils";
import { twMerge } from "tailwind-merge";
// assets
import { HiOutlineChatBubbleBottomCenterText, HiOutlineCheckCircle, HiOutlineHomeModern } from "react-icons/hi2";

const BookingDataBox = ({ booking }) => {

    console.log(booking)

    const { createdAt, startDate, endDate, numNights, numGuests, hasBreakfast, observations, isPaid, breakfastPrice, cabinPrice, totalPrice, guestId: { name: guestName, email, nationalId }, cabinId: { name: cabinName } } = booking;

    return (
        <div className="bg-gray-50 border border-gray-100 rounded-t-lg overflow-hidden">
            <header className="bg-teal-600 text-teal-50 tracking-wider uppercase py-4 px-8 flex items-center justify-between">
                <div className="flex items-center">
                    <HiOutlineHomeModern className="h-6 w-6" />
                    <p className="mx-2">{numNights}</p> ноћења у апартману <span className="ml-2">{cabinName}</span>
                </div>
                <p className="lowercase">
                    <span className="mr-2">({isToday(new Date(startDate)) ? "данас" : formatDistanceFromNow(startDate)})</span>

                    <span>{format(new Date(startDate), "cccc dd.MM.yyyy.", { locale: sr })}</span>
                    <span className="mx-2">&mdash;</span>
                    <span>{format(new Date(endDate), "cccc dd.MM.yyyy.", { locale: sr })}</span>
                </p>
            </header>
            <section className="py-4 px-8">
                <div className="flex items-center gap-4 mb-2">
                    <p className="font-medium text-lg">{guestName} {numGuests > 1 ? numGuests - 1 === 1 ? `+ још 1 гост` : `+ још ${numGuests - 1}. гостију` : ""}</p>
                    <span>&bull;</span>
                    <p className="text-gray-500">{email}</p>
                    <span>&bull;</span>
                    <p className="text-gray-500">Број путне исправе: {nationalId}</p>
                </div>
                {observations && (
                    <DataItem
                        icon={<HiOutlineChatBubbleBottomCenterText className="h-5 w-5" />}
                        label="Напомена:"
                    >
                        {observations}
                    </DataItem>
                )}
                <DataItem
                    icon={<HiOutlineCheckCircle className="h-5 w-5" />}
                    label={"Да ли је доручак укључен?"}
                >
                    {hasBreakfast ? "Да" : "Не"}
                </DataItem>
                <div className={twMerge("w-full rounded-md py-1 px-6 mt-4 flex items-center justify-between", isPaid ? "bg-teal-600 text-teal-50" : "bg-accent-300 text-accent-50")}>
                    <DataItem
                        label={"Укупна цијена:"}
                    >
                        {`${totalPrice}KM`}
                        {hasBreakfast && ` (${cabinPrice}КМ апартман + ${breakfastPrice}КМ доручак)`}
                    </DataItem>
                    <p className="uppercase">{isPaid ? "Плаћено" : "Плаћање по доласку"}</p>
                </div>
            </section>
            <footer className="mb-4 pr-8 text-right uppercase text-sm text-gray-500">
                <p>Резервисано дана: {format(new Date(createdAt), "cccc dd.MM.yyyy.", { locale: sr })}</p>
            </footer>
        </div>
    )
}

export default BookingDataBox;