import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import cars from "../data/cars.json";

function BarChart() {
    const [chartData, setChartData] = useState(null);

    // 計算每個 brand 的車有幾台 -> 放進長條圖中
    const brandList = cars.map((v) => {
        return v.brand;
    });
    const getTotal = () => {
        let names = [],
            counts = [],
            total = [],
            prev;

        brandList.sort();
        for (let i = 0; i < brandList.length; i++) {
            if (brandList[i] !== prev) {
                names.push(brandList[i]);
                counts.push(1);
            } else {
                counts[counts.length - 1]++;
            }
            prev = brandList[i];
        }
        for (let j = 0; j < names.length; j++) {
            total.push({ name: names[j], count: counts[j] });
        }
        return total;
    };

    const getbrandName = getTotal().map((v) => {
        return v.name;
    });
    const getbrandCount = getTotal().map((v) => {
        return v.count;
    });

    const data = {
        labels: getbrandName,
        datasets: [
            {
                label: "Number",
                data: getbrandCount,
                backgroundColor: ["#FFC069"],
                hoverBackgroundColor: ["#4A403A"],
                borderColor: ["#4A403A"],
                borderWidth: 1,
                barPercentage: 0.7,
            },
        ],
    };

    // 製作長條圖
    const chart = () => {
        setChartData(data);
    };
    const option = {
        maintainAspectRatio: false,
        responsive: true,
        indexAxis: "y",
    };

    useEffect(() => {
        chart();
    }, []);

    return (
        <>
            <div className="mask">Number of cars</div>
            <div className="container">
                <div className="chart">
                    {chartData && <Bar data={chartData} options={option} />}
                </div>
            </div>
        </>
    );
}

export default BarChart;
