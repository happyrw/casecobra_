import { db } from '@/lib/db'
import DesignPreview from './DesignPreview'
import { notFound } from 'next/navigation'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
    const { id } = await searchParams

    if (!id || typeof id !== 'string') {
        return notFound()
    };

    const configuration = await db.configuration.findUnique({
        where: { id },
    })

    if (!configuration) {
        return notFound()
    };

    return (
        <div>
            <DesignPreview configuration={configuration} />
        </div>
    )
}

export default Page