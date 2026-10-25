import { actions } from "../data/actions";

function ActionPalette({ onAdd }) {
  const weaponSkills = Object.values(actions).filter(
    (action) =>
      action.category === "weaponskill" &&
      !action.hidden
  );

  const abilities = Object.values(actions).filter(
    (action) =>
      action.category === "ability" &&
      !action.hidden
  );

  const roleActions = Object.values(actions).filter(
    (action) =>
      action.category === "roleAction" &&
      !action.hidden
  );

  const renderIcon = (action) => (
    <button
      key={action.id}
      onClick={() => onAdd(action.id)}
      title={action.name}
      style={{
        padding: 0,
        margin: "4px",
        border: "none",
        background: "none",
        cursor: "pointer"
      }}
    >
      <img
        src={action.icon}
        alt={action.name}
        width={48}
        height={48}
      />
    </button>
  );

  return (
    <>
      <h2>ウェポンスキル</h2>
      <div
        style={{
          border: "1px solid #555",
          padding: "8px",
          marginBottom: "12px"
        }}
      >
        {weaponSkills.map(renderIcon)}
      </div>

      <h2>アビリティ</h2>
      <div
        style={{
          border: "1px solid #555",
          padding: "8px",
          marginBottom: "12px"
        }}
      >
        {abilities.map(renderIcon)}
      </div>
      
      <h2>ロールアクション</h2>
      <div
        style={{
          border: "1px solid #555",
          padding: "8px",
          marginBottom: "12px"
        }}
      >
        {roleActions.map(renderIcon)}
      </div>
    </>
  );
}

export default ActionPalette;