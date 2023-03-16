import TuneIcon from '@mui/icons-material/Tune';
import { Badge, Dialog, Slide } from '@mui/material';
import { forwardRef, ReactElement, Ref, useContext, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { FiltersArrayProps, SelectedProps } from '../utils/types'
import { FiltersContext } from '../contexts/FiltersContext';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const FullScreenDialog = ({data: { locations, technologies, types }}:FiltersArrayProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const { selected, setSelected } = useContext(FiltersContext)

  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleClick = (category:string, name:string) => {
      if(selected[category as keyof SelectedProps].includes(name)) {
        const index = selected[category as keyof SelectedProps].findIndex((prop:string) => prop === name)
        setSelected({...selected, [category as keyof SelectedProps]: [...selected[category as keyof SelectedProps].slice(0, index), ...selected[category as keyof SelectedProps].slice(index + 1)]})
      } else {
        setSelected({...selected, [category as keyof SelectedProps]: [...selected[category as keyof SelectedProps], name]})
      }
    };
  
    return (
      <div>
        <div className="cursor-pointer text-secondary h-10 w-10" onClick={handleOpen}>
          <Badge badgeContent={Object.values(selected).flat().length} color="warning" overlap="circular">
              <TuneIcon className='pointer-events-none' fontSize='large' />
          </Badge>
        </div>

        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <div className="px-8 py-12 h-screen flex flex-col justify-between">
            <div className="">
              <div className="flex-grow-0 overflow-auto">
                <p className="font-medium text-lg">Locations:</p>
                <div className="flex flex-wrap mt-2 mb-3 gap-2">
                  {locations.map(location => (
                    <div key={location} className={`w-max min-w-[38px] text-center py-2 px-2 text-sm font-medium border rounded-xl ${selected.locations.includes(location) ? 'border-primary text-primary font-semibold' : 'border-zinc-500 text-zinc-500' }`} onClick={() => handleClick('locations',location)}>{location}</div>
                  ))}
                </div>
              </div>

              <div className="">
                <p className="font-medium text-lg">Technologies:</p>
                <div className="flex flex-wrap mt-2 mb-3 gap-2">
                  {technologies.map(tech => (
                    <div key={tech} className={`w-max min-w-[38px] text-center py-2 px-2 text-sm font-medium border rounded-xl ${selected.technologies.includes(tech) ? 'border-primary text-primary font-semibold' : 'border-zinc-500 text-zinc-500' }`} onClick={() => handleClick('technologies', tech)}>{tech}</div>
                  ))}
                </div>
              </div>

              <div className="">
                <p className="font-medium text-lg">Company Type:</p>
                <div className="flex flex-wrap mt-2 mb-3 gap-2">
                  {types.map(type => (
                    <div key={type} className={`w-max min-w-[38px] text-center py-2 px-2 text-sm font-medium border rounded-xl ${selected.type.includes(type) ? 'border-primary text-primary font-semibold' : 'border-zinc-500 text-zinc-500' }`} onClick={() => handleClick('type' ,type)}>{type}</div>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={handleClose} className='cursor-pointer border px-2 mt-15 h-11 font-semibold text-lg items-center shrink-0 rounded-xl flex justify-center text-white bg-primary border-primary uppercase'>Close</button> 
          </div>
        </Dialog>
      </div>
    );
  }

export default FullScreenDialog;