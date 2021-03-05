import { createContext } from 'preact'
import { Airgram } from '.'

type AirgramContextProps = Airgram

export const AirgramContext = createContext<AirgramContextProps>({} as never)
