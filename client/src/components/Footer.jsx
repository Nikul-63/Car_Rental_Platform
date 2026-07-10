import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'motion/react';

const Footer = () => {
    return (
        <motion.div 
        initial={{ opacity : 0, y : 30}}
        whileInView={{ opacity : 1, y : 0}}
        transition={{ duration: 0.6}}
        className='px-6 md:px-16 lg:px-24  xl:px-32 mt-60 text-sm text-gray-500'>
            <footer className="bg-white w-full max-w-[1350px] mx-auto text-black pt-8 lg:pt-12 px-4 sm:px-8 md:px-16 lg:px-28 rounded-tl-3xl rounded-tr-3xl overflow-hidden">
                <motion.div 
                initial={{ opacity : 0, y : 20}}
                whileInView={{opacity : 1, y : 0}}
                transition={{ duration : 0.6, delay : 0.2}}
                className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12">

                    <div className="lg:col-span-3 space-y-6">
                        <motion.img 
                        initial={{ opacity : 0}}
                        whileInView={{ opacity : 1}}
                        transition={{ duration : 0.5, delay : 0.3}}
                        src={assets.logo} alt='' className='h-8 md:h-9' />
                        <motion.p 
                        initial={{ opacity : 0}}
                        whileInView={{ opacity : 1}}
                        transition={{duration : 0.5, delay : 0.3}}
                        className="text-sm/6 text-neutral-600 max-w-96">PrebuiltUI helps you build faster by transforming your design vision into fully functional, production-ready UI components.</motion.p>
                        <motion.div 
                        initial={{ opacity : 0}}
                        whileInView={{ opacity : 1}}
                        transition={{ duration : 0.5, delay : 0.5}}
                        className="flex gap-5 md:gap-6 order-1 md:order-2">
                            <a href='#'><img src={assets.facebook_logo} className='w-5 h-5' /></a>
                            <a href="#"><img src={assets.instagram_logo} className='w-5 h-5' /></a>
                            <a href="#"><img src={assets.twitter_logo} className='w-5 h-5' /></a>
                            <a href="#"><img src={assets.gmail_logo} className='w-5 h-5' /></a>
                        </motion.div>
                    </div>

                    <motion.div 
                    initial={{ opacity : 0, y : 20}}
                    whileInView={{ opacity : 1, y : 0}} 
                    transition={{duration : 0.6, delay : 0.4}}
                    className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 ">
                        {/* Products */}
                        <div>
                            <h2 className="text-base font-medium text-gray-800 uppercase">Quick Links</h2>
                            <ul className="mt-3 flex flex-col gap-1.5">
                                <li><a href="#" className="hover:text-neutral-700">Home</a></li>
                                <li><a href="#" className="hover:text-neutral-700">Browse Cars</a></li>
                                <li><a href="#" className="hover:text-neutral-700">List Your Car</a></li>
                                <li><a href="#" className="hover:text-neutral-700">About Us</a></li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-base font-medium text-gray-800 uppercase">Resources</h2>
                            <ul className="mt-3 flex flex-col gap-1.5">
                                <li><a href="#" className="hover:text-neutral-700">Help Center</a></li>
                                <li><a href="#" className="hover:text-neutral-700">Terms of Service</ a></li>
                                <li><a href="#" className="hover:text-neutral-700">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-neutral-700">Insurance</a></li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-base font-medium text-gray-800 uppercase">Contact</h2>
                            <ul className="mt-3 flex flex-col gap-1.5">
                                <li>1234 Luxury Drive</li>
                                <li>San Francisco, CA 94107</li>
                                <li>+91 9773169882</li>
                                <li>dabhinikul625@gmail.com</li>
                            </ul>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div 
                initial={{ opacity : 0, y : 10}}
                whileInView={{ opacity : 1 , y : 0}}
                transition={{ duration : 0.6, delay : 0.6}}
                className="max-w-7xl mx-auto mt-12 pt-4 border-t border-neutral-300 flex justify-between items-center">
                    <p className="text-neutral-600 text-sm">&copy; 2026 CarRental</p>
                    <p className='text-sm text-neutral-600'>All right reserved.</p>
                </motion.div>
                <div className="relative">
                    <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64 bg-slate-100 rounded-full blur-[100px] pointer-events-none" />
                    <h1 className=" text-center font-extrabold leading-[0.7] text-transparent text-[clamp(3rem,12vw,15rem)] [-webkit-text-stroke:1px_#D4D4D4] mt-6" >
                        CarRental
                    </h1>
                </div>
            </footer>
        </motion.div>
    )
}

export default Footer;