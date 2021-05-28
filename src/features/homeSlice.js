import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seatsList: [],
  dataList: [],
  bookingList: [],
  windowSize: 0,
  rowsCols: { cols: 0, rows: 0 },
  proposedSeatsList: [],
};

const homeSlice = createSlice({
  name: "seatsNumber",
  initialState,
  reducers: {
    saveSize: (state, action) => {
      state.windowSize = action.payload;
    },
    saveSeats: (state, action) => {
      state.seatsList.push(action.payload);
    },
    saveData: (state, action) => {
      state.dataList.push(action.payload);
    },
    saveBooking: (state, action) => {
      state.bookingList.push(action.payload);
    },
    saveRowsCols: (state, action) => {
      state.rowsCols = action.payload;
    },
    saveProposedSeats: (state, action) => {
      state.proposedSeatsList = action.payload;
    },
  },
});

export const {
  saveSeats,
  saveData,
  saveBooking,
  saveSize,
  saveRowsCols,
  saveProposedSeats,
} = homeSlice.actions;

export const selectSeatList = (state) => state.seats.seatsList;
export const selectDataList = (state) => state.seats.dataList;
export const selectBookingList = (state) => state.seats.bookingList;
export const selectSize = (state) => state.seats.windowSize;
export const selectRowsCols = (state) => state.seats.rowsCols;
export const selectProposedSeats = (state) => state.seats.proposedSeatsList;
export default homeSlice.reducer;
