import axios from 'axios'
import {ElMessage} from "element-plus";

const authItemName = "access_token"

const defaultFailure = (message, code, url) => {
    console.warn(`�����ַ��${url},״̬��: ${code},������Ϣ: ${message}`)
    ElMessage.warning(message)
}
const defaultError = (err) => {
    console.error(err)
    ElMessage.warning('error')
}

//ȡ��token
function takeAccessToken() {
    const str = localStorage.getItem(authItemName) || sessionStorage.getItem(authItemName)
    if (!str) return null;
    const authObj = JSON.parse(str)
    //���token���ھ�ɾ��token
    if (authObj.expire <= new Date()) {
        deleteAccessToken()
        ElMessage.warning('The sign-in status has expired')
        return null
    }
    return authObj.token
}

function storeAccessToken(token, remember, expire) {
    //����token
    const authObj = {token: token, expire: expire}
    const str = JSON.stringify(authObj)
    if (remember)
        localStorage.setItem(authItemName, str)
    else
        sessionStorage.setItem(authItemName, str)
}

//ɾ��token
function deleteAccessToken() {
    localStorage.removeItem(authItemName)
    sessionStorage.removeItem(authItemName)
}

//���ڻ�ȡ����ͷ
function accessHeader() {
    //��ȡtoken
    const token = takeAccessToken();

    return token ? {'Authorization': `Bearer${takeAccessToken()}`} : {}
}

function internalPost(url, data, header, success, failure, error = defaultError) {
    axios.post(url, data, {headers: header}).then(({data}) => {
        if (data.code === 200) {
            success(data.data)
        } else {
            failure(data.message, data.code, url)
        }
    }).catch(err => error(err))
}

function internalGet(url, header, success, failure, error = defaultError) {
    axios.post(url, {headers: header}).then(({data}) => {
        if (data.code === 200) {
            success(data.data)
        } else {
            failure(data.message, data.code, url)
        }
    }).catch(err => error(err))
}

function get(url, success, failure = defaultFailure) {
    internalGet(url, accessHeader(), success(), failure)
}

function post(url, data, success, failure = defaultFailure) {
    internalPost(url, data, accessHeader(), success,failure)
}

function login(username, password, remember, success, failure = defaultFailure) {
    internalPost("/api/auth/login", {
        username: username,
        password: password,
    }, {
        //�Ա���ʽ��������
        'Content-Type': 'application/x-www-form-urlencoded'
    }, (data) => {
        storeAccessToken(data.token, remember, data.expire)
        ElMessage.success(`Login Successful Welcome ${data.username} here`)
        success(data)
    }, failure)
}

function logout(success,failure=defaultFailure) {
    get('/api/auth/logout',()=>{
        //ɾ��token
        deleteAccessToken()
        ElMessage.success('The exit was successful')
        success()
    },failure)
}

function unauthorized(){
    return !takeAccessToken()
}

export {logout, login, get, post,unauthorized}