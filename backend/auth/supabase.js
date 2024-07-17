const createClient = require("@supabase/supabase-js").createClient;
const dotenv = require("dotenv");
dotenv.config();

const supabase = createClient(process.env.URL, process.env.PUBLIC_KEY);

module.exports = supabase;
