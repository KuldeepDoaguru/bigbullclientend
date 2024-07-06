import React from 'react';
import styled from 'styled-components';

const FAQ = () => {
    return (
        <LandingPage>
            <div className='grid grid-cols-2 gap-10 px-5 my-10 faq'>
                {/* Left side */}
                <div className='flex flex-col'>
                    <div className='self-center'>
                        <h2 style={{fontFamily: "Futura-bold"}} className='text-7xl mb-10'>FAQ</h2>
                        <button className='text-xl border-2 rounded-3xl border-black py-2 px-7'>Testing</button>
                    </div>
                    {/* Content */}
                    <div className='gap-y-14 mt-14 max-w-md self-end'>
                        <div className='flex gap-11 mb-12'>
                            {/* Number */}
                            <div className='text-7xl'>01</div>
                            {/* Paragraph */}
                            <div>
                                <h3 className='text-4xl'>How do I enroll?</h3>
                            </div>
                        </div>
                        <div className='flex gap-11 mb-12'>
                            {/* Number */}
                            <div className='text-7xl'>02</div>
                            {/* Paragraph */}
                            <div>
                                <h3 className='text-4xl'>What is the course duration?</h3>
                            </div>
                        </div>
                        <div className='flex gap-11'>
                            {/* Number */}
                            <div className='text-7xl'>03</div>
                            {/* Paragraph */}
                            <div>
                                <h3 className='text-4xl'>Are there any prerequisites?</h3>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right side */}
                <div className="bgimage">
                    <div className='p-10 w-full'>
                        {/* <img src='https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_1280.jpg' className="object-contain" alt="" width="100%" /> */}
                    </div>
                </div>
            </div>
        </LandingPage>
    );
}

export default FAQ;

const LandingPage = styled.div`
    .bgimage {
        background-image: url('https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_1280.jpg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }
    @media screen and (max-width: 768px) {
        .bgimage {
            display: none;
        }
        .faq {
            justify-content: center;
            grid-template-columns: 1fr;
        }
    }
`;