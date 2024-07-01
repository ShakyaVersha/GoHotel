import React from "react";

const Carousal = () => {
  return (
    <div>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="\Image\img3.jpg"
              className="d-block custom-width"
              alt="Slide 1"
            />
          </div>

          <div className="carousel-item">
            <img
              src=".\Image\img2.jpg"
              className="d-block custom-width"
              alt="Slide 2"
            />
          </div>

          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form
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
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0 bg-success text-white"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>

          <div className="carousel-item">
            <img
              src="\Image\img1.jpg"
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
  );
};

export default Carousal;
