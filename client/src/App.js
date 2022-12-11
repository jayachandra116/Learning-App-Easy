import React, { Component } from "react";
import "./App.css";

class Home extends Component {
  url = "http://localhost:8001/courses/";
  state = {
    show: false,
    data: [],
    rating: 1,
  };
  componentDidMount = () => {
    this.handleGetData();
  };

  handleGetData = () => {
    fetch(this.url + "get")
      .then((res) => res.json())
      .then((json) => {
        this.setState({ data: json });
      });
  };

  handleApply = async (id) => {
    const requestOption = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    };
    fetch(this.url + "enroll/" + id, requestOption).then(() => {
      this.handleGetData();
    });
  };

  handleRating = (e) => {
    this.setState({ rating: e.target.value });
  };

  handleAddRating = async (id) => {
    const requestOption = {
      method: "PATCH",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: this.state.rating }),
    };
    fetch(this.url + "rating/" + id, requestOption)
    .then(() => {this.handleGetData()});
  };

  handleDrop = async (id) => {
    const requestOption = {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      },
    };
    fetch(this.url + "drop/" + id, requestOption).then(() => {
      this.handleGetData();
    });
  };

  render() {
    return (
      <div className="home">
        <header>
          <h2>ABC Learning</h2>
        </header>
        {/* write your code here */}
        <div className="cardContainer">
          {this.state.data.map((course) => {
            return (
              <div className="card" key={course._id}>
                <ul>
                  <div className="header">
                    <li>{course.courseName}</li>
                    <li>{course.cpurseDept}</li>
                    <li>{course.description}</li>
                    {course.isApplied && (
                      <li>
                        {!course.isRated && (
                          <li>
                            Rate:
                            <select
                              className="rating"
                              name="rating"
                              onChange={this.handleRating}
                            >
                              <option  >1</option>
                              <option  >2</option>
                              <option  >3</option>
                              <option  >4</option>
                              <option  >5</option>
                            </select>
                            <button
                              className="rate"
                              onClick={() => this.handleAddRating(course._id)}
                            >
                              Add
                            </button>
                          </li>
                        )}
                        {course.isApplied && (
                          <button
                            className="drop"
                            onClick={() => this.handleDrop(course._id)}
                          >
                            Drop Course
                          </button>
                        )}
                      </li>
                    )}
                    {!course.isApplied && (
                      <li>
                        <button
                          className="btn"
                          onClick={() => this.handleApply(course._id)}
                        >
                          Apply
                        </button>
                      </li>
                    )}
                  </div>
                  <div className="footer">
                    <li>
                      {course.duration} hrs . {course.noOfRatings} Rating .{" "}
                      {course.rating}/5
                    </li>
                  </div>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
