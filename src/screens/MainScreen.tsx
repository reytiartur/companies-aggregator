import Filters from '../components/Filters'
import Navbar from '../components/Navbar'
import CompaniesContainer from './CompaniesContainer'

const MainScreen = () => {
  return (
    <div className='w-full h-screen overflow-hidden'>
      <Navbar />
      <Filters />
      <CompaniesContainer />
    </div>
  )
}

export default MainScreen