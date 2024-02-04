import React from "react";
import LogItem from "./LogItem";

const LogItemList = (props) => {
  const list = props.data.map((Item) => <LogItem Item={Item} />);

  return <div>{list}</div>;
};

export default LogItemList;
