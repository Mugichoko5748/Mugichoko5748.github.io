import {
    DndContext,
    closestCenter
} from "@dnd-kit/core";

import {
    SortableContext,
    horizontalListSortingStrategy
} from "@dnd-kit/sortable";

import ActionIcon from "./ActionIcon";

function Timeline({
    timeline,
    selectedActionId,
    onSelect,
    onMove
}) {
    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
                if (over) {
                    onMove(active.id, over.id);
                }
            }}
        >
            <SortableContext
                items={timeline.map((a) => a.id)}
                strategy={
                    horizontalListSortingStrategy
                }
            >
                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                        minHeight: "100px",
                        border: "1px solid gray",
                        padding: "8px",
                        overflowX: "auto"
                    }}
                    onClick={() => onSelect(null)}
                >
                    {timeline.map((action) => (
                        <ActionIcon
                            key={action.id}
                            action={action}
                            selected={
                                action.id === selectedActionId
                            }
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}

export default Timeline;