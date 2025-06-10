import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CircleArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import "./styles/Readme.css";
import { clearReadme } from "../store/slice";

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
      <CircleArrowLeft
        className="back"
        onClick={() => {
          clear();
        }}
      />
      <div className="readme">
        <div className="markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
