import image47 from './adiAssets/image 47.png';
// import manVideo from './adiAssets/fire.mp4';
import styled from 'styled-components';
import Card from './Card';
import CardData from './CardData';

export default function Awards() {
    return (
        <>
            <Wrapper >
                <div>
                <div className="background-video">
                    {/* <video src={manVideo} loop autoPlay muted className="video"></video> */}
                </div>
                <div className="cards-container">
                    {CardData.map((data) => (
                        <Card key={data.award} award={data.award} date={data.date} />
                    ))}
                </div>
                </div>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    width: 100%;
   
    position: relative;

    .background-video {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: -1; 
    }

    .video {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover; 
        transform: translate(-50%, -50%);
    }

    .cards-container {
        display: flex;
        flex-wrap: nowrap; /* This prevents wrapping to a new line */
        gap: 10px;
        padding-top: 300px; 
        
        @media (max-width: 375px) {
            gap: 10px;
            padding-top: 100px; /* Adjust for small screens */
        }

        @media (min-width: 376px) and (max-width: 767px) {
            gap: 10px;
            padding-top: 150px; /* Adjust for medium screens */
        }

        @media (min-width: 768px) and (max-width: 1023px) {
            gap: 20px;
            padding-top: 200px; /* Adjust for large screens */
        }

        @media (min-width: 1024px) {
            gap: 30px;
            padding-top: 300px; /* Adjust for extra-large screens */
        }
    }
`;
