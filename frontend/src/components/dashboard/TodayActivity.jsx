// hooks
import { useTodayActivity } from '../../hooks/bookings/useTodayActivity';
// components
import Spinner from '../Spinner';
import TodayItem from './TodayItem';

const TodayActivity = () => {
    const { isLoading, activities } = useTodayActivity();

    return (
        <div className='flex flex-col w-1/2 bg-gray-50 border border-gray-200 py-4'>
            <p className="font-medium uppercase text-center mb-4">Данашња активност</p>

            {!isLoading ? (
                activities?.length > 0 ? (
                    <ul className='flex flex-col items-start gap-4 mx-auto no-scrollbar overflow-x-hidden'>
                        {activities.map(activity => (
                            <TodayItem activity={activity} key={activity._id} />
                        ))}
                    </ul>
                ) : (
                    <p className='text-center mt-2'>Данас нема активности...</p>
                )
            ) : (
                <div className="mt-4 flex items-center justify-center">
                    <Spinner color="text-teal-600" />
                </div>
            )}
        </div >
    )
}

export default TodayActivity;