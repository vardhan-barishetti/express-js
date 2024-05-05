const express = require("express")

const app = express();
app.use(express.json());

var users = [{
    name: "Vardhan",
    kidneys: [{
        healthy: "false"
    },{
        healthy: "true"
    }]
}, 
{
    name: "Barishetti",
    kidneys: [{
        healthy: "true"
    },{
        healthy: "false"
    }]
},
{
    name: "John",
    kidneys: [{
        healthy: "false"
    }]
}
]

app.get("/", function(req, res){

    var result = users.map(user => {
        var noOfKidneys = user.kidneys.length;
        var noOfhealthyKidneys = user.kidneys.filter(kidney => kidney.healthy=="true").length;
        var noOfUnhealthyKidneys = user.kidneys.filter(kidney => kidney.healthy=="false").length

        return{
            name: user.name,
            noOfKidneys,
            noOfhealthyKidneys,
            noOfUnhealthyKidneys
        }
    })

    res.json({
        result
    })

})
app.post("/", function(req, res){

    let healthy = req.body.isHealthy.toString();

    users.forEach(user => {
        user.kidneys.push({ healthy });
    });

    var result = users.map(user => {
        var noOfKidneys = user.kidneys.length;
        var noOfhealthyKidneys = user.kidneys.filter(kidney => kidney.healthy == "true").length;
        var noOfUnhealthyKidneys = user.kidneys.filter(kidney => kidney.healthy == "false").length;

        return {
            name: user.name,
            noOfKidneys,
            noOfhealthyKidneys,
            noOfUnhealthyKidneys
        }

    })

    res.json({
        result
    })
    
})
app.put("/", function(req, res){

    const isHealthy = req.body.isHealthy;

    let result = users.map(user => {
        let noOfKidneys = user.kidneys.length;

        let noOfhealthyKidneys = user.kidneys.filter(kidney => kidney.healthy=="true").length;
        let UnhealthyKidneysToHealthy = user.kidneys.filter(kidney => {
            if(kidney.healthy == "false"){
                kidney.healthy = isHealthy;
                noOfhealthyKidneys += 1;
            }
        });
        let noOfUnhealthyKidneys = user.kidneys.filter(kidney => kidney.healthy=="false").length;

        return {
            name: users.name,
            noOfKidneys,
            noOfhealthyKidneys,
            noOfUnhealthyKidneys
        }

    })

    res.json({
        result
    })
    
})

app.delete("/", function(req, res){

    
    
})

app.listen(3000);
