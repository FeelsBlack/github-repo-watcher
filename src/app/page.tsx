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
import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { Info } from "lucide-react";

function PageContent() {
  const { username, repos, readme, error } = useSelector(
    (state: RootState) => state.github
  );
  const dispatch = useDispatch<AppDispatch>();
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleSearch = useCallback(
    (user: string) => {
      dispatch(setUsername(user));
      dispatch(clearReadme());
      dispatch(fetchRepos(user));
    },
    [dispatch]
  );

  const handleSelectRepo = useCallback(
    (repoName: string) => {
      dispatch(fetchReadme({ username, repoName }));
    },
    [dispatch, username]
  );

  useEffect(() => {
    if (titleRef.current && titleRef.current.children.length > 0) {
      gsap.fromTo(
        titleRef.current.children,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [readme]);

  return readme ? (
    <div ref={titleRef}>
      <Readme content={readme} />
    </div>
  ) : (
    <div className={styles.page} ref={titleRef}>
      <h2>GitHub Repo Watcher</h2>
      <ModeToggle />
      <SearchBar onSearch={handleSearch} />
      <div>
        <div className={styles.infoContainer}>
          <Info size={20}/>
          <h5>Click the repo title to see Readme.md</h5>
        </div>
        <List repos={repos} onSelect={handleSelectRepo} error={error} />
      </div>
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
