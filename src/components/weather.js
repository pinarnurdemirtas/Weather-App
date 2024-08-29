import React, { useState } from "react";
import { Input, Button, Card } from "antd";
import { RiCelsiusFill } from "react-icons/ri";
import axios from "axios";
import 'antd/dist/reset.css';
import './Weather.css';

const { Meta } = Card;

export default function Weather() {
    const [city, setCity] = useState("");
    const [info, setInfo] = useState({});
    const [isActive, setIsActive] = useState(false);

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const handleClick = async () => {
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=tr&appid=f8bef8df7530a93df6fabfa1aef95ca0&units=metric`;
        try {
            const { data } = await axios.get(baseURL);
            setInfo(data);
            setIsActive(true);
        } catch (err) {
            console.log("Hatanız : ", err);
        }
    };

    return (
        <div className="weather-container">
            <Card
                title="Hava Durumu Uygulaması"
                bordered={false}
                className="input-card"
            >
                <div className="weather-form">
                    <Input
                        value={city}
                        className="inputText"
                        placeholder="Şehri Giriniz"
                        onChange={handleChange}
                    />
                    <Button
                        type="primary"
                        onClick={handleClick}
                    >
                        Hava Durumu
                    </Button>
                </div>
                {isActive && (
                <Card
                    bordered={false}
                    className="weather-card"
                >
                    <div className="weather-info">
                        <p><strong>Şehir:</strong> {info.name}, {info.sys.country}</p>
                        <p><strong>Sıcaklık:</strong> {info.main.temp} <RiCelsiusFill /></p>
                        <p><strong>Hissedilen:</strong> {info.main.feels_like} <RiCelsiusFill /></p>
                        <p><strong>Durum:</strong> {info.weather[0].description}</p>
                        
                    </div>
                </Card>
            )}
            </Card>
        </div>
    );
}
