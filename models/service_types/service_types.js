import {query} from "../../services/db.js"

const getAll = async() => {
    return await query("SELECT type_name FROM service_types");

};

export default {getAll};
