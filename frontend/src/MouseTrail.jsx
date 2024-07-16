import { useEffect, useState } from "react";
import styled from "styled-components";

const MouseTrail = () => {
  const [trail, setTrail] = useState([]);
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleMouseMove = (e) => {
      setIsMouseMoving(true);
      clearTimeout(timeoutId);

      const newTrail = trail.slice(-20);
      newTrail.push({ x: e.clientX, y: e.clientY, id: Math.random() });
      setTrail(newTrail);

      timeoutId = setTimeout(() => {
        setIsMouseMoving(false);
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [trail]);

  useEffect(() => {
    if (!isMouseMoving) {
      const timeoutId = setTimeout(() => setTrail([]), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isMouseMoving]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <>
      <Container>
        <div className="fixed inset-0 pointer-events-none">
          {trail.map((point, index) => (
            <div
              key={point.id}
              className="trail-line"
              style={{
                top: point.y + "px",
                left: point.x + "px",
                backgroundColor: getRandomColor(),
                opacity: 1 - index / trail.length,
              }}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default MouseTrail;
const Container = styled.div`
  .trail-line {
    width: 10px; /* Adjust the width to make it look like a line */
    height: 10px; /* Adjust the height to make it look like a line */
    position: fixed;
    transform: translate(-50%, -50%);
    transition: top 0.1s ease-out, left 0.1s ease-out;
    border-radius: 50%; /* Optional: make the trail circular */
    will-change: top, left;
  }
`;
