import styled, { keyframes } from "styled-components";

// Keyframe animation for twinkling stars
const twinkling = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

// Styled component for a single star
const Star = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  background-color: white;
  animation: ${twinkling} ${(props) => props.animationDuration}s linear infinite;
  opacity: 0;
  border-radius: 50%;
  box-shadow: 200px 0 1px 1px white;
`;

// Component to generate random stars
const BackgroundBeams = ({ numStars, animationDuration }) => {
  const stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(
      <Star
        key={i}
        style={{
          color: `black`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * animationDuration}s`,
        }}
        animationDuration={animationDuration}
      />
    );
  }

  return <>{stars}</>;
};

export default BackgroundBeams;
