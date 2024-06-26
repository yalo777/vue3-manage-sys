import axios from "axios";


const SUCCESS = 200;
const code_map = {
    400: "请求错误",
    401: "未授权，请登录",
    403: "拒绝访问",
    404: "地址出错:",
    408: "应答超时",
    500: "致命错误：需重启系统",
    501: "逻辑未实现",
    502: "总线错误",
    503: "逻辑不可用",
    504: "总线超时",
    505: "通讯版本不受支持",
}

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <your_token>'
};

export class HttpClient {

    constructor(url, token = '', timeout = 15000) {      // 构造函数：new HttpClient对象时，初始化调用
        this.handler = axios.create({
            timeout: timeout,
        });

        this.url = url;
        this.timeout = timeout;
        if(token !== ''){
            this.handler.interceptors.request.use(config => {
                config.headers["Authorization"] = token;
                return config;
            }, error => {
                Promise.reject(error)
            });
        }
        // Promise 表示请求是否通过。还表示一个异步操作的结果
        this.handler.interceptors.response.use(response => {
            // 拦截响应数据
            // return response.data;
            if (response.data.code === SUCCESS) {
                return Promise.resolve(response.data);          
            } else {
                if (typeof response.data.message === "object") {
                    response.data.message = JSON.stringify(response.data.message);
                }
                return Promise.reject(response.data);
            }
        }, error => {
            let res = {
                code: -1,
                message: "通讯错误",
                result: {}
            }
            console.log("444444444444444444444   " + response.data.code);
            if (error && error.response) {
                res.code = error.response.status;
                res.message = code_map[error.response.status];
            }
            return Promise.reject(res);
        });
    }

    set_token(token) {
        this.handler.interceptors.request.use(config => {
            config.headers["Authorization"] = token;
            return config
        }, error => {
            Promise.reject(error)
        });
    }

    // 使用 Axios 拦截器为 Axios 请求设置授权头
    set_headers(key, value) {
        this.handler.interceptors.request.use(
            config => {
                config.headers[key] = value;
                return config
            }, error => {
                Promise.reject(error)
            }
        )
    }

    get(params, success_func, error_func, headers={}) {
        this.handler.get(
            this.url, {
            params: params,
            headers: headers
        }
        ).then(response => {
            success_func(response);
        }).catch(error => {
            error_func(error);
        })
    }

    post(data, params, success_func, error_func, headers={}) {
        this.handler.post(
            this.url,
            data, {
            params: params,
            headers: headers
        }
        ).then(response => {
            success_func(response);
        }).catch(error => {
            error_func(error);
        });
    }

    delete(params, success_func, error_func, headers={}) {
        this.handler.delete(
            this.url, {
            params: params,
            headers: headers
        }
        ).then(response => {
            success_func(response);
        }).catch(error => {
            error_func(error);
        });
    }

    put(data, params, success_func, error_func, headers={}) {
        this.handler.put(
            this.url,
            data, {
            params: params,
            headers: headers
        }
        ).then(response => {
            success_func(response);
        }).catch(error => {
            error_func(error);
        });
    }
}
