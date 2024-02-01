import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0",
};

export default function StarRating({
  maxRating = 5,
  color = "#afe3",
  size = "48px",
  messages = [],
  className = "",
  defaultRating = 0,
  onRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [hovering, setHovering] = useState(false);

  const textStyle = {
    lineHeight: "100%",
    fontWeight: "bolder",
    color: color,
    fontSize: `${Number(size.substring(0, size.length - 2)) / 1.2}px`,
    marginLeft: "5px",
    height: size,
  };

  const starContainerStyle = {
    display: "flex",
    gap: "0",
  };

  function handleRating(value) {
    setRating(value);
    onRating(value);
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            full={hovering ? i < hovering : i < rating}
            hoverHandle={() => setHovering(i + 1)}
            leaveHandle={() => setHovering(false)}
            color={color}
            size={size}
            className={className}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[hovering ? hovering - 1 : rating - 1]
          : hovering || rating || ""}
      </p>
    </div>
  );
}

function Star({
  onRate,
  full,
  hoverHandle,
  leaveHandle,
  size,
  color,
  className,
}) {
  const starStyle = {
    display: "block",
    height: size,
    width: size,
  };
  return (
    <span
      className={className}
      style={starStyle}
      onClick={onRate}
      onMouseEnter={hoverHandle}
      onMouseLeave={leaveHandle}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
