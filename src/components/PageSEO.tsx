import { useEffect } from "react";

interface PageSEOProps {
  title: string;
}

const PageSEO = ({ title }: PageSEOProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export default PageSEO;
