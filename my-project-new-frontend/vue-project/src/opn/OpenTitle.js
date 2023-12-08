import {ElNotification} from "element-plus";

const openSuccess = (message) => {
    ElNotification({
        title: 'Success',
        message: message,
        type: 'success',
    })
}
const openWarning = (message) => {
    ElNotification({
        title: 'Warning',
        message: message,
        type: 'warning',
    })
}
const openInfo = (message) => {
    ElNotification({
        title: 'Info',
        message: message,
        type: 'info',
    })
}
const openError = (message) => {
    ElNotification({
        title: 'Error',
        message: message,
        type: 'error',
    })
}
export {openSuccess,openWarning,openError,openInfo}