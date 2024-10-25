// component
import LeftSidebar from '@/components/LeftSidebar'
import MainComponent from '@/components/MainComponent'
import RightSidebar from '@/components/RightSidebar'

export const revalidate = 0

export default function Home() {

  return (
    <div className="relative w-full h-full flex justify-center items-center mx-auto">
      <div className="min-h-screen w-full relative flex mx-auto">
        <LeftSidebar />
        <MainComponent />
        <RightSidebar />
      </div>
    </div>
  )
}

