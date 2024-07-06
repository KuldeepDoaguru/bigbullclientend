import styled from 'styled-components';
import layers from '../../Assets/layers.png'
import star from '../../Assets/star.png'
import contact from '../../Assets/contact.png'

const Testimonial = () => {
    return (
        <>
            <LandingPage>
                {/* testimonials */}
                {/* left */}
                <div className="testimonial-page flex justify-center items-center mt-5 flex-wrap">
                    <div className="testimonial-container border rounded-[20px] border-red-300 w-[80%] md:w-[80%] pb-40 flex flex-col flex-wrap">
                        <h1 className='heading text-4xl text-center my-10 fs-5'>Our<i>Happy Learner</i></h1>
                        <div className="">
                            <div class="container-1 max-h-32">
                                <div className='self-center mb-32'>
                                    <h2 className='text-4xl	mb-5 pl-10'>Testimonials</h2>
                                    <div className="w-24 flex flex-wrap pl-12">
                                        <img src={layers} alt="layers pic" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* inner card */}

                        <div className="box-container w-[100%] flex justify-center items-center" >
                            <div className=' inner-box w-1/2 h-80 md:h-64 sm:h- flex flex-col justify-center items-center flex-wrap border rounded-[20px] border-red-300 rounded relative'>
                                <div className='w-28 absolute bottom-[80%] flex flex-wrap'>
                                    <img src={contact} alt="Profile pic" />
                                </div>
                                {/* ratings */}
                                <div class='w-40 absolute top-[85%] flex flex-wrap'>
                                    <img src={star} alt='rating' />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </LandingPage>
        </>
    )
}


export default Testimonial;
const LandingPage = styled.div`

/* media queries (testimonials) - */


@media screen and (min-width: 769px) and (max-width: 1024px){

    .testimonial-page{     
        width: 120%;
    }

    .testimonial-container{    
         margin-left: auto;
         margin-right: auto;
        }

        h1 {
            font-size: 35px;
        }
    
}



@media screen and (min-width: 540px) and (max-width: 481px){
    
 

    } 
    
@media screen and (min-width: 481px) and (max-width: 768px){
    
    
}

 @media screen and (min-width: 320px) and (max-width: 480px){
     
     
     .testimonial-page {    
        width: 120%;
        }
        
     .testimonial-container {         
        margin-left: auto;
         margin-right: auto;
        }
}
    
        
`;