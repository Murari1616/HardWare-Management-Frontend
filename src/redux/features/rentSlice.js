import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "@/appConstants";

const initialState = {
    rents: [],
    isLoading: false,
    error: null,
    status: null,
};

// Create Rent
export const createRent = createAsyncThunk(
    "rents/createRent",
    async (rentData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}rent/createRent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(rentData),
            });
            const data = await res.json();
            if (data.success) {
                
                return data;
            }
            return rejectWithValue(data.message);
        } catch (error) {
            return rejectWithValue(error.message || "An error occurred");
        }
    }
);


// Get All Rents
export const getAllRents = createAsyncThunk("rents/getAll", async (_, { rejectWithValue }) => {
    try {
        const res = await fetch(`${BASE_URL}rent/getAllRents`, );
        const data = await res.json();
        if (data.success) return data;
        return rejectWithValue(data.message);
    } catch (error) {
        return rejectWithValue(error.message || "An error occurred");
    }
});

// Delete Rent
export const deleteRentById = createAsyncThunk("rents/delete", async (id, { rejectWithValue }) => {
    try {
        const res = await fetch(`${BASE_URL}/rent/deleteRent/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
        const data = await res.json();
        if (data.success) return id;
        return rejectWithValue(data.message);
    } catch (error) {
        return rejectWithValue(error.message || "An error occurred");
    }
});

// Rents Slice
const rentsSlice = createSlice({
    name: "rents",
    initialState,
    reducers: {
        emptyError: (state) => { state.error = null; },
        emptyStatus: (state) => { state.status = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRent.pending, (state) => { state.isLoading = true; state.status = null; })
            .addCase(createRent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = "success";
                state.rents.push(action.payload.data);
            })
            .addCase(createRent.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.status = "fail";
            })
            .addCase(getAllRents.fulfilled, (state, action) => { state.rents = action.payload.data; })
            .addCase(deleteRentById.fulfilled, (state, action) => { state.rents = state.rents.filter((p) => p.id !== action.payload); });
    },
});

export const { emptyError, emptyStatus } = rentsSlice.actions;
export default rentsSlice.reducer;
