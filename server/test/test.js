/******************************************************************************************
 * @Execution   : default nodemon : test.js
 * @Purpose     : To compare the output of a certain test with its expected value.
 * @description : Testing is done for user,notes
 * @overview    : Chai mocha 
 * @author      : PRAVALLIKA SK <skpravallikachowdary2@gmail.com>
 * @version     : chai:4.2.0,chai-http:4.3.0, mocha:6.0.0
 *******************************************************************************************/
let chai = require('chai')
let chaiHttp = require('chai-http')
chai.use(chaiHttp);
chai.should();
let server = require('../server')
let fs = require('fs');

function readFile() {

    //@description:read file from json

    let data = fs.readFileSync('/home/admin1/Desktop/fundoo/server/test/test.json')
    let data1 = JSON.parse(data);
    return data1;
}
/*
 * @description:test script for user-registration 
 */
describe('Status and content', function () {
    describe('Register page', function () {
        let data1 = readFile();
        it('status', function (done) {
            chai.request(server).post('/user/register').send(data1.register).end((err, res) => {
                if (err) {
                    console.log("expect ");
                    err.should.have.status(500)
                } else {
                    console.log("expect result ", res.body)
                    // res.should.have.status(200)
                    done()
                }
            })
        })
        // it('status',function(done){
        //     chai.request(server).post('/user/register').send(data1.register).end((err,res)=>{
        //         for(let i=0;i<4;i++){
        //             let users=data1.register()
        //             assert.oneOf()
        //         }
        //     })
        // })
        // describe('Register', () => {
        //     it('it should not register without email address', (done) => {
        //         let data1 = readFile()
        //         chai.request(server)
        //             .post('/user/register')
        //             .send(data1.register)
        //             .end((err, res) => {
        //                 // res.should.have.status(200);
        //                 res.body.should.be.a('object');
        //                 res.body.should.have.property('errors');
        //                 res.body.errors.email.should.have.property('kind').eql('required');
        //                 done();
        //             });
        //     });
        // })
        /*
         * @description:test script for user-login
         */
        describe('login', function () {
            let data1 = readFile()
            it('status', function (done) {
                chai.request(server).post('/user/login').send(data1.login).end((err, res) => {
                    if (err) {
                        console.log("expect ===>")
                        err.should.have.status(500)
                    } else {
                        console.log("expect result ===>", res.body)
                        // res.should.have.status(200)
                        done()
                    }
                })
            })
        })
    })
    // describe('login', function () {
    //     let data1 = readFile()
    //     it('status', function (done) {
    //         chai.request(server)
    //             .post('/user/login').send(data1.login).end((err, res) => {
    //                 res.body.should.be.a('object')
    //                 res.body.should.have.property('errors')
    //                 done()
    //             })
    //     })
    // })
    /*
     * @description:test script for user-forgotpassword
    */
    describe('Forgotpassword page', function () {
        let data1 = readFile()
        it('status', function (done) {
            chai.request(server).post('/user/forgotpassword').send(data1.forgotpassword).end((err, res) => {
                if (err) {
                    console.log("expect ===>")
                    err.should.have.status(500)
                } else {
                    console.log("expect result ===>", res.body)
                    // res.should.have.status(200)
                    done()
                }
            })
        })
        /**
        * @description:test script for user-resetpassword
        **/
        describe('resetpassword page', function () {
            let data1 = readFile()
            it("status", function (done) {
                chai.request(server).post('/user/resetpassword').send(data1.resetpassword).end((err, res) => {
                    if (err) {
                        console.log("expect ===>")
                        err.should.have.status(500)
                    } else {
                        console.log("expect result ===>", res.body)
                        // res.should.have.status(200)
                        done()
                    }
                })
            })
        })
    })
    /*add notes*/
    describe('ADD NOTE', function () {
        let data1 = readFile()
        it('should add a note', function (done) {
            chai.request(server)
                .post('/note/addNote').send(data1.addNote).end((err, res) => {
                    // res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    res.body.errors.title.should.have.property('kind').eql('required');
                    done()
                })
        })
    })
    // describe("getAllnote", function () {
    //     // let data1 = readFile()
    //     it('should get all note', function (done) {
    //         chai.request(server)
    //             .get('/note/getAllnote').send().end((err, res) => {
    //                 // res.should.have.status(200)
    //                 res.body.should.be.a('object')
    //                 res.body.should.have.property('errors')
    //                 // res.body.errors.title.should.have.property('kind').eql('required')
    //                 done()
    //             })
    //     })
    // })
})