'use client'

// component
import AuthModal from '@/components/AuthModal'
import LeftSidebar from '@/components/LeftSidebar'
import MainComponent from '@/components/MainComponent'
import RightSidebar from '@/components/RightSidebar'
import PageLoader from '@/components/Loader/PageLoader'
// context
import { useAuthContext } from '@/context/AuthContext'

export default function Home() {
  const { user, authIsReady } = useAuthContext()

  if (!authIsReady) return <PageLoader />

  if (!user && authIsReady) return <AuthModal />

  return (
    <>
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="min-h-screen w-full relative flex mx-auto">
          <LeftSidebar />
          <MainComponent />
          <RightSidebar />
        </div>
      </div>
    </>
  )
}

