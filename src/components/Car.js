import "../style/car.sass";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Detail from "./Detail";
import cars from "../data/cars.json";
import {
    FaAngleLeft,
    FaAngleRight,
    FaCarSide,
    FaSearch,
    FaUserAlt,
    FaHistory,
} from "react-icons/fa";
import { RiMenuFill, RiSortAsc, RiSortDesc } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";

function Car() {
    const [data, setData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [brand, setBrand] = useState("ALL");
    const [keyword, setKeyword] = useState("");
    const [sortBy, setSortBy] = useState("id");
    const [up, setUp] = useState(false);
    const [modal, setModal] = useState(false);
    const [userId, setUserId] = useState("");
    const sortPriceList = ["ID", "Price", "Year"];

    // 設定分頁
    const [page, setPage] = useState(0);
    const perPage = 10;
    const pagesVisited = page * perPage;
    const currentData = displayData.slice(pagesVisited, pagesVisited + perPage);
    const pageCount = Math.ceil(displayData.length / perPage);
    const changePage = ({ selected }) => {
        setPage(selected);
    };

    // 初始化資料
    useEffect(() => {
        setData(cars);
        setDisplayData(cars);
    }, []);

    // 彈出視窗
    const handleModal = (v) => {
        setUserId(v);
        setModal(!modal);
    };

    // 取得球隊名稱
    const brandList = cars.map((v) => {
        return v.brand;
    });
    const brandNameList = brandList.sort().filter((e, i) => {
        return brandList.indexOf(e) === i;
    });

    // 搜尋功能
    const handleSearch = (e) => {
        e.preventDefault();
        let newData = [...data];
        if (brand === "ALL") {
            if (keyword) {
                newData = data.filter((v) => v.model.includes(keyword));
            }
            setDisplayData(newData);
        } else {
            newData = data.filter((v) => {
                return v.brand === brand;
            });
            newData = newData.filter((v) => v.model.includes(keyword));
            setDisplayData(newData);
        }
        setPage(0);
    };

    // 排序功能
    const handleSort = (v) => {
        v = v.toLowerCase();
        let newData = [...displayData];
        if (up) {
            newData.sort((a, b) => a[v] - b[v]);
            setDisplayData(newData);
        } else {
            newData.sort((a, b) => b[v] - a[v]);
            setDisplayData(newData);
        }
        setUp(!up);
        setSortBy(v);
    };

    // 排序 icon
    const sortIcon = (v) => {
        v = v.toLowerCase();
        if (v === sortBy) {
            if (up) {
                return <RiSortAsc className="icon" />;
            } else {
                return <RiSortDesc className="icon" />;
            }
        }
        return <RiMenuFill className="icon" />;
    };

    return (
        <>
            {modal && (
                <Detail modal={modal} handleModal={handleModal} id={userId} />
            )}
            <div className="mask">
                Find something ...
                <form>
                    <div className="filter">
                        <div className="filter_bar">
                            <label htmlFor="keyword">
                                <FaCarSide className="car" />
                            </label>
                            <select
                                name="brand"
                                id="brand"
                                value={brand}
                                onChange={(e) => {
                                    setBrand(e.target.value);
                                }}
                            >
                                <option>ALL</option>
                                {brandNameList.map((v, i) => {
                                    return <option key={i}>{v}</option>;
                                })}
                            </select>
                        </div>
                        <div className="filter_bar">
                            <label htmlFor="keyword">
                                <FaSearch className="search" />
                            </label>
                            <input
                                type="text"
                                name="keyword"
                                id="keyword"
                                placeholder="Search Grand"
                                value={keyword}
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                }}
                            />
                        </div>
                        <div className="filter_btn">
                            <button onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="main">
                <div className="side">
                    <div className="side_title">Sort by</div>
                    <ul className="side_sort">
                        {sortPriceList.map((v, i) => {
                            return (
                                <li
                                    key={i}
                                    onClick={() => {
                                        handleSort(v);
                                    }}
                                >
                                    <span>{v}</span>
                                    {sortIcon(v)}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="content">
                    {currentData.map((v) => {
                        return (
                            <div className="content_card" key={v.id}>
                                <span>{v.id}</span>
                                <div
                                    className="content_avatar"
                                    style={{ background: v.color }}
                                >
                                    <img
                                        src={v.avatar}
                                        alt="AVATAR"
                                        className="cover-fit"
                                    />
                                </div>
                                <div className="content_text">
                                    <div className="content_top">
                                        <h3>
                                            {v.brand} - {v.model}
                                        </h3>
                                        <h3 className="price">${v.price}</h3>
                                    </div>
                                    <div className="content_bottom">
                                        <div className="user">
                                            <FaUserAlt className="icon" />
                                            {v.first_name}
                                        </div>
                                        <div>
                                            <FaHistory className="icon" />
                                            {v.year}
                                            {v.year > 1 ? "years" : "year"}
                                        </div>
                                        <div
                                            className="pointer btn"
                                            onClick={() => {
                                                handleModal(v.id);
                                            }}
                                        >
                                            <BsArrowRight className="icon" />
                                            Read more
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <ReactPaginate
                previousLabel={<FaAngleLeft className="icon" />}
                nextLabel={<FaAngleRight className="icon" />}
                pageCount={pageCount}
                forcePage={page}
                onPageChange={changePage}
                pageRangeDisplayed={2}
                containerClassName={"page_btn"}
                activeClassName={"active_btn"}
                disabledClassName={"disabled_btn"}
            />
        </>
    );
}

export default Car;
