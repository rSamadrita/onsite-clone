import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parties: []
};

const partySlice = createSlice({
  name: "parties",

  initialState,

  reducers: {

    addParty: (state, action) => {
      state.parties.push(action.payload);
    },

    updateParty: (state, action) => {

      const index = state.parties.findIndex(
        p => p.id === action.payload.id
      );

      if (index !== -1) {
        state.parties[index] = action.payload;
      }

    },

    deleteParty: (state, action) => {

      state.parties =
        state.parties.filter(
          p => p.id !== action.payload
        );

    }

  }

});

export const {

addParty,

updateParty,

deleteParty

} = partySlice.actions;

export default partySlice.reducer;