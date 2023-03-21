import { createContext, FC, useState } from "react";
import { DeleteFns, FiltersContextType, FiltersProviderProps, SelectedProps } from "../utils/types";



const FiltersContext = createContext<FiltersContextType>({
  selected: {locations: [], technologies: [], type: []},
  setSelected: () => {},
  deleteFns: {locations: {}, technologies: {}, type: {}},
  setDeleteFns: () => {},
  selectedCat: 'all',
  setSelectedCat: () => '',
  search: '', 
  setSearch: () => ''
});

const FiltersProvider: FC<FiltersProviderProps> = ({ children }) => {
  const [selected, setSelected] = useState<SelectedProps>({locations: [], technologies: [], type: []})
  const [deleteFns, setDeleteFns] = useState<DeleteFns>({locations: {}, technologies: {}, type: {}})
  const [selectedCat, setSelectedCat] = useState<string>('all')
  const [search, setSearch] = useState<string>('')

  return (
    <FiltersContext.Provider value={{selected, setSelected, deleteFns, setDeleteFns, selectedCat, setSelectedCat, search, setSearch}}>
        {children}
    </FiltersContext.Provider>
  )
};

export { FiltersContext, FiltersProvider };