const sql = require('mssql');
const config = require('../utils/dbconfig');

module.exports = class User {
    constructor(id,username,email,password,firstName,lastName,gender,dob,phone,job,facebook,linkedin,address) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dob = dob ;
        this.phone = phone;
        this.job = job;
        this.facebook = facebook;
        this.linkedin = linkedin;
        this.address = address;
    }

    async save() {
        try{
            let pool = await sql.connect(config);
            const sqlString = "INSERT INTO users (username,email,password) VALUES (@username,@email,@password)"
            let res = await pool.request()
            .input('username', sql.VarChar, this.username)
            .input('email', sql.VarChar, this.email)
            .input('password', sql.VarChar, this.password)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    async update() {
        try{
            let pool = await sql.connect(config);
            const sqlString = "UPDATE users SET username = @username, email = @email,firstName = @firstName,lastName = @lastName,job = @job,address = @address,phone = @phone,facebook = @facebook,linkedin = @linkedin,gender = @gender,dob = @dob WHERE id = @id"
            let res = await pool.request()
            .input('username', sql.VarChar, this.username)
            .input('email', sql.VarChar, this.email)
            .input('firstName', sql.NVarChar, this.firstName)
            .input('lastName', sql.NVarChar, this.lastName)
            .input('job', sql.NVarChar, this.job)
            .input('address', sql.VarChar, this.address)
            .input('phone', sql.VarChar, this.phone)
            .input('facebook', sql.VarChar, this.facebook)
            .input('linkedin', sql.VarChar, this.linkedin)
            .input('gender', sql.VarChar, this.gender)
            .input('id', sql.VarChar, this.id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    static async findByPk(id) {
        try{
            let pool = await sql.connect(config);
            const sqlString = "SELECT * FROM users WHERE users.id = @id"
            let res = await pool.request()
            .input('id', sql.Int, id)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }

    static async findByEmail(email) {
        try{
            let pool = await sql.connect(config);
            const sqlString = "SELECT * FROM users WHERE users.email = @email"
            let res = await pool.request()
            .input('email', sql.VarChar, email)
            .query(sqlString);
            return res.recordsets;
        } catch (error){
            console.log(" mathus-error :" + error);
        }
    }
};