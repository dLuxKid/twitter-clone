// server functions
import { fetchTweets } from '@/functions'
// components
import ComposeTweet from './clientComponents/ComposeTweet'
import TweetCard from './serverComponents/TweetCard'
// types
import TweetSkeletonLoader from './Loader/TweetSkeletonLoader'

export default async function MainComponent() {
    const { data, error } = await fetchTweets()

    return (
        <main className='min-h-screen w-full max-w-2xl flex flex-col border-x-[0.5px] border-gray-500 text-white mx-auto'>
            <h1 className='text-xl font-bold p-4 sticky backdrop-blur top-0 bg-black/10'>Home</h1>
            <div className='border-y-[0.5px] px-4 border-gray-600 flex items-start space-x-2 min-h-32 relative py-4'>
                <div className='w-10 h-10 bg-slate-400 rounded-full flex-none'></div>
                <ComposeTweet />
            </div>
            <div className='flex flex-col'>
                {
                    error &&
                    <div className='w-full flex items-center justify-center p-10'>
                        <p className='text-white text-lg font-medium'>Error fetching tweets</p>
                    </div>
                }
                {!data && !error &&
                    <>
                        <TweetSkeletonLoader />
                        <TweetSkeletonLoader />
                    </>
                }
                {
                    data && data.map((tweet) => (
                        <TweetCard tweet={tweet} key={tweet.id} />
                    ))
                }
            </div>
        </main>
    )
}
