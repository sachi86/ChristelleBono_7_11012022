/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
const regexText = new RegExp(/^[a-zA-Z\s'\-àáâãäæçèéêëìíîïñòóôõöùúûüýÿœÀÁÂÃÄÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÜŒ]+$/g);//eslint-disable-next-line
const regexEmail = new RegExp(/^[\w\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,6}$/g);//eslint-disable-next-line
const regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);//eslint-disable-next-line


export default {
    regexText,
    regexEmail,
    regexPassword
}