import React from "react";
import { Repo } from "../store/slice";
import { Eye, GitFork, Stars } from "lucide-react";
import "./styles/ListChild.css";

interface ListChildProps {
  repo: Repo;
  onSelect: (repoName: string) => void;
}

export const ListChild = ({ repo, onSelect }: ListChildProps) => {
  return (
    <div className="child-container" key={repo.id}>
      <h3
        onClick={(e) => {
          e.preventDefault();
          onSelect(repo.name);
        }}
      >
        {repo.name + " >"}
      </h3>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
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
    </div>
  );
};
