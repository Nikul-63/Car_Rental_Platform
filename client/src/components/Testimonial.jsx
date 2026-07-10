import React from 'react';
import Title from './Title';
import { assets } from '../assets/assets';
import { motion } from 'motion/react';

const Testimonial = () => {
    const testimonials = [
        {
            name: "Emma Rodriguez",
            role : "Software Developer",
            location: "Barcelona, Spain",
            image: assets.testimonial_image_1,
            testimonial: "I've rented cars from various companies, but the experience with CarRental was exceptional."
        },
        {
            name: "John Smith",
            role : "Enterprenuer",
            location: "New York, USA",
            image: assets.testimonial_image_2,
            testimonial: "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic."
        },
        {
            name: 'Ava Johnson',
            role : "Businessman",
            location: "Sydeny, Australia",
            image: assets.testimonial_image_1,
            testimonial: "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service."
        }
    ]
    return (
        <div className='py-28 px-6 md:px-16 lg:px-24 xl:px-44'>

            <Title title='What Our Customer Says' subTitle='Discover why discerning travelers choose StayVenture for their luxury accomodations arount the world.' />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial, index) => (
                    <motion.div 
                    initial={{ opacity : 0, y : 40}}
                    whileInView={{ opacity : 1, y : 0}}
                    transition={{duration : 0.8, delay : index * 0.2, ease : 'easeOut'}}
                    viewport={{ once: true, amount : 0.3}}
                    key={index} className="w-80 flex flex-col items-center border border-gray-300 p-10 rounded-lg shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <img className="h-20 w-20 rounded-full" src={testimonial.image} alt={testimonial.name} />
                        <h2 className="text-lg text-gray-900 font-medium mt-2">{testimonial.name}</h2>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                        <div className="flex items-center justify-center mt-3 gap-1">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon} alt="star_icon"/>
                            ))}
                        </div>
                        <p className="text-center text-[15px] mt-3 text-gray-500 font-light">{testimonial.testimonial}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial;