// src/components/LoadMoreButton.jsx
import React from "react";
import PropTypes from "prop-types";

const LoadMoreButton = ({ onLoadMore, isVisible }) => {
  if (!isVisible) return null;

  return (
    <button className="load-more-button" onClick={onLoadMore}>
      Load More
    </button>
  );
};

LoadMoreButton.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default LoadMoreButton;
