import format from 'date-fns/format'
import ptBr from 'date-fns/locale/pt-BR'

export const Header = () => {

    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBr
    })

    return (
        <header className="
            bg-white h-28 flex items-center 
            py-8 px-16 
            border-b-[1.px] border-gray-100
            "
        >
            <img src="logo.svg" alt="Podcastr" />

            <p className="ml-8 py-1 px-8 border-l-2  border-gray-100">O melhor para você ouvir, sempre</p>

            <span className="ml-auto capitalize">{currentDate}</span>
        </header>
    );
}