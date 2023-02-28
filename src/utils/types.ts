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
