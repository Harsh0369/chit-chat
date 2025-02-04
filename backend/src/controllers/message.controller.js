import message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async(req, res)=>
{
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch {
        console.log(err);
        res.status(500).send("Internal server error");
        
    }
}

export const getMessages = async (req, res) =>
{
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await message.find({
            $or: [
                { to: userToChatId, from: myId },
                { to: myId, from: userToChatId }
            ]
        })
        res.status(200).json(messages);
        
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal server error");
        
    }
}

export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image)
        {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new message({
            recieverId,
            senderId,
            text,
            image: imageUrl
        });
        await newMessage.save();
    }
    catch(err) {
        console.log(err);
        res.status(500).send("Internal server error");
        
    }
}