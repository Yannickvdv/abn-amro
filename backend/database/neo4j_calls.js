require("dotenv").config(); 

const neo4j = require('neo4j-driver')

// Get all the nodes and relationships found in the Neo4j database in a hierarchical order
// See 'Assumptions' section in the root README for an explanation as to why this is so convoluted 
exports.get_all_nodes = function () {
    const driver = neo4j.driver(process.env.DB_URI, neo4j.auth.basic(process.env.DB_USERNAME, process.env.DB_PASSWORD));

    return new Promise((resolve, reject) => {
        session = driver.session()
        session
            .run(`MATCH (parent {name: "A"})
                OPTIONAL MATCH (parent)-[:has_child]->(child)
                WITH parent, COLLECT({
                    name: child.name,
                    description: child.description,
                    children: [(child)-[:has_child]->(grandchild) | {
                        name: grandchild.name,
                        description: grandchild.description
                    }]
                }) AS children
                RETURN {
                    name: parent.name,
                    description: parent.description,
                    children: children
                } AS result;            
            `)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error);
            })
            .finally(() => session.close())
    });
}

// ==============================================================
// INCLUDED TO USE THE APPLICATION WITHOUT EXPOSING DATBASE LOGIN
// ==============================================================
// The backend uses .env variables to make a connection with the database. But there doesn't seem to be an 
// easy way to share these with whoever will review this. Therefore I have included this override of the 
// previous function that only runs when the .env is not present. This way, you can still use the application
// without needing the .env file. Bit hacky, but this is purely for running purposes. Normally you could share
// the .env variables personally or have them saved in the azure environment.
// Sidenote; its also the reason the driver instantiation is included in the function above. Otherwise it would be outside
if (!process.env.DB_URI || !process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
    exports.get_all_nodes = function() {
        return new Promise((resolve, reject) => {
            resolve({"records":[{"keys":["result"],"length":1,"_fields":[{"description":"This is a description of A","name":"A","children":[{"description":"This is a description of D","name":"D","children":[]},{"description":"This is a description of C","name":"C","children":[]},{"description":"This is a description of B","name":"B","children":[{"description":"This is a description of B-2","name":"B-2"},{"description":"This is a description of B-3","name":"B-3"},{"description":"This is a description of B-1","name":"B-1"}]}]}],"_fieldLookup":{"result":0}}],"summary":{"query":{"text":"MATCH (parent {name: \"A\"})\n                OPTIONAL MATCH (parent)-[:has_child]->(child)\n                WITH parent, COLLECT({\n                    name: child.name,\n                    description: child.description,\n                    children: [(child)-[:has_child]->(grandchild) | {\n                        name: grandchild.name,\n                        description: grandchild.description\n                    }]\n                }) AS children\n                RETURN {\n                    name: parent.name,\n                    description: parent.description,\n                    children: children\n                } AS result;            \n            ","parameters":{}},"queryType":"r","counters":{"_stats":{"nodesCreated":0,"nodesDeleted":0,"relationshipsCreated":0,"relationshipsDeleted":0,"propertiesSet":0,"labelsAdded":0,"labelsRemoved":0,"indexesAdded":0,"indexesRemoved":0,"constraintsAdded":0,"constraintsRemoved":0},"_systemUpdates":0},"updateStatistics":{"_stats":{"nodesCreated":0,"nodesDeleted":0,"relationshipsCreated":0,"relationshipsDeleted":0,"propertiesSet":0,"labelsAdded":0,"labelsRemoved":0,"indexesAdded":0,"indexesRemoved":0,"constraintsAdded":0,"constraintsRemoved":0},"_systemUpdates":0},"plan":false,"profile":false,"notifications":[],"server":{"address":"0437db38.databases.neo4j.io:7687","agent":"Neo4j/5.19-aura","protocolVersion":5.4},"resultConsumedAfter":{"low":1,"high":0},"resultAvailableAfter":{"low":1,"high":0},"database":{"name":"neo4j"}}});
        });
    }
}

