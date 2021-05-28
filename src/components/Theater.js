import React, { useState, useEffect } from "react";
import { Row, Col, Button, Drawer, message } from "antd";
import {
  selectDataList,
  selectRowsCols,
  saveBooking,
  selectSize,
  selectProposedSeats,
} from "../features/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import Cell from "./theaterComponents/Cell";
import Info from "./theaterComponents/Info";

function Theater() {
  const dispatch = useDispatch();
  const rowsCols = useSelector(selectRowsCols);
  const { windowSize } = useSelector(selectSize);
  const [data] = useSelector(selectDataList);
  const proposedSeats = useSelector(selectProposedSeats);
  const [mySeat, setMySeat] = useState([]);
  const [visible, setVisible] = useState(false);

  const cols = rowsCols.cols;
  const rows = rowsCols.rows;

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  //style
  const cellWidth = `calc(80vh / ${rows + 1})`;
  const infoCellStyle = {
    height: `${cellWidth}`,
    minWidth: ` ${cellWidth}`,
    display: "flex",
    justifyContent: "center",
  };

  //proposition of seats
  useEffect(() => {
    setMySeat(proposedSeats);
  }, [proposedSeats]);
  //editing seats

  const choseSeat = (cords, id) => {
    if (mySeat.map((item) => item.id).includes(id)) {
      const deleteSeat = mySeat.filter((item) => item.id !== id);
      setMySeat(deleteSeat);
    } else {
      setMySeat([...mySeat, { cords, id }]);
    }
  };

  //submit

  const proceed = () => {
    dispatch(
      saveBooking({
        booking: mySeat,
      })
    );
  };

  const warning = () => {
    message.warning("Wybrałeś więcej miejsc niż zadeklarowałeś");
  };

  useEffect(() => {
    if (mySeat.length > proposedSeats.length) warning();
  }, [mySeat]);
  return (
    <>
      <Row>
        <Col span={20} offset={2}>
          <Row justify="center">
            <Col>
              <div className="screen">Ekran</div>
              <Row>
                <Col className="scrollbar">
                  <div
                    className="room-grid"
                    style={{
                      marginBottom: "10px",
                      gridTemplateColumns: `repeat(${cols + 1}, ${cellWidth})`,
                      gridTemplateRows: `repeat(${rows + 1},  ${cellWidth})`,
                    }}
                  >
                    {data.map((item) => {
                      const { cords, reserved, id } = item;

                      return (
                        <Cell
                          key={id}
                          cords={cords}
                          reserved={reserved}
                          id={id}
                          choseSeat={choseSeat}
                          mySeat={mySeat}
                        />
                      );
                    })}
                  </div>
                </Col>
              </Row>

              <Row style={{ margin: "15px 0" }} justify="center">
                {windowSize < 1096 ? (
                  <>
                    <Col span={8} className="center">
                      <Button
                        style={{ width: "100%", height: "100%" }}
                        type="secondary"
                        onClick={showDrawer}
                      >
                        Legenda
                      </Button>
                      <Drawer
                        title="Legenda"
                        placement="right"
                        onClose={onClose}
                        visible={visible}
                      >
                        <Info infoCellStyle={infoCellStyle} />
                      </Drawer>
                    </Col>
                  </>
                ) : (
                  <Info infoCellStyle={infoCellStyle} />
                )}

                <Col
                  span={windowSize < 1096 ? 8 : 6}
                  offset={windowSize < 1096 ? 2 : 0}
                  className="center"
                >
                  <Button
                    onClick={() => proceed()}
                    style={{
                      height: `calc(0.85 * ${cellWidth}) `,
                      margin: `0 calc(0.075 * ${cellWidth})`,
                    }}
                    type="primary"
                  >
                    Rezerwuj
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Theater;
