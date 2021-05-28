import React, { useState, useEffect } from "react";
import { Form, InputNumber, Button, Checkbox, Col, Row, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  saveRowsCols,
  selectDataList,
  saveSeats,
  saveProposedSeats,
} from "../features/homeSlice";

//styles

const formNumberItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

const formItemLayout = {
  wrapperCol: { span: 24 },
};

function Home() {
  const dispatch = useDispatch();
  const [data] = useSelector(selectDataList);
  const [proposedSeats, setProposedSeats] = useState([]);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [near, setNear] = useState(false);
  const [maxSeats, setMaxSeats] = useState(1);

  //submiting form
  const onFinish = () => {
    dispatch(
      saveRowsCols({
        rows: rows,
        cols: cols,
      })
    );
    dispatch(
      saveSeats({
        seats: numberOfSeats,
        near: near,
      })
    );
    dispatch(saveProposedSeats(proposedSeats));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const error = () => {
    message.error(
      `Wprowadziłeś zby dużą liczbę miejsc (maksymalnie miejsc${
        near ? " obok siebie" : ""
      }: ${maxSeats})`
    );
  };

  //getting max cols and rows

  const getRowCols = () => {
    data.forEach((item) => {
      if (item.cords.x > rows) setRows(item.cords.x);
      if (item.cords.y > cols) setCols(item.cords.y);
    });
  };

  useEffect(() => {
    data && getRowCols();
  }, [data]);

  //propose seats

  const distributeSeats = () => {
    const notReserved = data.filter((item) => item.reserved === false);
    if (near === false) {
      const propose = notReserved.slice(0, numberOfSeats);
      const proposal = propose.map((item) => ({
        cords: item.cords,
        id: item.id,
      }));
      setProposedSeats(proposal);
    }
    if (near && numberOfSeats < 1) setProposedSeats(notReserved[0]);
    if (near && numberOfSeats > 1) {
      let set = 0;
      for (let i = 0; i < rows; i++) {
        if (set !== 0) {
          break;
        }
        const rowArr = notReserved.filter((item) => item.cords.x === i);
        let myArr = [rowArr[0]];
        let iter = 0;

        for (let a = 0; a < rowArr.length - 1; a++) {
          myArr.push(rowArr[a + 1]);

          if (myArr[iter].cords.y - myArr[iter + 1].cords.y !== -1) {
            myArr = [rowArr[a + 1]];
            iter = -1;
          }
          console.log(myArr);
          if (myArr.length === numberOfSeats) {
            const proposal = myArr.map((item) => ({
              cords: item.cords,
              id: item.id,
            }));

            setProposedSeats(proposal);

            set = 1;
            break;
          }
          iter += 1;
        }
      }
    }
  };

  useEffect(() => {
    data && distributeSeats();
  }, [data, near, numberOfSeats]);

  //getting maximum number of seats

  const maxSeatNearNumber = () => {
    let maxArr = 1;

    const notReserved = data.filter((item) => item.reserved === false);

    if (near) {
      for (let i = 0; i < rows; i++) {
        const rowArr = notReserved.filter((item) => item.cords.x === i);
        let myArr = [rowArr[0]];
        let iter = 0;
        for (let a = 0; a < rowArr.length - 1; a++) {
          myArr.push(rowArr[a + 1]);

          if (myArr[iter].cords.y - myArr[iter + 1].cords.y !== -1) {
            myArr = [rowArr[a + 1]];
            iter = -1;
          }
          if (myArr.length > maxArr) maxArr = myArr.length;
          iter += 1;
        }
      }
      return maxArr;
    }
    if (near === false) {
      maxArr = notReserved.length;
      return maxArr;
    }
  };

  useEffect(() => {
    data && setMaxSeats(maxSeatNearNumber());
  }, [near, []]);

  return (
    <>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col>
          <Form
            name="basic"
            initialValues={{
              near: near,
              seats: numberOfSeats,
            }}
            onFinish={numberOfSeats <= maxSeats ? onFinish : error}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              className="seats-one-row"
              {...formNumberItemLayout}
              label="Liczba miejsc"
              name="seats"
              rules={[
                {
                  required: true,
                  message: "Brak liczby miejsc",
                },
              ]}
            >
              <InputNumber min={1} onChange={(e) => setNumberOfSeats(e)} />
            </Form.Item>

            <Form.Item {...formItemLayout} name="near" valuePropName="checked">
              <Checkbox onChange={(e) => setNear(e.target.checked)}>
                Czy miejsca mają być obok siebie?
              </Checkbox>
            </Form.Item>

            <Form.Item {...formItemLayout}>
              <Button type="primary" htmlType="submit">
                Wybierz miejsca
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Home;
