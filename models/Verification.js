import mongoose from "mongoose";

const verificationSchema = mongoose.Schema({
    idUser:{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: true
    }
});

const Verification = mongoose.model('Verification', verificationSchema);
export default Verification;