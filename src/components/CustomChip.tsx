import { ChipProps, DeleteFns, SelectedProps } from "../utils/types"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const CustomChip = ({ value, type, deleteFns }: ChipProps) => {
    const handleClick = () => {
      deleteFns[type as keyof DeleteFns][value]()
    }

  return (
    <div className="flex items-center pl-2 pr-1 py-1 gap-1 border border-primary text-primary rounded-xl">
        <p className="text-sm font-semibold">{value}</p>
        <div className="w-5 h-5 flex items-center justify-center text-inactive transform duration-200 hover:text-secondary cursor-pointer" onClick={handleClick}>
            <HighlightOffIcon className="pointer-events-none" sx={{height:'20px', width: '20px'}} />
        </div>
    </div>
  )
}

export default CustomChip