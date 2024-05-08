"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./config/data-source");
const envs_1 = require("./config/envs");
const server_1 = require("./server");
require("reflect-metadata");
data_source_1.AppDataSource.initialize().then(() => {
    console.log('Conexion a la base de datos con exito');
    server_1.app.listen(envs_1.PORT, () => {
        console.log(`server on port ${envs_1.PORT}`);
    });
});
