import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SideBar = ({ checked }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState("default");

    console.log(mousePosition);
    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            transition: { type: "spring", mass: 0.2 },
        },
        text: {
            height: 100,
            width: 100,
            x: mousePosition.x - 50,
            y: mousePosition.y - 50,
            backgroundColor: "white",
            mixBlendMode: "difference",
            transition: { type: "spring", mass: 0.2 },
        },
    };

    const textEnter = () => setCursorVariant("text");
    const textLeave = () => setCursorVariant("default");

    return (
        <>
            <div onMouseEnter={textEnter} onMouseLeave={textLeave} className={`wrapper ${checked ? 'active' : ''} z-40 fixed top-0 right-0 w-3/6 bg-white text-black h-full text-3xl`}>
                <div className='flex justify-center items-center h-full'>
                    <ol  className='flex flex-col'>
                        <li>Home</li>
                        <li>Contact us</li>
                        <li>Number</li>
                    </ol>
                    <motion.div
                        className='circle fixed top-0 left-0 pointer-events-none'
                        variants={variants}
                        animate={cursorVariant}
                        style={{
                            height: 32,
                            width: 32,
                            borderRadius: "50%",
                            position: "fixed",
                            backgroundColor: "black",
                            pointerEvents: "none",
                            zIndex: 50,
                        }}
                    />
                </div>
            </div>
        </>
    );
};
export default SideBar;
