const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            return next();  // No token, proceed to the next middleware/route
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            return next();  // Proceed if token is valid
        } catch (error) {
            console.log("Error validating:", error);  // Log the error for debugging
            return next();  // If token is invalid, proceed without user data
        }
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
