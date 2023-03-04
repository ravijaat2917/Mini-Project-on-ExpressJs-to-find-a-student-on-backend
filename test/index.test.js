const app = require("./../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");

chai.should();
chai.use(chaiHttp);

describe("Student API with query params and URL params", () => {

    it("it should get all the students data", () => {
      chai
        .request(app)
        .get("/api/students")
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
        });
    });

    it("it should get the student data of mark", () => {
        chai
          .request(app)
          .get("/api/students/mark")
          .end((err, res) => {
            if (err) return done(err);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
          });
      });
    
      it("it should get the highest average", () => {
        chai
          .request(app)
          .get("/api/student/")
          .query({ field1: 'topper', field2: 'average'})
          .end((err, res) => {
            if (err) return done(err);
            expect(res).to.have.status(200);
            expect(res.body.average).to.equal(95);
          });
      });

      it("it should get the lowest average", () => {
        chai
          .request(app)
          .get("/api/student/")
          .query({ field1: 'lowest', field2: 'average'})
          .end((err, res) => {
            if (err) return done(err);
            expect(res).to.have.status(200);
            expect(res.body.average).to.equal(78);
          });
      });

      it("it should get the 400 status on passing different value in field1 in query paramss", () => {
        chai
          .request(app)
          .get("/api/student/")
          .query({ field1: 'small', field2: 'average'})
          .end((err, res) => {
            if (err) return done(err);
            expect(res).to.have.status(400);
          });
      });

});