import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../App";

const PosterPage = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [postBody, setPostBody] = useState("");

  const { handleSubmit } = useForm();

  let history = useHistory();

  const handleChange = (e) => {
    setPostBody(e.target.value);
  };
  const handleHomePage = () => {
    history.push("/");
  };

  const onSubmit = () => {
    const posts = {
      name: loggedInUser.name,
      photo: loggedInUser.photo,
      postDetails: postBody,
      upvote: 0,
      downvote: 0,
      comments: [],
    };
    fetch("https://glacial-tundra-84158.herokuapp.com/addPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posts),
    }).then((res) => res.json());
    // window.confirm("Status Posted Successfully!");
    if (window.confirm("Status Posted Successfully!")) {
      history.push("/");
    }
  };

  return (
    <div>
      <div className="container mt-4 d-flex justify-content-center">
        <form
          className="container mt-4 d-flex justify-content-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card
            style={{
              width: "50%",
              textAlign: "center",
              color: "black",
              borderRadius: "20px",
              boxShadow: "0px 3px 14px 5px rgba(134, 134, 134, 0.73)",
            }}
          >
            <Card.Header>
              {" "}
              <b>What is not inside your mind?</b>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <textarea
                  onChange={handleChange}
                  value={postBody}
                  type="text"
                  name=""
                  id=""
                  className="text-area w-100 border-2 border-danger"
                  placeholder="Write your post here"
                />
              </Card.Text>
              <Card.Title
                style={{
                  fontSize: "medium",
                }}
              >
                <img
                  width="50"
                  className="rounded-circle me-2"
                  src={loggedInUser.photo}
                  alt=""
                />{" "}
                Posting as {loggedInUser.name}
              </Card.Title>
              {/* <Button type="submit" variant="danger">
                Post Status
              </Button> */}
              <input
                className="btn btn-danger "
                type="submit"
                value="Post Status"
              />
            </Card.Body>
          </Card>
        </form>
      </div>
      <div className="mt-5 d-flex justify-content-center">
        <button onClick={handleHomePage} className="btn btn-danger ">
          Back to Home Page
        </button>
      </div>
    </div>
  );
};

export default PosterPage;
