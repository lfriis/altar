"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = exports.error = exports.warn = exports.info = exports.getTimeStamp = void 0;
const getTimeStamp = () => new Date().toISOString();
exports.getTimeStamp = getTimeStamp;
const info = ({ namespace, message, object }) => {
    if (object) {
        console.info(`[${(0, exports.getTimeStamp)()}] [INFO] [${namespace}] ${message}, ${object}`);
    }
    else {
        console.info(`[${(0, exports.getTimeStamp)()}] [INFO] [${namespace}] ${message}`);
    }
};
exports.info = info;
const warn = ({ namespace, message, object }) => {
    if (object) {
        console.warn(`[${(0, exports.getTimeStamp)()}] [WARN] [${namespace}] ${message}, ${object}`);
    }
    else {
        console.warn(`[${(0, exports.getTimeStamp)()}] [WARN] [${namespace}] ${message}`);
    }
};
exports.warn = warn;
const error = ({ namespace, message, object }) => {
    if (object) {
        console.error(`[${(0, exports.getTimeStamp)()}] [ERROR] [${namespace}] ${message}, ${object}`);
    }
    else {
        console.error(`[${(0, exports.getTimeStamp)()}] [ERROR] [${namespace}] ${message}`);
    }
};
exports.error = error;
const debug = ({ namespace, message, object }) => {
    if (object) {
        console.debug(`[${(0, exports.getTimeStamp)()}] [DEBUG] [${namespace}] ${message}`, object);
    }
    else {
        console.debug(`[${(0, exports.getTimeStamp)()}] [DEBUG] [${namespace}] ${message}`);
    }
};
exports.debug = debug;
