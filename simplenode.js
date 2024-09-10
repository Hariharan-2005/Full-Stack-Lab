const n = require("http");
const PORT = 4000;
const s = n.createServer((req,res)
           =>{
            res.write("");
            res.end();

           })
        s.listen(PORT,(err)=>{
            if(err)
            {
                console.log(e);

            }
            else{
                console.log(PORT);
            }
        })