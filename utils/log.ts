export class log{



    public static info(message: string, ...data: unknown[]){
        this._write('blue', `INF: ${message}`, data);
    }
    public static warn(message: string, ...data: unknown[]){
        this._write('orange', `WRN: ${message}`, data);
    }
    public static success(message: string, ...data: unknown[]){
        this._write('green', `${message}`, data);
    }
    public static danger(message: string, ...data: unknown[]){
        this._write('red', `ERR: ${message}`, data);
    }

    private static _write(color: string, message: string, ...data: unknown[]){
        console.log(`%c${message}`, [data, ...`color: ${color}`]);

    }
}