import React, { useState } from "react";
import { Form, Input, Button, Select, Card, message } from "antd";
import "./App.css";

// Kurs rasmlari import
import computerImg from "./assets/8u88.png";
import graphicImg from "./assets/img_one.jpeg";
import smmImg from "./assets/img-two.webp";
import foundationImg from "./assets/img_three.jpg";
import frontendImg from "./assets/dadfg.png";
import backendImg from "./assets/images.jpeg";
import roboticsImg from "./assets/IMG-Header.jpg";
import roboticsProImg from "./assets/komp.png";

const { Option } = Select;

function App() {
  const [form] = Form.useForm();
  const [selectedCourse, setSelectedCourse] = useState("computer");

  // Kurs rasmlari mapping
  const courseImages = {
  computer: computerImg,
  graphic: graphicImg,
  smm: smmImg,
  foundation: foundationImg,
  frontend: frontendImg,
  backend: backendImg,
  robotics: roboticsImg,
  "robotics-pro": roboticsProImg,
};


  const onFinish = async (values) => {
    try {
     const res = await fetch("http://localhost:5000/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(values),
});

const data = await res.json();

      if (data.success) {
        message.success("Ma'lumot yuborildi ✅");
        form.resetFields();
        setSelectedCourse("computer");
      } else {
        message.error("Xatolik yuz berdi ❌");
      }
    } catch (error) {
      console.error(error);
      message.error("Server bilan aloqa yo'q ❌");
    }
  };
  
  return (
      <Card
        className="form-card"
        cover={
          <img
            alt="Course"
            src={courseImages[selectedCourse]}
            className="form-image"
          />
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="form-content"
        >
          {/* Ism */}
          <Form.Item
            label="Ism"
            name="name"
            rules={[{ required: true, message: "Iltimos, ismingizni kiriting!" }]}
          >
            <Input placeholder="Muhammad" />
          </Form.Item>

          {/* Telefon raqam */}
          <Form.Item
            label="Telefon raqam"
            name="phone"
            rules={[
              { required: true, message: "Iltimos, telefon raqamingizni kiriting!" },
              { pattern: /^[0-9+]{9,15}$/, message: "Telefon raqam noto‘g‘ri!" },
            ]}
          >
            <Input placeholder="+998901234567" />
          </Form.Item>

          {/* Kurs tanlash */}
          <Form.Item
            label="Kursni tanlang"
            name="course"
            rules={[{ required: true, message: "Kursni tanlang!" }]}
          >
            <Select
              placeholder="Kursni tanlang"
              onChange={(value) => setSelectedCourse(value)}
            >
              <Option style={{fontSize: "20px"}} value="computer">Kompyuter Savodxonligi</Option>
              <Option style={{fontSize: "20px"}} value="graphic">Grafik Dizayn</Option>
              <Option style={{fontSize: "20px"}} value="smm">SMM</Option>
              <Option style={{fontSize: "20px"}} value="foundation">Foundation</Option>
              <Option style={{fontSize: "20px"}} value="frontend">Frontend</Option>
              <Option style={{fontSize: "20px"}} value="backend">Backend</Option>
              <Option style={{fontSize: "20px"}} value="robotics">Robototexnika</Option>
              <Option style={{fontSize: "20px"}} value="robotics-pro">Robototexnika Pro</Option>
            </Select>
          </Form.Item>

          {/* Submit tugmasi */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              yuborish
            </Button>
          </Form.Item>
        </Form>
      </Card>
  );
}

export default App;
