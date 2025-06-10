import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import "./styles/Readme.css";
import { clearReadme } from "../store/slice";
import { ModeToggle } from "./ModeToggle";

interface ReadmeProps {
  content: string;
}

export const Readme = ({ content }: ReadmeProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const clear = () => {
    dispatch(clearReadme());
  };

  if (!content) return null;

  return (
    <div className="readme-container">
      <div className="cta-container">
        <button
          className="button-back"
          onClick={() => {
            clear();
          }}
        >
          <ArrowLeft />
        </button>
        <ModeToggle />
        <div style={{ width: "38px", height: "38px" }} />
      </div>
      <div className="readme">
        <div className="markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
