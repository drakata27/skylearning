import React, { useState } from "react";
import Uploader from "../Uploader/Uploader";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import modules from "../../utils/quilModules";
import getImageName from "../../utils/getImageName";
import Placeholder from "../../assets/placeholder.jpg";
import "./Form.css";

const Form = ({
  data,
  setData,
  setCover,
  checked,
  setChecked,
  handleData,
  editor,
  edit,
}) => {
  const navigate = useNavigate();

  let handleSubmit = () => {
    if (data.title.trim() !== "" && data.subtitle.trim() !== "") {
      handleData();
    } else {
      alert("Contents cannot be empty");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setChecked(checked);
    setData({ ...data, is_public: checked });
  };

  const [inputKey] = useState(Date.now());

  return (
    <div className="section-form">
      {edit ? (
        <div className="cover-preview">
          <h1>Current Cover</h1>
          {data.cover ? (
            <img src={data.cover} alt="section cover" />
          ) : (
            <img src={Placeholder} alt="section cover" />
          )}
          <section className="uploaded-row">
            <p>{getImageName}</p>
          </section>
        </div>
      ) : (
        <></>
      )}
      <div className="horizontal-container cover-container">
        <Uploader inputKey={inputKey} setCover={setCover} />
      </div>

      {checked !== undefined ? (
        <div className="checkbox-container" style={{ marginTop: "2rem" }}>
          <input
            className="checkbox"
            style={{ borderRadius: "15px" }}
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          <p>Public</p>
        </div>
      ) : (
        <></>
      )}

      <input
        className="section-title-input"
        type="text"
        name="title"
        placeholder="Title..."
        value={data.title}
        onChange={handleInputChange}
      />
      <input
        className="section-subtitle-input"
        type="text"
        name="subtitle"
        placeholder="Subitle..."
        value={data.subtitle}
        onChange={handleInputChange}
      />
      {editor !== undefined ? (
        <ReactQuill
          className="editor-input"
          modules={modules}
          theme="snow"
          value={data.body}
          placeholder="Type here..."
          onChange={(body) =>
            handleInputChange({ target: { value: body, name: "body" } })
          }
        />
      ) : (
        <></>
      )}

      <button className="section-add-btn" onClick={handleSubmit}>
        Done
      </button>

      <button
        className="section-cancel-btn"
        onClick={() => {
          navigate(-1);
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default Form;
