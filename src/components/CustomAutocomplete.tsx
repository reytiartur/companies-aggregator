import { styled } from '@mui/material/styles';
import { Autocomplete, TextField } from '@mui/material';
import { AutocompleteProps, DeleteFns, SelectedProps } from '../utils/types';
import { useContext, useEffect } from 'react';
import { FiltersContext } from '../contexts/FiltersContext';


const StyledAutocomplete = styled(Autocomplete)(
    ({ theme }) => ({
      "& .MuiAutocomplete-popper": {
        width: "100%",
        maxHeight: "100%",
        overflowY: "hidden",
        overflowX: "auto",
      },
  
      "& .MuiAutocomplete-input": {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        "&[aria-expanded='true']": {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
      "& .MuiAutocomplete-tag": {
        maxWidth: "calc(100% - 8px)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: '#175e44',
        fontWeight: '600',
        whiteSpace: 'nowrap',
      },
    })
  );


const CustomAutocomplete = ({ placeholder, id, type, options, deleteRefFns }: AutocompleteProps) => {
  const { selected, setSelected, setDeleteFns } = useContext(FiltersContext)

  const handleAutocompleteChange = (event: any, value: unknown) => {
    setSelected({...selected, [type]: [...(value as Array<string>)]});
  };


  const renderFunction = (value: unknown[], getTagProps: (params: { index: number }) => { onDelete: () => void }) => {
    value.forEach((tag, index) => {
      deleteRefFns[type as keyof SelectedProps][tag as string] = getTagProps({index}).onDelete
    })
    return null
  }

  useEffect(() => {
    setDeleteFns({...deleteRefFns})
  }, [selected])

    return (
      <StyledAutocomplete
          multiple
          fullWidth={true}
          blurOnSelect={true}
          defaultValue={undefined}
          limitTags={1}
          openOnFocus={true}
          getOptionLabel={(option: unknown) => option as string}
          id={id}
          options={options}
          onChange={handleAutocompleteChange}
          disableClearable
          renderInput={(params) => (
              <TextField
                  {...params}
                  color='success'
                  variant="standard"
                  placeholder={placeholder}
              />
          )}
          renderTags={(value, getTagProps) => renderFunction(value, getTagProps as any)}
      />
    )
}

export default CustomAutocomplete