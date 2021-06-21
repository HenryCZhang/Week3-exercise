let command_count=0;

module.exports.useGet = ()=>{
    console.log(`Command #: ${command_count++} - Implemented Get command `);
}
module.exports.usePost = ()=>{
    console.log(`Command #: ${command_count++} - Implemented Post command `);
}
module.exports.usePush = ()=>{
    console.log(`Command #: ${command_count++} - Implemented Push command `);
}
module.exports.useDelete = ()=>{
    console.log(`Command #: ${command_count++} - Implemented Delete command `);
}