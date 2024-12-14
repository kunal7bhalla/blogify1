const jwt=require("jsonwebtoken");

const secret="$uperMan@!#$%^&";

function createTokenForUser(user){
    const payload={
        _id:user._id,
        name:user.name,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role,
    };

    const token=jwt.sign(payload,secret,{expiresIn:'1h'});

    return token;
}

function validateToken(token){
    if(!token){
        throw new Error("token not found");
        
    }
    const payload=jwt.verify(token,secret);
    return payload;
}

module.exports={
    createTokenForUser,
    validateToken,
}