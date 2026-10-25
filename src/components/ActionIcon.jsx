import {
  useSortable
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

function ActionIcon({
  action,
  selected,
  onSelect
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: action.id
  });

  return (
    <img
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      src={action.icon}
      alt={action.name}
      title={action.name}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(action.id);
      }}
      style={{
        width:
          action.category === "weaponskill"
            ? 64
            : 40,

        height:
          action.category === "weaponskill"
            ? 64
            : 40,

        cursor: "grab",

        border: selected
          ? "3px solid #4da3ff"
          : "none",

        borderRadius: "6px",

        transform:
          CSS.Transform.toString(
            transform
          ),

        transition
      }}
    />
  );
}

export default ActionIcon;