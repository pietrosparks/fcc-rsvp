module.exports = (api,  Users,functions,  client,Attendance,_) => {
    api.post('/search', (req, res) => {

        client.search({
            categories:'nightlife,all',
            location: req.body.search, 
        }).then(response => {
           return res.json(response.jsonBody);
        }).catch(err => {
            return functions.jsonResponse(404,'error', null, res,'Location not found. Try Somewhere else',err)
        });
    })

    api.get('/attendance', (req, res)=>{
        Attendance.findOne({}).then(att=>{
            
            if(_.isEmpty(att)){
                const attendance = new Attendance();
                attendance.save().then(att=>{
                   return functions.jsonResponse(200,'success', attendance, res,'succesfully retrieved attendance')
                })
            
            }
            return  functions.jsonResponse(200,'success', att, res,'succesfully retrieved attendance')
        })
    })

    api.put('/attendance', (req, res)=>{

        Attendance.findById(req.body._id).then(att=>{
            if(_.isEmpty(att)){
                   return  functions.jsonResponse(404,'error', null, res,'Attendance not found', err)
            }
            else{
                att = Object.assign(att,req.body);
                att.save();
                return  functions.jsonResponse(200,'success', att, res,'Successfully Updated')
            }
            
           
        })
    })
}