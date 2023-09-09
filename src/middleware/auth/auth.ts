import Express from "express"
import jwt from "jsonwebtoken"
const authorized = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {

    const token = req.headers["authorization"] || ""
    let validToken;
    try {
        validToken = jwt.verify(token, process.env.SECRET_KEY || "")
    } catch (error) {

    }

    console.log(token);


    if (validToken) {
        const decoded = jwt.decode(token)
        res.locals.user = decoded
        next()
    } else {
        res.status(401).send("you are unauthorized")
    }

}

export { authorized }