import "../style/detail.sass";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import cars from "../data/cars.json";
import Black from "./Black";

function Detail(props) {
    const [data, setData] = useState([]);
    const { id, modal, handleModal } = props;

    const showList = [
        {
            label: "Gender",
            value: data.gender,
        },
        {
            label: "Phone",
            value: data.phone,
        },
        {
            label: "Email",
            value: data.email,
        },
        {
            label: "Car's brand",
            value: data.brand,
        },
        {
            label: "Car's model",
            value: data.model_year + " 's " + data.model,
        },
        {
            label: "Car's Price",
            value: "$ " + data.price,
        },
        {
            label: "Used Year",
            value: data.year + (data.year > 1 ? " years" : " year"),
        },
    ];

    useEffect(() => {
        const getData = cars.filter((v) => v.id === Number(id));
        setData(getData[0]);
    }, []);

    return (
        <>
            <Black modal={modal} handleModal={handleModal} />
            <div className="detail">
                <div className="detail_header">
                    {data.first_name} {data.last_name}
                    <div className="detail_icon">
                        <FaTimes onClick={handleModal} />
                    </div>
                </div>
                <div
                    className="detail_avatar"
                    style={{ background: data.color }}
                >
                    <img src={data.avatar} alt="Avatar" className="cover-fit" />
                </div>
                <div className="detail_content">
                    {showList.map((v) => {
                        return (
                            <div className="detail_block">
                                <p>{v.label}</p>
                                <span>{v.value}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Detail;
