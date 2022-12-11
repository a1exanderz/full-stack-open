// rfcreduxp command

// template

import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const store = (props) => {
  return <div>store</div>;
};

store.propTypes = {
  second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(store);
