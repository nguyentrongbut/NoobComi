"use client";
import ChapterHeader from "./chapter.header";
import ChapterFooter from "./chapter.footer";
import { useEffect, useRef, useState } from "react";

const FeatHover = ({
  data,
  slugChapters,
}: {
  data: any;
  slugChapters: string;
}) => {
  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const updateVisibility = (mouseY: number) => {
    const windowHeight = window.innerHeight;

    setShowHeader(mouseY < 73);
    setShowFooter(mouseY > windowHeight - 73);
  };

  const handleMouseMove = (event: MouseEvent) => {
    updateVisibility(event.clientY);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      headerRef.current &&
      footerRef.current &&
      !headerRef.current.contains(event.target as Node) &&
      !footerRef.current.contains(event.target as Node)
    ) {
      setShowHeader((prev) => !prev);
      setShowFooter((prev) => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <div
        ref={headerRef}
        className={`transition-opacity duration-500 ${
          showHeader ? "opacity-100" : "opacity-0"
        }`}
      >
        <ChapterHeader
          titleChapter={data.content}
          totalLike={data.likes}
          totalComment={data.comments}
          slugChapters={slugChapters}
        />
      </div>
      <div
        ref={footerRef}
        className={`transition-opacity duration-500 ${
          showFooter ? "opacity-100" : "opacity-0"
        }`}
      >
        <ChapterFooter />
      </div>
    </div>
  );
};

export default FeatHover;
