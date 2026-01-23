import jwt from 'jsonwebtoken' 

export function createToken(UserId:string) {
    try {
        const AccessSecret = process.env.AccessSecret;
        const RefreshSecret = process.env.RefreshToken;
        if (!AccessSecret) {
             console.log("acess secret is missing")
            return;
        }
        if(!RefreshSecret){
            console.log("refresh secret is missing")
         return
        }
            const AcessToken = jwt.sign({ UserId }, AccessSecret, { expiresIn: "15m" });
            const RefreshToken = jwt.sign(UserId, RefreshSecret, { expiresIn: "7d" });
        return({
            AcessToken,RefreshToken
         })
    }
    catch (error) {

    }
}