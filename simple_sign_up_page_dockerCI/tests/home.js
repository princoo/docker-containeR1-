const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

chai.should();
chai.use(chaiHttp);

describe('testing routes',function(){

    it('should return a simple message',function(done){
        chai
        .request(server)
        .get('/')
        .end((err,res)=>{
            res.should.have.status(200);
            done()
        })
    })
})