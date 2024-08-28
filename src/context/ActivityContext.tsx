import { ReactNode, createContext, useReducer, Dispatch, useMemo} from 'react'
import { ActivityActions, activityReducer, ActivityState, initialState } from '../reducers/activity-reducer'
import { Activity } from '../types'
import { categories } from '../data/categories'

type ActivityContextProps = {
    state: ActivityState,
    dispatch: Dispatch<ActivityActions>,
    categoryName: (category: Activity["category"]) => string[],
    isEmptyActivities: boolean
}

type ActivityProviderProps = {
    children: ReactNode,
}

//creando el contexto
export const ActivityContext = createContext<ActivityContextProps>(null!)

// las props de ActivityProvider es la <App />, que esta envuelto en el archivo main.tsx
export const ActivityProvider = ({ children }: ActivityProviderProps) => {
    
    const [ state, dispatch ] = useReducer(activityReducer, initialState)

    const categoryName = useMemo(() => (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : '' )
    , [state.activities])
    
    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])
    
    return (
        <ActivityContext.Provider 
            value={{
                state,
                dispatch,
                categoryName,
                isEmptyActivities
            }}
        >
            {children}
        </ActivityContext.Provider>
    )
}

