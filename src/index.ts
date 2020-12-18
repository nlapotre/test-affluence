import express from "express";
import moment from "moment";
import axios from 'axios';
import { time } from "console";


const app = express();
const port = 8081;

app.get("/available", (req, res) => {
    
    var date : any = req.query.date;
    var resourceId : any = req.query.resourceId;

    if (!moment(date, moment.ISO_8601, true).isValid()) {
        res.status(400).json({ "error": "wrong format for param startDatetime" });
        return;
    }

    axios.get('http://localhost:8080/timetables', { params: {
        date,
        resourceId
    }}).then(
        (result) => {
            //si open == false 
            const timetables = result.data.timetables
            timetables.array.forEach(element => {
                if (element.opening < date && element.closing > date) {
                    
                }
            });

            res.json({
                open: result.data.open,
                timetables: result.data.timetables})
        }
    ).catch((err) => {
        res.json({message: err})
    });

})
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});