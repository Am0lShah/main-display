


const connectionManage=(io)=>{
    io.on("send_message",(socket)=>{
        console.log(socket);
        
    })
}



export {connectionManage};