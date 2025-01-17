import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import authMiddleware from '../../middlewares/authMiddleware';
import jwtSecret from '../../config/secrets';

describe('authMiddleware', () => {
  let request, response, next;

  beforeEach(() => {
    request = {
      header: sinon.stub(),
    };
    response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore(); // Restore all mocked objects after each test
  });

  it('should return 401 if no token is provided', () => {
    request.header.returns(null);

    authMiddleware(request, response, next);

    expect(response.status.calledWith(401)).to.be.true;
    expect(response.json.calledWith({ message: 'No token provided' })).to.be.true;
    expect(next.called).to.be.false;
  });

  it('should return 401 if the token format is invalid', () => {
    request.header.returns('InvalidTokenFormat');

    authMiddleware(request, response, next);

    expect(response.status.calledWith(401)).to.be.true;
    expect(response.json.calledWith({ message: 'Invalid token format' })).to.be.true;
    expect(next.called).to.be.false;
  });

  it('should return 401 if the token is invalid or expired', () => {
    request.header.returns('Bearer invalidToken');
    sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));

    authMiddleware(request, response, next);

    expect(response.status.calledWith(401)).to.be.true;
    expect(response.json.calledWith({ message: 'Invalid or expired token' })).to.be.true;
    expect(next.called).to.be.false;
  });

  it('should call next and attach user info to the request if the token is valid', () => {
    const decodedToken = { userId: '12345', name: 'John Doe' };
    request.header.returns('Bearer validToken');
    sinon.stub(jwt, 'verify').returns(decodedToken);

    authMiddleware(request, response, next);

    expect(jwt.verify.calledWith('validToken', jwtSecret)).to.be.true;
    expect(request.user).to.deep.equal(decodedToken);
    expect(next.called).to.be.true;
    expect(response.status.called).to.be.false;
  });
});
