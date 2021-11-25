const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req,res) =>{
    
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url)
    const ext = path.extname(filePath)
    let contentType = 'text/html'

    switch (ext){
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        default:
            contentType = 'text/html'    
    }

    if(!ext){
        filePath += '.html'
    }

    fs.readFile(filePath, (err, content) => {
        if(err){
            console.log('Error')
        }
        else{
            res.writeHead(200, {
                'Content-Type': contentType
            })
            res.end(content)
        }
    })

})

server.listen(3000, ()=>{
    console.log('Server started')
})