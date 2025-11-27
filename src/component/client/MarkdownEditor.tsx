import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownEditor() {
  const [text, setText] = useState("# Hello Markdown\nGõ gì cũng hiện bên phải");

  return (
    <div className="flex h-screen">
      
      <textarea
        className="w-1/2 p-4 border-r outline-none resize-none font-mono"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="w-1/2 p-4 overflow-auto prose max-w-none">
        <ReactMarkdown>
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}
