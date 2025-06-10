import { clearError, Repo } from "../store/slice";
import { ListChild } from "./ListChild";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { CircleArrowLeft } from "lucide-react";
import "./styles/List.css";

interface ListsProps {
  repos: Repo[];
  onSelect: (repoName: string) => void;
  error: string | null;
}

export const List = ({ repos, onSelect, error }: ListsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { loadingReadme, loadingRepos, isExistNoData } = useSelector(
    (state: RootState) => state.github
  );

  return (
    <div className="lists-main-container">
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
            <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
          </div>
        ) : repos.length > 0 ? (
          repos.map((repo) => (
            <ListChild repo={repo} key={repo.id} onSelect={onSelect} />
          ))
        ) : (
          <div className="no-repos">
            {isExistNoData
              ? "No Repositories in this git Username"
              : "Search the user to get Repo Lists."}
          </div>
        )}
      </div>
    </div>
  );
};
