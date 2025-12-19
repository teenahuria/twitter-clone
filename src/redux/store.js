import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tweetSlice from "./tweetSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

// persist config
const persistConfig = {
  key: "root",
  storage,
};

// combine reducers
const rootReducer = (state, action) => ({
  user: userSlice(state?.user, action),
  tweet: tweetSlice(state?.tweet, action),
});

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store with middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// persistor
export const persistor = persistStore(store);
