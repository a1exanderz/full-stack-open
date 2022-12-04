import { useState } from "react";
import PropTypes from "prop-types";

const ToggleBlogView = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <div
          style={{
            display: "flex",
            width: "300px",
            justifyContent: "space-between",
          }}
          className="blogPreview"
        >
          {props.children.props.children[0]}
          <button onClick={toggleVisibility} id="viewBlog">
            {" "}
            {props.buttonLabel}
          </button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div
          style={{
            display: "flex",
            width: "300px",
            justifyContent: "space-between",
          }}
        >
          {props.children}{" "}
          <button style={{ height: "21.5px" }} onClick={toggleVisibility}>
            hide
          </button>
        </div>
      </div>
    </div>
  );
};

ToggleBlogView.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default ToggleBlogView;
