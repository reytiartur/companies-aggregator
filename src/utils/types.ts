import { AutocompleteChangeReason } from "@mui/material"

export interface CompanyProps {
    name: string
    description: string
    linkedin: string
    locations: string[]
    logoUrl: string
    technologies: string[]
    type: string
    website: string
}

export interface Company {
    name: string,
    sent: boolean,
    later: boolean,
    sentDate?: Date
}

export interface CompaniesContextType {
    companies: Company[];
    setCompanies: (companies: Company[]) => void;
}

export interface CompaniesProviderProps {
    children: React.ReactNode;
}

export interface CityProps {
    name: string,
    lat: string,
    lng: string,
    country: string,
    countryCode: string
}

export interface AutocompleteProps {
    placeholder: string
    id: string
    options: string[]
    type: keyof SelectedProps
    selected: SelectedProps
    setSelected: Function
    deleteFns: DeleteFns
    setDeleteFns: React.Dispatch<React.SetStateAction<DeleteFns>>
    deleteRefFns: DeleteFns
}

export interface SelectedProps {
    locations: string[]
    technologies: string[]
    type: string[]
}

export interface ChipProps {
    value: string
    type: string
    deleteFns: DeleteFns
}

export interface DeleteFns {
    locations: { [key: string]: () => void },
    technologies: { [key: string]: () => void },
    type: { [key: string]: () => void }
}