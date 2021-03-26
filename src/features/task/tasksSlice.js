import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const baseURL = "http://todolistsapi.herokuapp.com";
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {

  // Authenticate
  const tokenData = await fetch(`${baseURL}/auth`, {
    method: 'POST'
    , headers: { 'content-type': 'application/json' }
    , body: JSON.stringify({ 'name': 'admin', 'password': 'admin' })
  });
  const data = await tokenData.json();

  // Fetch tsaks
  const res = await fetch(`${baseURL}/tasks`, {
    headers: { 'Authorization': 'Bearer ' + data.token }
  });
  const tasks = await res.json();

  return tasks
})

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null
  },
  reducers: {
    taskAdded: (state, action) => {
      state.tasks.push(action.payload);
    },
  },
  extraReducers: {
    [fetchTasks.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched tasks to the array
      state.tasks = state.tasks.concat(action.payload)
    },
    [fetchTasks.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
});


export const { taskAdded } = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectAllTasks = state => state.tasks.tasks;


