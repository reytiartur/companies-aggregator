import { Card, Skeleton } from '@mui/material'

const LoadingCompanyComponent = () => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '416px', padding: '16px', borderRadius: '8px', border: '2px solid white'}} variant="outlined">
        <div className="flex gap-5 w-full">
            <Skeleton variant="rounded" width={106} height={106} />
            <div className="flex flex-col gap-2">
                <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '0.75rem', width: '45%' }} />
                <Skeleton variant="text" sx={{ fontSize: '0.75rem', width: '25%' }} />
            </div>
        </div>
        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '55%', marginTop: '12px', marginBottom: '8px' }} />
        <Skeleton variant="rounded" width={'100%'} height={53} />
        <Skeleton variant="text" sx={{ fontSize: '0.75rem', width: '100%', marginTop: '8px' }} />
        <Skeleton variant="text" sx={{ fontSize: '0.75rem', width: '100%' }} />
        <Skeleton variant="text" sx={{ fontSize: '0.75rem', width: '100%' }} />
        <Skeleton variant="text" sx={{ fontSize: '0.75rem', width: '25%', marginTop: '4px', marginBottom: 'auto' }} />
        <Skeleton variant="rounded" width={'100%'} height={44} />
    </Card>
  )
}

export default LoadingCompanyComponent