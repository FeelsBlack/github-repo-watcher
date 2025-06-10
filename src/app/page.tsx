"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState, AppDispatch } from "./store/store";
import styles from "./page.module.css";
import {
  clearReadme,
  fetchReadme,
  fetchRepos,
  setUsername,
} from "./store/slice";
import { ModeToggle } from "./components/ModeToggle";
import { Readme } from "./components/Readme";
import { SearchBar } from "./components/SearchBar";
import { List } from "./components/List";
import { useCallback } from "react";

function PageContent() {
  const { username, repos, readme, error } =
    useSelector((state: RootState) => state.github);
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = useCallback((user: string) => {
    dispatch(setUsername(user));
    dispatch(clearReadme());
    dispatch(fetchRepos(user));
  }, [dispatch]);

  const handleSelectRepo = useCallback((repoName: string) => {
    dispatch(fetchReadme({ username, repoName }));
  }, [dispatch, username]);

  return readme ? (
    <Readme content={readme} />
  ) : (
    <div className={styles.page}>
      <h2>GitHub Repo Watcher</h2>
      <ModeToggle />
      <SearchBar onSearch={handleSearch} />
      <List repos={repos} onSelect={handleSelectRepo} error={error} />
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
