'use client'

import { useToast } from '@/hooks/use-toast'
import { uploadToAppwrite } from '@/lib/actions'
import { cn } from '@/lib/utils'
import { Image, Loader2, MousePointerSquareDashed } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'

const Page = () => {
    const { toast } = useToast()
    const [isDragOver, setIsDragOver] = useState<boolean>(false)
    const [isUploading, setIsUploading] = useState(false)
    const router = useRouter()

    const onDropRejected = (rejectedFiles: FileRejection[]) => {
        const [file] = rejectedFiles

        setIsDragOver(false)

        toast({
            title: `${file.file.type} type is not supported.`,
            description: "Please choose a PNG, JPG, or JPEG image instead.",
            variant: "destructive"
        })
    };

    const onDropAccepted = async (acceptedFiles: File[]) => {
        const [file] = acceptedFiles;
        setIsDragOver(false);

        setIsUploading(true);

        try {
            const fileData = await uploadToAppwrite(file, undefined);
            const configId = fileData.savedConfigId.configId;
            // Redirect after successful upload
            startTransition(() => {
                router.push(`/configure/design?id=${configId}`);
            });
        } catch (error: any) {
            toast({
                title: 'Upload failed',
                description: error.message || 'Something went wrong during upload',
                variant: 'destructive',
            });
        } finally {
            setIsUploading(false);
        }
    };

    const [isPending, startTransition] = useTransition()

    return (
        <div
            className={cn(
                'relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center',
                {
                    'ring-blue-900/25 bg-blue-900/10': isDragOver,
                }
            )}>
            <div className='relative flex flex-1 flex-col items-center justify-center w-full'>
                <Dropzone
                    onDropRejected={onDropRejected}
                    onDropAccepted={onDropAccepted}
                    accept={{
                        'image/png': ['.png'],
                        'image/jpeg': ['.jpeg'],
                        'image/jpg': ['.jpg'],
                    }}
                    onDragEnter={() => setIsDragOver(true)}
                    onDragLeave={() => setIsDragOver(false)}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            className='h-full w-full flex-1 flex flex-col items-center justify-center cursor-pointer'
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            {isDragOver ? (
                                <MousePointerSquareDashed className='h-6 w-6 text-zinc-500 mb-2' />
                            ) : isUploading || isPending ? (
                                <Loader2 className='animate-spin h-6 w-6 text-zinc-500 mb-2' />
                            ) : (
                                <Image className='h-6 w-6 text-zinc-500 mb-2' />
                            )}
                            <div className='flex flex-col justify-center mb-2 text-sm text-zinc-700'>
                                {isUploading ? (
                                    <div className='flex flex-col items-center'>
                                        <p>Uploading...</p>
                                    </div>
                                ) : isPending ? (
                                    <div className='flex flex-col items-center'>
                                        <p>Redirecting, please wait...</p>
                                    </div>
                                ) : isDragOver ? (
                                    <p>
                                        <span className='font-semibold'>Drop file</span> to upload
                                    </p>
                                ) : (
                                    <p>
                                        <span className='font-semibold'>Click to upload</span> or
                                        drag and drop
                                    </p>
                                )}
                            </div>

                            {isPending ? null : (
                                <p className='text-xs text-zinc-500'>PNG, JPG, JPEG</p>
                            )}
                        </div>
                    )}
                </Dropzone>
            </div>
        </div>
    )
}

export default Page