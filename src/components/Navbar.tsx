import Search from './Search'
import Logo from '../assets/compaggr-logo.png'

const Navbar = () => {

  return (
    <div className='fixed top-0 z-20 bg-primary w-full h-20 pl-2 pr-4 md:px-8 flex items-center justify-between'>
      <img src={Logo} alt="logo" className='w-36 h-20 object-cover' />
      <Search />
    </div>
  )
}

export default Navbar