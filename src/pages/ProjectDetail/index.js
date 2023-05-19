import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useStyles from "./styles";

export default function ProjectDetail() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return <div />;
}
