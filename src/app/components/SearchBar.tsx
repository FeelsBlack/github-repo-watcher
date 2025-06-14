import { RefreshCw, Search, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import "./styles/SearchBar.css";
import { clearReadme, clearRepos, setUsername,  } from "../store/slice";

interface SearchBarProps {
  onSearch: (input: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const loadingRepos = useSelector(
    (state: RootState) => state.github.loadingRepos
  );
  const username = useSelector((state: RootState) => state.github.username);
  const dispatch = useDispatch<AppDispatch>();
  const [input, setInput] = useState(username);
  const [isRotating, setIsRotating] = useState(false);

  const handleSubmit = () => {
    if (input) onSearch(input);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const clearAll = () => {
    setIsRotating(true);
    setTimeout(() => {
      dispatch(clearReadme());
      dispatch(clearRepos());
      setInput("");
      dispatch(setUsername(""));
      setIsRotating(false);
    }, 600);
  };

  return (
    <div className="container-search-bar">
      <div className="search-bar">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={handleKeyPress}
          placeholder="Enter GitHub username.."
        />
        <div className="search-child">
          {input && (
            <X
              size={18}
              className="x-icon"
              onClick={() => {
                setInput("");
              }}
            />
          )}
          <button
            aria-label="Search repositories" 
            onClick={() => {
              if (!loadingRepos) handleSubmit();
            }}
          >
            {loadingRepos ? (
              <div className="loader-search" />
            ) : (
              <Search size={18} />
            )}
          </button>
        </div>
      </div>
      <button
        aria-label="Clear all"
        className="clear-all"
        onClick={() => {
          clearAll();
        }}
      >
        <RefreshCw
          size={18}
          className={`icon ${isRotating ? "rotate" : "noRotate"}`}
        />
      </button>
    </div>
  );
};
