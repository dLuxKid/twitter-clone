import sendTweet from "@/functions/sendTweet";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

interface Props {
    fetchTweetUponSend: () => void
}

export default function ComposeTweet({ fetchTweetUponSend }: Props) {
    const [pending, setPending] = useState<boolean>(false)

    const router = useRouter()

    const handleAction = async (formData: FormData) => {
        setPending(true)

        const tweet = formData.get("tweet");
        if (!tweet) {
            setPending(false)
            return
        };

        try {
            const res = await sendTweet(tweet as string)
            if (res?.userError) {
                setPending(false)
                return toast.error(res?.userError?.message)
            }

            if (res?.error) {
                setPending(false)
                return toast.error(res?.error?.message)
            }

            setPending(false)
            router.refresh()
            fetchTweetUponSend()
            return toast.success('tweet sent successfully')
        } catch (error: any) {
            setPending(false)
            return toast.error(error.message)
        }
    }

    return (
        <form className='flex flex-col w-full space-y-2' action={handleAction}>
            <input
                type='text'
                name='tweet'
                placeholder="What's happening?"
                className='w-full h-full bg-transparent outline-none p-4 text-xl placeholder:text-gray-600'
            />
            <div className='w-full flex justify-between items-center'>
                <div></div>
                <div className='w-full max-w-[100px]'>
                    <button
                        title='tweet'
                        type='submit'
                        className='bg-blue-pry rounded-full px-6 py-2 w-full text-lg font-semibold text-center hover:bg-opacity-80 transition duration-200 disabled:bg-opacity-80 flex items-center justify-center'
                        disabled={pending}
                    >{pending ? <Loader /> : 'Tweet'}</button>
                </div>
            </div>
        </form>
    )
}

