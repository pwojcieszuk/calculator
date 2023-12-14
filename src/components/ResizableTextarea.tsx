import { useEffect, useRef, ChangeEvent } from "react";

interface ResizableTextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

const ResizableTextarea: React.FC<ResizableTextareaProps> = ({
  value,
  onChange,
  className,
  style,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      className={className}
      style={style}
    />
  );
};

export default ResizableTextarea;
