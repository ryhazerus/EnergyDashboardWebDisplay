import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { } from '@redux-devtools/extension' // required for devtools typing

interface BearState {
    meter: UserConfiguration
    setMeter: (by: UserConfiguration) => void
}

export const useConnectionStore = create<BearState>()(
    devtools(
        persist(
            (set) => ({
                meter: {} as UserConfiguration,
                setMeter: (by) => set((state) => ({ meter: by })),
            }),
            {
                name: 'meter-storage',
            },
        ),
    ),
)