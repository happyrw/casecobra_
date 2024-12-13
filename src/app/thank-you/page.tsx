import { Suspense } from 'react'
import ThankYou from './ThankYou'

const Page = async () => {
    return (
        <Suspense>
            <ThankYou />
        </Suspense>
    )
}

export default Page // 1:59