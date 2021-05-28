import React from "react";
import { Col } from "antd";
function Info({ infoCellStyle }) {
  return (
    <>
      <Col span={6} className="center">
        <div style={infoCellStyle}>
          <div
            className="cell"
            style={{ background: "rgb(255, 255, 255)" }}
          ></div>
        </div>
        <p className="cell-p">Miejsca Dostępne</p>
      </Col>
      <Col span={6} className="center">
        <div style={infoCellStyle}>
          <div className="cell" style={{ background: "rgb(71, 71, 71)" }}></div>
        </div>
        <p className="cell-p">Miejsca zarezerwowane</p>
      </Col>
      <Col span={6} className="center ">
        <div style={infoCellStyle}>
          <div
            className="cell"
            style={{ background: "rgb(255, 138, 5)" }}
          ></div>
        </div>
        <p className="cell-p">Twój wybór</p>
      </Col>
    </>
  );
}

export default Info;
