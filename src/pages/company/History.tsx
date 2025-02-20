import React from "react";

interface HistoryProps {
  children?: React.ReactNode;
  title: string;
  year: number;
}

const History = ({ title, year }: HistoryProps): JSX.Element => {
  return (
    <h3>
      History {title} {year}
    </h3>
  );
};
export default History;
