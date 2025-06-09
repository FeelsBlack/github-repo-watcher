import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  forks_count: number;
  watchers_count: number;
  stargazers_count: number;
}

interface GithubState {
  username: string;
  repos: Repo[];
  readme: string;
  loadingRepos: boolean;
  loadingReadme: boolean;
  error: string | null;
}

const initialState: GithubState = {
  username: "",
  repos: [],
  readme: "",
  loadingRepos: false,
  loadingReadme: false,
  error: null,
};

export const fetchRepos = createAsyncThunk<
  Repo[],
  string,
  { rejectValue: string }
>("github/fetchRepos", async (username, thunkAPI) => {
  try {
    const response = await axios.get<Repo[]>(
      `https://api.github.com/users/${username}/repos`,
    );
    return response.data;
  } catch {
    return thunkAPI.rejectWithValue("User not Found");
  }
});

export const fetchReadme = createAsyncThunk<
  string,
  { username: string; repoName: string },
  { rejectValue: string }
>("github/fetchReadme", async ({ username, repoName }, thunkAPI) => {
  try {
    const response = await axios.get<string>(
      `https://api.github.com/repos/${username}/${repoName}/readme`,
      { headers: { Accept: "application/vnd.github.v3.raw" } }
    );
    return response.data;
  } catch {
    return thunkAPI.rejectWithValue("Readme not Found.");
  }
});

const slice = createSlice({
  name: "github",
  initialState,
  reducers: {
    clearReadme(state) {
      state.readme = "";
    },
    clearRepos(state) {
      state.repos = [];
    },
    clearError(state) {
      state.error = null;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loadingRepos = true;
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loadingRepos = false;
        state.repos = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loadingRepos = false;
        state.error = action.payload || "Fail to fetch the repo";
      })
      .addCase(fetchReadme.pending, (state) => {
        state.loadingReadme = true;
        state.error = null;
      })
      .addCase(fetchReadme.fulfilled, (state, action) => {
        state.loadingReadme = false;
        state.readme = action.payload;
      })
      .addCase(fetchReadme.rejected, (state, action) => {
        state.loadingReadme = false;
        state.error = action.payload || "Fail to fetch the readme";
      });
  },
});

export const { clearReadme, setUsername, clearRepos, clearError } =
  slice.actions;

export default slice.reducer;
