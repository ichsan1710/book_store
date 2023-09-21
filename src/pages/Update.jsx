import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: "",
    image: null,
  });

  const navigate = useNavigate();

  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setBook({ ...book, image: e.target.files[0] });
    } else {
      setBook({ ...book, [e.target.name]: e.target.value });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", book.title);
      formData.append("desc", book.desc);
      formData.append("price", book.price);
      formData.append("image", book.image);

      await axios.put(
        `https://book-store-mysql-0c67abf40104.herokuapp.com/books/${bookId}`,
        formData
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1>Update The Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="desc"
        onChange={handleChange}
        name="desc"
      />
      <input
        type="text"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      <input type="file" onChange={handleChange} name="image" />
      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Update;
