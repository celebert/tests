import React from "react";
import { useSelector } from "react-redux";
import { selectBookingList } from "../features/homeSlice";
import { Row, Col, Typography } from "antd";
const { Title } = Typography;
function Summary() {
  const [{ booking: bookedSeats }] = useSelector(selectBookingList);

  console.log(bookedSeats);
  return (
    <>
      <Row>
        <Col span={20} offset={2} className="summary-info">
          <Title>Twoja rezerwacja przebiegła pomyślnie</Title>
          <Title level={3} className="summary-seats">
            Wybrałeś miejsca:
          </Title>
          {bookedSeats.map((item) => {
            const { cords, id } = item;
            return (
              <Title className="summary-seats" level={3} key={id}>
                -rząd {cords.x + 1}, miejsce {cords.y + 1} ({id})
              </Title>
            );
          })}
          <Title level={2}>
            Dziękujemy! W razie problemów prosimy o kontakt z działem
            administracji
          </Title>
        </Col>
      </Row>
    </>
  );
}

export default Summary;
