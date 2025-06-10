import React, { useRef, useState } from "react";
import { Repo } from "../store/slice";
import { Eye, GitFork, Stars } from "lucide-react";
import "./styles/ListChild.css";

interface ListChildProps {
  repo: Repo;
  onSelect: (repoName: string) => void;
}

export const ListChild = ({ repo, onSelect }: ListChildProps) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setTooltipPosition({
      top: rect.top + window.scrollY - 55,
      left: rect.left + window.scrollX,
      });
      setTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div
      className="child-container"
      key={repo.id}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3
        onClick={(e) => {
          e.preventDefault();
          onSelect(repo.name);
        }}
      >
        {repo.name + " >"}
      </h3>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        {repo.html_url}
      </a>
      <div className="child-counts">
        <span>
          <GitFork />
          {repo.forks_count}
        </span>
        <span>
          <Eye />
          {repo.watchers_count}
        </span>
        <span>
          <Stars />
          {repo.stargazers_count}
        </span>
      </div>
      {tooltipVisible && (
        <div
          className="tooltip"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
        >
          Click title to see Readme.md of:
          <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
            {repo.name}
          </span>
        </div>
      )}
    </div>
  );
};
