import React, { useState } from "react";
import { Form, Input, Button, Select, Card, message } from "antd";
import "./App.css";

// Rasmlar (hozircha hammasi bitta rasm)
import imgDefault from "./assets/dadfg.png";

const { Option } = Select;

function App() {
  const [form] = Form.useForm();
  const [selectedCourse, setSelectedCourse] = useState("computer");

  // Kurs rasmlari
  const courseImages = {
    computer: imgDefault,
    graphic: imgDefault,
    smm: imgDefault,
    foundation: imgDefault,
    frontend: imgDefault,
    backend: imgDefault,
    robotics: imgDefault,
    "robotics-pro": imgDefault,
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

        // inputlarni tozalash
        form.resetFields();
        // rasmni default holatga qaytarish
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
    <div className="form-wrapper">
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
            <Input placeholder="Ismingizni kiriting" />
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
              <Option value="computer">Kompyuter Savodxonligi</Option>
              <Option value="graphic">Grafik Dizayn</Option>
              <Option value="smm">SMM</Option>
              <Option value="foundation">Foundation</Option>
              <Option value="frontend">Frontend</Option>
              <Option value="backend">Backend</Option>
              <Option value="robotics">Robototexnika</Option>
              <Option value="robotics-pro">Robototexnika Pro</Option>
            </Select>
          </Form.Item>

          {/* Submit tugmasi */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Jo‘natish
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default App;
