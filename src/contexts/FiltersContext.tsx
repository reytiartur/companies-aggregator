import { createContext, FC, useState } from "react";
import { DeleteFns, FiltersContextType, FiltersProviderProps, SelectedProps } from "../utils/types";



const FiltersContext = createContext<FiltersContextType>({
  selected: {locations: [], technologies: [], type: []},
  setSelected: () => {},
  deleteFns: {locations: {}, technologies: {}, type: {}},
  setDeleteFns: () => {}
});

const FiltersProvider: FC<FiltersProviderProps> = ({ children }) => {
    const [selected, setSelected] = useState<SelectedProps>({locations: [], technologies: [], type: []})
    const [deleteFns, setDeleteFns] = useState<DeleteFns>({locations: {}, technologies: {}, type: {}})

  return (
    <FiltersContext.Provider value={{selected, setSelected, deleteFns, setDeleteFns}}>
        {children}
    </FiltersContext.Provider>
  )
};

export { FiltersContext, FiltersProvider };