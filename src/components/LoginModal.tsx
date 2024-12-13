import type { Dispatch, SetStateAction } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from './ui/dialog'
import Image from 'next/image'
import { SignInButton, SignUpButton } from '@clerk/nextjs'

// import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'

const LoginModal = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <div className='relative mx-auto w-24 h-24 mb-2'>
                        <Image
                            src='/snake-1.png'
                            alt='snake image'
                            className='object-contain'
                            fill
                        />
                    </div>
                    <DialogTitle className='text-3xl text-center font-bold tracking-tight text-gray-900'>
                        Log in to continue
                    </DialogTitle>
                    <DialogDescription className='text-base text-center py-2'>
                        <span className='font-medium text-zinc-900'>
                            Your configuration was saved!
                        </span>{' '}
                        Please login or create an account to complete your purchase.
                    </DialogDescription>
                </DialogHeader>

                <div className='grid grid-cols-2 gap-6 divide-x divide-gray-200'>
                    <div className='border border-input bg-background hover:bg-accent hover:text-accent-foreground text-center rounded-md py-1.5'>
                        <SignInButton />
                    </div>
                    <div className='bg-primary text-primary-foreground hover:bg-primary/90 text-center rounded-md py-1.5'>
                        <SignUpButton />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal;