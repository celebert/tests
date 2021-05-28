import React from "react";

function Cell({ reserved, id, cords, choseSeat, mySeat }) {
  return (
    <>
      <button
        disabled={reserved ? true : false}
        key={id}
        className="cell"
        onClick={() => {
          choseSeat(cords, id);
        }}
        style={{
          gridColumn: `${cords.y + 1}`,
          gridRow: `${cords.x + 1}`,
          background: `${
            reserved
              ? "rgb(71, 71, 71)"
              : mySeat.map((item) => item.id).includes(id)
              ? "rgb(255, 138, 5)"
              : "rgb(255, 255, 255)"
          }`,
          cursor: `${reserved ? "default" : "pointer"}`,
        }}
      ></button>
    </>
  );
}

export default Cell;
