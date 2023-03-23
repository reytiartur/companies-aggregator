import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useEffect, useState } from 'react';
import useScrollToTop from '../hooks/useScrollToTop';

const ScrollArrow = () => {
    const [show, setShow] = useState(false);
    const scrollToTop = useScrollToTop()

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
    }, []);

  return (
    <div className={`cursor-pointer fixed z-20 w-11 h-11 bottom-10 right-8 ${!show && 'translate-y-24'} md:right-20 hover:border-secondary hover:text-secondary hover:bg-white transition ease-in-out duration-500 bg-white/75 border-2 border-primary text-primary rounded-full flex justify-center items-center`} onClick={() => scrollToTop("smooth")}>
        <KeyboardDoubleArrowUpIcon className='pointer-events-none text-inherit' fontSize='large' />
    </div>

  )
}

export default ScrollArrow