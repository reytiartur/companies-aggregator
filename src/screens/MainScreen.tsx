import Filters from '../components/Filters'
import Navbar from '../components/Navbar'
import ScrollArrow from '../components/ScrollArrow'
import CompaniesContainer from './CompaniesContainer'

const MainScreen = () => {
  return (
    <div className='w-full overflow-hidden relative pt-36'>
      <Navbar />
      <Filters />
      <CompaniesContainer />
      <ScrollArrow />
    </div>
  )
}

export default MainScreen