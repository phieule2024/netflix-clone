import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'

import Navbar from '@/components/navbar'
import Billboard from '@/components/billboard'
import useInfoModalStore from '@/hooks/useInfoModalStore'
import useFavorites from '@/hooks/useFavorites'
import useMovieList from '@/hooks/useMovieList'
import MovieList from '@/components/movieList'
import InfoModal from '@/components/infoModal'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: 'auth',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList()
  const { data: favorites = [] } = useFavorites()
  const { isOpen, closeModal } = useInfoModalStore()

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Trending Now' data={movies} />
        <MovieList title='My List' data={favorites} />
      </div>
    </>
  )
}
