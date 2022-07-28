

export const convertDurationToTimeString = (duration: number): string => {

    const hours = Math.floor(duration / 3600)// (60 * 60) = 1 hora
    const minutes = Math.floor((duration % 3600) / 60)//resto da divisão de 3600 dividido por 60 segundo
    const seconds = Math.floor(duration % 60)

    const timeStringDuration = [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2, '0')).join(':')
    //join e para unir
    //o padStart e para sempre que nao tiver dois dígitos colocar o 0 na frente

    return timeStringDuration
}