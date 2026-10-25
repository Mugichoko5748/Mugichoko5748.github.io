import { useState, useEffect, useRef } from "react";

import { actions } from "./data/actions";

import Timeline from "./components/Timeline";
import ActionPalette from "./components/ActionPalette";
import Footer from "./components/Footer";

function App() {
  const [timeline, setTimeline] = useState([]);
  const [selectedActionId, setSelectedActionId] =
    useState(null);

  const addAction = (actionId) => {
    const action = actions[actionId];

    setTimeline((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        actionId,
        name: action.name,
        category: action.category,
        icon: action.icon,
        potency: action.potency,
        time: prev.length * 2.5
      }
    ]);
  }

  const removeSelectedAction = () => {
    if (!selectedActionId) return;

    setTimeline((prev) => {
      const filtered = prev.filter(
        (action) => action.id !== selectedActionId
      );

      return filtered.map((action, index) => ({
        ...action,
        time: index * 2.5
      }));
    });

    setSelectedActionId(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "Delete" ||
        event.key === "Backspace"
      ) {
        removeSelectedAction();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [selectedActionId]);

  const moveAction = (activeId, overId) => {
    if (activeId === overId) return;

    setTimeline((prev) => {
      const oldIndex = prev.findIndex(
        (a) => a.id === activeId
      );

      const newIndex = prev.findIndex(
        (a) => a.id === overId
      );

      const newTimeline = [...prev];

      const [moved] = newTimeline.splice(
        oldIndex,
        1
      );

      newTimeline.splice(
        newIndex,
        0,
        moved
      );

      return newTimeline.map(
        (action, index) => ({
          ...action,
          time: index * 2.5
        })
      );
    });
  };

  const exportJson = () => {
    try {
      const data = {
        version: 1,
        job: "machinist",
        rotation: timeline.map(
          (action) => action.actionId
        )
      };

      const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
      );

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "rotation.json";
      a.click();

      URL.revokeObjectURL(url);

      alert("JSONを保存しました。");
    } catch (error) {
      console.error(error);

      alert("JSONの保存に失敗しました。");
    }
  };

  const importJson = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      alert("ファイルが選択されていません。");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (!data.rotation) {
          throw new Error("Invalid file");
        }

        const loadedTimeline =
          data.rotation.map(
            (actionId, index) => {
              const action = actions[actionId];

              if (!action) {
                throw new Error(
                  `Unknown action: ${actionId}`
                );
              }

              return {
                id: crypto.randomUUID(),
                actionId,
                name: action.name,
                category: action.category,
                icon: action.icon,
                potency: action.potency,
                time: index * 2.5
              };
            }
          );

        setTimeline(loadedTimeline);
        setSelectedActionId(null);

        event.target.valu = "";

        alert("JSONを読み込みました。");
      } catch (error) {
        console.error(error);

        alert(
          "JSONの形式が不正なため読み込めませんでした。"
        );
      }
    };

    reader.onerror = () => {
      alert("ファイルの読み込みに失敗しました。");
    };

    reader.readAsText(file);
  };

  const fileInputRef = useRef(null);

  return (
    <div>
      <h1>FF14 Rotation Editor</h1>
      <div>
        <button onClick={exportJson}>
          JSON保存
        </button>

        <button
          onClick={() =>
            fileInputRef.current?.click()
          }
        >
          JSON読込
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={importJson}
          style={{ display: "none" }}
        />
      </div >
      <ActionPalette onAdd={addAction} />

      <Timeline
        timeline={timeline}
        selectedActionId={selectedActionId}
        onSelect={setSelectedActionId}
        onMove={moveAction}
      />
      <Footer />
    </div >
  );
}



export default App;