import React from "react"

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
    sentDate?: Date | undefined
}

export interface CompaniesContextType {
    companiesList: CompanyProps[];
    setCompaniesList: React.Dispatch<React.SetStateAction<CompanyProps[]>>
    companies: CompanyProps[],
    setCompanies: React.Dispatch<React.SetStateAction<CompanyProps[]>>
    savedCompanies: Company[];
    setSavedCompanies: React.Dispatch<React.SetStateAction<Company[]>>
}

export interface CompaniesProviderProps {
    children: React.ReactNode;
}

export interface AutocompleteProps {
    placeholder: string
    id: string
    options: string[]
    type: keyof SelectedProps
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

export interface FiltersContextType {
    selected: SelectedProps;
    setSelected: (selected: SelectedProps) => void;
    deleteFns: DeleteFns;
    setDeleteFns: (DeleteFns: DeleteFns) => void;
}

export interface FiltersProviderProps {
    children: React.ReactNode
}