import { create } from 'zustand'
import type { } from '@redux-devtools/extension' // required for devtools typing

interface DataState {
    dataStream: SmartMeter;
    updateMeter: (newMeterReading: SmartMeter) => void;
}

export const useDataStore = create<DataState>((set) => ({
    dataStream: {} as SmartMeter, // Provide an initial value for dataStream
    updateMeter: (newMeterReading: SmartMeter) => set({ dataStream: newMeterReading }),
}));