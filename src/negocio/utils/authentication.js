import bCrypt from "bcrypt";

const validatePassword = (passwordReq, paddwordBD) => {   
    return bCrypt.compareSync(paddwordBD, passwordReq );
};

var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

export {validatePassword, createHash}