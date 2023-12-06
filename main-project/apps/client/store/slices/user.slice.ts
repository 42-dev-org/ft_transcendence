import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserType {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  url: string;
  profileImage: string;
  kind: string;
  login: string;
  phone: string;
}

interface InitialStateType {
  isAuthenticated: boolean;
  user: UserType | null;
}

const initialState: InitialStateType = {
  isAuthenticated: false,
  user: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<UserType>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { setIsAuth, updateUser, setUser } = user.actions;
export default user.reducer;
