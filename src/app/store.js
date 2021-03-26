import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/task/tasksSlice'

export default configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
