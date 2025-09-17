import React, { useState } from "react";
import { Form, Input, Button, Select, Card, message as antdMessage } from "antd";
import "./App.css";

// Kurs rasmlari import
import dasturlashImg from "./assets/dasturlash.png";
import kompiuterSavotxonlik from "./assets/komp.png";
import smm from "./assets/smm.png";
import roboticsImg from "./assets/robo.jpg";
import roboticsProImg from "./assets/robo.jpg";
import graphic from "./assets/grapicdesign.jpg"

const { Option } = Select;

function App() {
  const [selectedCourse, setSelectedCourse] = useState("computer");
  const [form] = Form.useForm();

  // Kurs rasmlari mapping
  const courseImages = {
    computer: kompiuterSavotxonlik,
    graphic: graphic ,
    smm: smm,
   dasturlash:dasturlashImg,
    robotics: roboticsImg,
    "robotics-pro": roboticsProImg,
  };

  // Form tugallanganda
  const onFinish = (values) => {
    const token = process.env.REACT_APP_TELEGRAM_TOKEN;
    const chatId = process.env.REACT_APP_CHAT_ID;

   

    const text = `
👤 Ism: ${values.name}
📞 Raqam: ${values.phone}
📚 Kurs: ${values.course}
    `;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    })
      .then((res) => {
        if (res.ok) {
          antdMessage.success("So'rov yuborildi ✅");
          form.resetFields();
          setSelectedCourse(values.course);
        } else {
          antdMessage.error("Xatolik yuz berdi ❌");
        }
      })
      .catch((err) => {
        antdMessage.error(`Tarmoq xatosi ❌: ${err}`);
      });
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
      <p className="title">
        Innovatsiya olamida buyuklardan bo'lishga IT TAT sizga ko'makdosh
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="form-content"
      >
        {/* Ism */}
        <Form.Item
          label="Ismingizni kiriting"
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
            <Option value="computer">Kompyuter Savodxonligi</Option>
            <Option value="graphic">Grafik Dizayn</Option>
            <Option value="smm">SMM</Option>
            <Option value="dasturlash">Dasturlash</Option>
            <Option value="robotics">Robototexnika</Option>
            <Option value="robotics-pro">Robototexnika Pro</Option>
          </Select>
        </Form.Item>

        {/* Submit tugmasi */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Yuborish
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default App;
