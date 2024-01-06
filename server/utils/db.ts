import mysql from 'mysql2'

let DATABASE = {
    "NAME": "app1foodmenu",
    "USER": "ylcsrpkucvb5",
    "PASSWORD": "pscale_pw_IHk-hum58ggTX3QGmvTMZHcskg_TcbqdmGy-ZRSo_o4",
    "HOST": "rj39b4c8pk37.us-east-4.psdb.cloud"
}

const db_config = {
    user: DATABASE.USER,
    password: DATABASE.PASSWORD,
    database: DATABASE.NAME,
    host: DATABASE.HOST,
    ssl: {}
};

export function connectToDb() {
    // const config = useRuntimeConfig();

    process.env.NODE_ENV !== "production"
    ? (db_config.ssl = {})
    : (db_config.ssl = { rejectUnauthorized: true });

    const pool = mysql.createPool(db_config);

    console.log("Connected to PlanetScale!");

    
    return pool;
}