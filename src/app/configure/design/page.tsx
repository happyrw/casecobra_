import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import DesignConfigurator from './DesignConfigurator'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
    const { id } = await searchParams

    if (!id || typeof id !== 'string') {
        return notFound()
    }

    const configuration = await db.configuration.findUnique({
        where: { id },
    })

    if (!configuration) {
        return notFound()
    }

    const { imageUrl, width, height } = configuration

    return (
        <DesignConfigurator
            configId={configuration.id}
            imageDimensions={{ width, height }}
            imageUrl={imageUrl}
        />
    )
}

export default Page