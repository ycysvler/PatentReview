import Config from "config";
import React from "react";
import { Button, notification } from 'antd';
let isIe = false;
if (/MSIE/i.test(navigator.userAgent)) {
    isIe = true;
}
if (/rv:11.0/i.test(navigator.userAgent)) {
    isIe = true;
}
if (/Edge\/\d./i.test(navigator.userAgent)) {
    isIe = false;
}
class Common {
    status = {
        NULL: '',
        REQUEST: 'Request',
        SUCCESS: 'Success',
        FAILURE: 'Failure',
    };
    initRequest = {
        status: this.status.NULL,
        httpStatus: 0,
        error: "",
        lastUpdated: "2000-1-1" //请求的结果时间
    };
    checkStatus = response => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else if (response.status === 500) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };
    parseJSON = response => {
        return response.json();
    };
    parseText = response => {
        return response.text();
    };
    post = (url, params, cb) => {
        const searchParams = Object.keys(params)
            .map(key => {
                return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
            })
            .join("&");
        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            credentials: "include",
            body: searchParams
        })
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(json => {
                cb(json, null, 200);
            })
            .catch(error => {
                if (error.response) {
                    cb(null, error.message, error.response.status);
                } else {
                    cb(null, error.message, 500);
                }
            });
    };
    graphqlUrl = (url, cmd, cb) => {
        fetch(url, {
            method: "post",
            headers: {"Content-Type": "application/json;charset=UTF-8"},
            credentials: "include",
            body: JSON.stringify(cmd)
        })
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(json => {
                if (json.errors) {
                    if (json.errors[0].status) {
                        cb(json, json.errors[0].message, json.errors[0].status);
                    } else {
                        cb(json, json.errors[0].message, 500);
                    }
                } else {
                    cb(json, null, 200);
                }
            })
            .catch(error => {
                if (error.response) {
                    cb(null, error.message, error.response.status);
                } else {
                    cb(null, error.message, 500);
                }
            });
    };
    graphqlAppKey = (appKey, cmd, cb) => {
        this.graphqlUrl(Config.host + "/graphql?app_id=" + appKey, cmd, cb);
    };
    graphql = (cmd, cb) => {
        this.graphqlUrl(Config.host + "/graphql", cmd, cb);
    };
    utf8ArrayToStr = array => {
        let out, i, len, c;
        let char2, char3;
        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12:
                case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(
                        ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
                    );
                    break;
            }
        }
        return out;
    };
    isIe = () => {
        return isIe;
    };
    handleRedirect = () => {
        document.location.href = document.location.href.split("#")[0];
    };
    openRedirectNotification = () => {
        const key = `302`;
        const btn = (
            <Button type="primary" onClick={this.handleRedirect}>
                立即刷新
            </Button>
        );
        notification["info"]({
            message: "版本有更新",
            description: "请重新刷新页面",
            btn,
            duration: null,
            key
        });
    };
    strVer = "";
    checkVer = () => {
        let url = "/console";
        fetch(url, {
            method: "get",
            credentials: "include"
        })
            .then(this.checkStatus)
            .then(this.parseText)
            .then(text => {
                if (this.strVer !== "") {
                    if (this.strVer !== text) {
                        this.strVer = text;
                        this.openRedirectNotification();
                    }
                } else {
                    this.strVer = text;
                }
            });
        //next check
        let during = 1000 * 60;
        if (process.env.NODE_ENV === "production") {
            //check ever 5 mins
            during = 1000 * 60 * 5;
        }
        setTimeout(() => {
            this.checkVer();
        }, during);
    };
    generateRandomString = (length) => {
        length = length || 32;
        var source = "abcdefghzklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var s = "";
        for(var i = 0;i < length; i++)  {
            s += source.charAt(Math.ceil(Math.random()*1000)%source.length);
        }
        return s;
    }
}
export default new Common();