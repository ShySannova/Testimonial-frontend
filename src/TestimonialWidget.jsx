import React, { useEffect, useState } from "react";
import "./Testimonial.css";

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const getTestimonial=async()=>{
        try{
          const response = await fetch("http://localhost:5000/testimonials")
          const data = await response.json()
          setTestimonials(data)
        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        // Fetch testimonials from the API
        getTestimonial()
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < testimonials.length - 2 ? prevIndex + 2 : 0
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 2 : testimonials.length - 2
        );
    };

    return (
        <div className="testimonial-container">
            <div className="ham">
                <span></span>
                <span></span>
                <span></span>
            </div>
           <div className="wave">
            <img src="/layered-waves-haikei.png" alt="" />
           </div>
            <h2 className="testimonial-heading">Admission Consulting</h2>
            <p>
                No need to wait forever to get on the phone with a consultant.
            </p>
            <p>Whether you're traveling for work, on your lunch break</p>
            {testimonials?.length===0?
            <h2 className="shimmer-text">Add custom shimmer effect</h2>:

            <div className="testimonials">
                {testimonials
                    ?.slice(currentIndex, currentIndex + 2)
                    ?.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            
                            <i className="fas fa-quote-left quote-icon"></i>
                            <p>{testimonial.text}</p>
                            <div className="testimonial-user-content">
                                <span>
                                    <i className="fas fa-user user-icon"></i>
                                </span>
                                <div>
                                    <p>
                                        <strong>{testimonial.name}</strong>
                                    </p>
                                    <p>{testimonial.designation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                <div className="slider-controls">
                    <i
                        className="fas fa-chevron-left slider-arrow"
                        onClick={prevSlide}></i>

                    <i
                        className="fas fa-chevron-right slider-arrow"
                        onClick={nextSlide}></i>
                </div>
                <div className="slider-indicators">
                            {Array.from(
                                { length: testimonials?.length / 2 },
                                (_, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`indicator ${
                                                index === currentIndex / 2
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setCurrentIndex(index * 2)
                                            }></div>
                                    );
                                }
                            )}
                </div>
            </div>
            }
        </div>
    );
};

export default Testimonial;
