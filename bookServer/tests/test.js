const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('Books API', () => {
  it('should add a book', (done) => {
    chai
      .request(app)
      .post('/api/books')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        publicationDate: '2023-09-12',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.title).to.equal('Test Book');
        done();
      });
  });

  it('should search for books by title', (done) => {
    chai
      .request(app)
      .get('/api/books?title=Test')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Additional assertions based on your API's behavior
        done();
      });
  });

});
