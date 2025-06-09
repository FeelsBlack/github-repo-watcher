import React from "react";
import { clearError, Repo } from "../store/slice";
import "./styles/List.css";
import { ListChild } from "./ListChild";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { CircleArrowLeft } from "lucide-react";

interface RepoListProps {
  repos: Repo[];
  onSelect: (repoName: string) => void;
  error: string | null;
}

const Lists: React.FC<RepoListProps> = ({ repos, onSelect, error }) => {
    const dispatch = useDispatch<AppDispatch>();
  
  const { loadingReadme, loadingRepos } = useSelector(
    (state: RootState) => state.github
  );
console.log(repos)
  return (
    <div className={repos.length >= 0 ? "lists-main-container" : ""}>
      <div className="lists-container">
        {loadingReadme || loadingRepos ? (
          <div>
            <div className="loader" />
          </div>
        ) : error ? (
          <div>
            <CircleArrowLeft
              className="back-error"
              onClick={() => {
                dispatch(clearError());
              }}
            />
            <p style={{ color: "red" }}>{error}</p>
          </div>
        ) : repos.length > 0 ? (
          repos.map((repo) => (
            <ListChild key={repo.id} repo={repo} onSelect={onSelect} />
          ))
        ) : (
          <div className="no-repos">Search the user to get Repo Lists.</div>
        )}
      </div>
    </div>
  );
};

export default Lists;
