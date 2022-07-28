import Image from "next/image"
import { Play } from "phosphor-react"

interface Props {
    ep: {
        thumbnail: string
        title: string
        members: string
        publishedAt: string
        file: {
            durationAsString: string
        }
    }
}

export const Card = ({ ep }: Props) => {

    return (
        <li className="
              bg-white border border-gray-100 
              p-5 rounded-3xl shadow-sm 
              relative 
              flex items-center 
              "
        >
            <Image
                width={96}
                height={96}
                src={ep.thumbnail}
                alt={ep.title}
                className="w-24 h-24 rounded-2xl"
                objectFit='cover'
            />

            <div className="flex-1 ml-4">
                <a href="" className='block text-gray-800 font-display leading-relaxed hover:underline'>{ep.title}</a>
                <p className='text-sm mt-2 max-w-[70%] whitespace-nowrap overflow-hidden text-ellipsis'>{ep.members}</p>
                <span className='
                inline-block mt-2 text-sm
                mr-2 pr-4 
                relative
                before:w-[4px] 
                before:h-[4px] 
                before:bg-[#ddd]
                before:rounded-sm 
                before:right-0 
                before:top-[50%] 
                before:absolute
                '>{ep.publishedAt}</span>
                <span className='
                inline-block 
                mt-2 
                text-sm
                '>{ep.file.durationAsString}</span>
            </div>
            <button type='button'
                className='
                absolute 
                right-8 bottom-8 
                w-10 h-10 
                border-spacing-2 
                 border-gray-100 
                rounded-xl
                flex
                items-center
                justify-center
                transition-colors

                hover:brightness-90
               '>
                <Play size={24} color="#04D361" weight='fill' />
            </button>
        </li>
    );
}