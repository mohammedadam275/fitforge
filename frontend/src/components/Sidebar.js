import React from "react";

function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div
      style={{
        width: "250px",
        borderRight: "1px solid #ccc",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <h3>Categories</h3>

      {categories.map((cat) => (
        <div
          key={cat._id}
          onClick={() => onSelectCategory(cat._id)}
          style={{
            padding: "8px 0",
            cursor: "pointer",
            fontWeight:
              selectedCategory === cat._id
                ? "bold"
                : "normal",
          }}
        >
          {cat.name}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;