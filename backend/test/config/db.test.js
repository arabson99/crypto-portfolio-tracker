import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon'; // Make sure to import sinon
import server from '../../server'; // Replace with your Express app
import dbClient from '../../config/db'; // Your database client

const { expect } = chai;
const { app } = server;
chai.use(chaiHttp);

describe('UserController with Sinon', () => {
  let findOneStub;

  before(() => {
    // Stub the findOne method to simulate a database error
    findOneStub = sinon.stub(dbClient.db.collection('users'), 'findOne').throws(new Error('Database error'));
  });

  after(() => {
    // Ensure to restore the stub after tests are complete
    if (findOneStub) {
      findOneStub.restore(); // This line ensures the stub is restored
    }
  });

  it('should handle database errors gracefully', async () => {
    const res = await chai.request(app)
      .post('/api/login')
      .send({ email: 'error@example.com', password: 'password123' });

    expect(res).to.have.status(501);
    expect(res.text).to.equal('Error');
  });
});
