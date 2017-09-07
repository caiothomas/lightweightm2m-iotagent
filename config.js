/*
 * Copyright 2014 Telefonica Investigación y Desarrollo, S.A.U
 *
 * This file is part of fiware-iotagent-lib
 *
 * fiware-iotagent-lib is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * fiware-iotagent-lib is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with fiware-iotagent-lib.
 * If not, seehttp://www.gnu.org/licenses/.
 *
 * For those usages not covered by the GNU Affero General Public License
 * please contact with::[contacto@tid.es]
 */

var config = {};


config.lwm2m = {
    port: 5683,                         // Port where the server will be listening
    lifetimeCheckInterval: 1000,        // Minimum interval between lifetime checks in ms
    udpWindow: 100,
    defaultType: 'Device',
    logLevel: 'DEBUG',
    ipProtocol: 'udp4',
    serverProtocol: 'udp4',    
    /**
     * When a LWM2M client has active attributes, the IOTA sends an observe instruction for each one, just after the
     * client registers. This may cause cause an error when the client takes too long to start listening, as the
     * observe requests may not reach its destiny. This timeout (ms) is used to give the client the opportunity to
     * create the listener before the server sends the requests.
     */
    delayedObservationTimeout: 50,    
    formats: [
        {
            name: 'application-vnd-oma-lwm2m/text',
            value: 0
        },
        {
            name: 'application-vnd-oma-lwm2m/tlv',
            value: 11542
        },
        {
            name: 'application-vnd-oma-lwm2m/json',
            value: 11543
        },
        {
            name: 'application-vnd-oma-lwm2m/opaque',
            value: 42
        }
    ],
    writeFormat: 'application-vnd-oma-lwm2m/text',
    authenticate: false,    
    dtls_opts : {
        key: "/home/caio/Desktop/fiware/lwm2m-dtls/node-coap-dtls/examples/127_0_0_1.pkey",
        debug: 1,
        handshakeTimeoutMin: 3000
    },
    types: [
        {
            name: 'Room',
            url: "/elemento/Room/rd"
        }
    ]
};


config.iota = {
    logLevel: 'DEBUG',
    contextBroker: {
        host: 'http://localhost',
        port: '1026'
    },
    /**
     * The ngsi request will be with ssl connections
     */
    ssl: {
        active: false,
        keyFile: 'certificados/server/key.pem',
        certFile: 'certificados/server/cert.pem',
        //ca: 'certificados/mqtt.perm',
        rejectUnauthorized: false
    },

    /**
     * Configuration of the Northbound server of the IoT Agent.
     */
    server: {
        /**
         * Port where the IoT Agent will be listening for requests.
         */
        port: 4071,
        ssl : {
            portSSL: 4072,
        
            /**
             * This flag activates the HTTPS protocol in the server. The endpoint always listen to the indicated port
             * independently of the chosen protocol.
             */
            active: false,

            /**
             * Key file to use for codifying the HTTPS requests. Only mandatory when the flag active is true.
             */
            keyFile: 'certificados/server/key.pem',

            /**
             * SSL Certificate to present to the clients. Only mandatory when the flag active is true.
             */
            certFile: 'certificados/server/cert.pem',

            ca: '',
            requestCert: false,
            rejectUnauthorized: false                 
        }       
    },

    authentication: {
        enabled: false,
        protocol: 'http://',
        host: 'localhost',
        port: '80',
        path: '/orion/getToken.php',
        checktoken: '/orion/token.php',//verifica o token das requisições lazy e command no IoT Agent
        user: 'caio',
        password: 'caio',
        domain: 'figuardian'
    },

    /**
     *
    authentication: {
        enabled: true,
        protocol: 'http://',
        host: 'localhost',
        port: '5000',
        path: '/v3/auth/tokens',
        user: 'caio',
        password: 'caio',
        domain: 'figuardian'
    },
    */

    deviceRegistry: {
        type: 'memory'
    },
    mongodb: {
        /**
         * Host where MongoDB is located. If the MongoDB used is a replicaSet, this property will contain a
         * comma-separated list of the instance names or IPs.
         */
        host: 'mongo',

        /**
         * Port where MongoDB is listening. In the case of a replicaSet, all the instances are supposed to be listening
         * in the same port.
         */
        port: '',

        /**
         * Name of the Mongo database that will be created to store IOTAgent data.
         */
        db: 'iotagentul'

        /**
         * Name of the set in case the Mongo database is configured as a Replica Set. Optional otherwise.
         */
        //replicaSet: ''
},
    types: {
        'Device': {
            apikey: 'apikey3',
            type: 'Device',
            trust: 'b17509-Trust',
        },        
        'Room': {           
            apikey: 'apikey3',
            type: 'Room',
            trust: 'd0fa707131204b56a46103c53e67fab7',
            service: 'figuardian',
            subservice: '/ufu', 	
            
            "attributes": [
                      {
                        "name": "Longitude",
                        "type": "number"
                      }
                    ],
                    "lazy": [
                      {
                        "name": "Temperature",
                        "type": "number"
                      }
                    ],
                    "commands": [
                      {
                        "name": "Reboot"                       
                      }
                    ],
                    "lwm2mResourceMapping": {
                      "Longitude" : {
                        "objectType": 6,
                        "objectInstance": 0,
                        "objectResource": 1
                      },                      
                    "Temperature" : {
                        "objectType": 6,
                        "objectInstance": 0,
                        "objectResource": 2
                      },
                      "Reboot" : {
                        "objectType": 6,
                        "objectInstance": 0,
                        "objectResource": 5
                      }
                    } 
            }             
    },
    service: 'figuardian',
    subservice: '/ufu',
//    providerUrl: 'http://192.168.1.9:4061',
   providerUrl: 'https://192.168.1.8:4062',//security connection
    deviceRegistrationDuration: 'P1M'
};

module.exports = config;


