import imageKit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";


// API to change role 
export const changeRoleToOwner = async (req, res) => {
    try{
        const {_id} = req.user
        await User.findByIdAndUpdate(_id, {role : "Owner"})

        res.json({
            success : true, 
            message : "Now you can list cars"
        })
    }catch(error)
    {
        console.log(error.message);
        res.json({
            success : false, 
            message : "Now You can list cars"
        })
    }
}

// API to list car
export const addCar = async (req, res) => {
    try{
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        if(!imageFile)
        {
            return res.json({
                success : false, 
                message : "Please upload a car image..!"
            });
        }

        // upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path);

        const response = await imageKit.upload({
            file : fileBuffer, 
            fileName: imageFile.originalname, 
            folder : '/cars'
        })

        // optimize through imagekit URL transformation
        var optimizedImageUrl = imageKit.url({
            path : response.filePath, 
            transformation : [
                {width : '1280'},
                {quality : 'auto'},
                {format : 'webp'}
            ]
        });

        const image = optimizedImageUrl;
        await Car.create({...car, owner: _id, image});

        if(fs.existsSync(imageFile.path)){
            fs.unlinkSync(imageFile.path)
        }
        
        res.json({
            success : true, 
            message : "Car Added..!"
        })
    }catch(error)
    {
        console.log(error.message);
        res.json({
            success : false, 
            message : error.message
        })
    }
}

// API to list owner cars
export const getOwnerCars = async (req, res) => {
    try{
        const {_id} = req.user;
        const cars = await Car.find({owner : _id});

        res.json({
            success : true, 
            cars
        });
    }catch(error)
    {
        console.log(error.message);
        res.json({
            success : false, 
            message : error.message
        })
    }
}

// API to toggle car availability
export const toggleCarAvailability = async (req,res) =>{ 
    try{
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        // checking if car belongs to the user
        if(car.owner.toString() !== _id.toString())
        {
            return res.json({
                success : false, 
                message : "Unauthorized..!"
            });
        }

        car.isAvailable = !car.isAvailable;
        await car.save();

        res.json({
            success : true, 
            message : "Availability Toggled..!"
        })
    }catch(error)
    {
        console.log(error.message);
        res.json({
            success : false, 
            message : error.message
        })
    }
}

// API to delete car
export const deleteCar = async (req,res) =>{ 
    try{
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId);

        // checking if car belongs to the user
        if(car.owner.toString() !== _id.toString())
        {
            return res.json({
                success : false, 
                message : "Unauthorized..!"
            });
        }

        car.owner = null;
        car.isAvailable = false;
        await car.save();

        res.json({
            success : true, 
            message : "Car Removed..!"
        })
    }catch(error)
    {
        console.log(error.message);
        res.json({
            success : false, 
            message : error.message
        })
    }
}

// API to get dashboard data
export const getDashboardData = async (req, res) => {
    try{
        const {_id, role} = req.user;

        if(role !== "Owner")
        {
            return res.json(403).json({
                success : false, 
                message : "Unauthorized - User must be an Owner"
            });
        }

        const allCars = await Car.find({});
        console.log('All cars in database : ', allCars.length);
        console.log('First Car Owner ID : ', allCars[0]?.owner);
        console.log('Current User id: ', _id);
        console.log('Do they match ?', allCars[0]?.owner?.toString() === _id.toString());

        const cars = await Car.find({Owner: _id});
        const bookings = await Booking.find({ Owner: _id}).populate('car').sort({ createdAt : -1});

        const pendingBookings = await Booking.find({Owner : _id, status : "Pending"});
        const completedBookings = await Booking.find({Owner : _id, status : "Confirmed"});

        // Calculate monthly bookings from bookings where status is confirmed
        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'Confirmed').reduce((acc, booking) => acc + booking.price, 0);

        const dashboardData = {
            totalCars : cars.length, 
            totalBookings : bookings.length, 
            pendingBookings : pendingBookings.length, 
            completedBookings : completedBookings.length, 
            recentBookings : bookings.slice(0,3),
            monthlyRevenue
        }

        res.json({
            success : true, 
            dashboardData
        })
    }catch(error)
    {
        console.log(error.message);
        res.status(500).json({
            success : false, 
            message : error.message
        })
    }
}

// write an API to update user image
export const updateUserImage = async (req, res) => {
    try{
        const { _id } = req.user;
        const imageFile = req.file;
        // upload image to imagekit
        const fileBuffer = fs.readFileSync(imageFile.path);

        const response = await imageKit.upload({
            file : fileBuffer, 
            fileName: imageFile.originalname, 
            folder : '/users'
        })

        // optimize through imagekit URL transformation
        var optimizedImageUrl = imageKit.url({
            path : response.filePath, 
            transformation : [
                {width : '1280'},
                {quality : 'auto'},
                {format : 'webp'}
            ]
        });

        const image = optimizedImageUrl;
        await User.findByIdAndUpdate(_id, {image});
        res.json({ success : true});

        if(fs.existsSync(imageFile.path)){
            fs.unlinkSync(imageFile.path)
        }
    }catch(error)
    {
        console.log(error.message);
        res.json({
            success : false, 
            message : error.message
        })
    }
}