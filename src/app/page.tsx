"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState, AppDispatch } from "./store/store";
import SearchBar from "./components/SearchBar";
import styles from "./page.module.css";
import {
  clearReadme,
  fetchReadme,
  fetchRepos,
  setUsername,
} from "./store/slice";
import Lists from "./components/List";
import Readme from "./components/Readme";
import { ModeToggle } from "./components/ModeToggle";

function PageContent() {
  const { username, repos, readme, error } =
    useSelector((state: RootState) => state.github);
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (user: string) => {
    dispatch(setUsername(user));
    dispatch(clearReadme());
    dispatch(fetchRepos(user));
  };

  const handleSelectRepo = (repoName: string) => {
    dispatch(fetchReadme({ username, repoName }));
  };

  return readme ? (
    <Readme content={readme} />
  ) : (
    <div className={styles.page}>
      <h2>GitHub Repo Watcher</h2>
      <ModeToggle />
      <SearchBar onSearch={handleSearch} />
      <Lists repos={repos} onSelect={handleSelectRepo} error={error} />
    </div>
  );
}

export default function Page() {
  return (
    <Provider store={store}>
      <PageContent />
    </Provider>
  );
}
