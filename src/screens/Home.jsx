import React, { useEffect, useState } from "react";
import Nevbar from "../components/Nevbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItems] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:4000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setFoodItems(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Nevbar />
      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/Image/img3.jpg"
                className="d-block custom-width"
                alt="Slide 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/Image/img2.jpg"
                className="d-block custom-width"
                alt="Slide 2"
              />
            </div>
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div
                className="form-inline"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "40px",
                  padding: "30px",
                }}
              >
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="/Image/img1.jpg"
                className="d-block custom-width"
                alt="Slide 3"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div key={data._id} className="row mb-3">
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              <div className="row">
                {foodItem.length > 0
                  ? foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filteredItem) => (
                        <div
                          key={filteredItem._id}
                          className="col-12 col-md-6 col-lg-3 mb-3"
                        >
                          <Card
                            foodItem={filteredItem}
                            option={filteredItem.options[0]}
                          />
                        </div>
                      ))
                  : "No items found"}
              </div>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
