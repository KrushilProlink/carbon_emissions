import { createSlice } from "@reduxjs/toolkit";


const totalCommsSlice = createSlice({
    name: "totalComms",
    initialState: {
        data: [],
        totalEmission: 0,
        scope: 3
    },
    reducers: {
        addCommsData: (state, action) => {
            const newData = Array.isArray(action.payload) ? action.payload : [action.payload];
            newData.forEach((newItem) => {
                const existingItemIndex = state.data.findIndex((item) => item.type === newItem.type);
                if (existingItemIndex !== -1) {
                    // Update the existing item
                    state.data[existingItemIndex] = { ...state.data[existingItemIndex], ...newItem };
                } else {
                    // Add the new item
                    state.data.push(newItem);
                }
            });

            state.totalEmission = state.data[0].data.reduce((total, item) => item.emission ? total + Number(item.emission) : total, 0).toFixed(2);        },
        deleteCommsData: (state, action) => ({
            ...state,
            data: [],
            totalEmission: 0,
            scope: 3
        }),
        scopeChange: (state, action) => ({
            ...state,
            scope: action.payload.scope
        })
    },
});

export const { addCommsData, deleteCommsData, scopeChange } = totalCommsSlice.actions;
export default totalCommsSlice.reducer;