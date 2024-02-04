import React from "react";
import TodoItem from "./TodoItem";

const TodoItemList = (props) => {
  const list = props.data.map((Item) => (
    <TodoItem
      key={Item.id}
      Item={Item}
      onComplete={props.onComplete}
      onRemove={props.onRemove}
      onUpdate={props.onUpdate}
    />
  ));

  return <div>{list}</div>;
};

export default TodoItemList;
