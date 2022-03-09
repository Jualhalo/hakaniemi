/*
    Contains unit tests for server.ts. Run tests with command "npm test".
*/
import chai from 'chai';
import chaiHttp from 'chai-http';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Testing Server API', () => {
    it('should get data from /api/hakaniemi/', (done) => {
        chai.request('http://localhost:3000')
            .get('/api/hakaniemi/?startTime=2019-01-01&endTime=2019-12-31&format=monthly')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.be.eql(12);
                expect(res.body[0]).have.a.property('month');
                expect(res.body[0]).have.a.property('value');
                expect(res.body[0]).have.a.property('unit');
                done();
            });
    });
    it('should get data from different time range', (done) => {
        chai.request('http://localhost:3000')
            .get('/api/hakaniemi/?startTime=2019-07-01&endTime=2020-03-31&format=monthly')
            .end((err, res) => {
                expect(res.body.length).to.be.eql(9);
                expect(res.body[0].month).to.be.eql('2019-07')
                //the year should change and the month should be january
                expect(res.body[6].month).to.be.eql('2020-01')
                done();
            });
    });
});
describe('Testing converting data to monthly format', () => {
    it('should add values per month correctly', (done) => {
        chai.request('http://localhost:3000')
            .get('/api/hakaniemi/?startTime=2019-01-01&endTime=2019-02-28&format=monthly')
            .end((err, res) => {
                expect(res.body[1].value).to.be.eql(265.47)
                done();
            });
    });
});