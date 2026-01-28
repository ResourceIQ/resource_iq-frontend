"use client"

import { createContext, useContext, useRef, ReactNode, useCallback, useMemo } from "react"
import { LoadingBarRef } from "react-top-loading-bar"

type HeaderLoaderContextType = {
    loaderRef: React.RefObject<LoadingBarRef | null>
    start: () => void
    finish: () => void
}

const HeaderLoaderContext = createContext<HeaderLoaderContextType | null>(null)

export function HeaderLoaderProvider({ children }: { children: ReactNode }) {
    const loaderRef = useRef<LoadingBarRef>(null)

    const start = useCallback(() => {
        loaderRef.current?.continuousStart()
    }, [])

    const finish = useCallback(() => {
        loaderRef.current?.complete()
    }, [])

    const contextValue = useMemo(() => ({
        loaderRef,
        start,
        finish
    }), [start, finish])

    return (
        <HeaderLoaderContext.Provider value={contextValue}>
            {children}
        </HeaderLoaderContext.Provider>
    )
}

export function useHeaderLoader() {
    const context = useContext(HeaderLoaderContext)
    if (!context) {
        throw new Error("useHeaderLoader must be used within a HeaderLoaderProvider")
    }
    return context
}