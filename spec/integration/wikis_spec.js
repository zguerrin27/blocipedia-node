// const request = require("request");
// const server = require("../../src/server");
// const base = "http://localhost:3000/wikis/";
// const sequelize = require("../../src/db/models/index").sequelize;
// const Wiki = require("../../src/db/models").Wiki;

// describe("routes : wikis", () => {

//   beforeEach((done) => {
//     this.wiki;
//     sequelize.sync({force: true}).then((res) => {

//      Wiki.create({
//        title: "JS Frameworks",
//        body: "There is a lot of them"
//      })
//       .then((wiki) => {
//         this.wiki = wiki;
//         // console.log(wiki)
//         done();
//       })
//       .catch((err) => {
//         console.log(err);
//         done();
//       });

//     });

//   });


//   describe("GET /wikis", () => {

//     it("should return a status code 200 and all wikis", (done) => {
//       request.get(base, (err, res, body) => {
//         expect(res.statusCode).toBe(200);
//         expect(err).toBeNull();
//         expect(body).toContain("Wikis");
//         expect(body).toContain("JS Frameworks");
//         done();
//       });
//     });
 
//   });

//   describe("GET /wikis/new", () => {

//     it("should render a new topic form", (done) => {
//       request.get(`${base}new`, (err, res, body) => {
//         expect(err).toBeNull();
//         expect(body).toContain("New Wiki");
//         done();
//       });
//     });

//   });
  
//   describe("POST /wikis/create", () => {

//     const options = {
//       url: `${base}create`,
//       form: {
//         title: "blink-182 songs",
//         body: "What's your favorite blink-182 song?"
//       }
//     };

//     it("should create a new wiki and redirect", (done) => {
//       request.post(options,
//         (err, res, body) => {
//           Wiki.findOne({where: {title: "blink-182 songs"}})
//           .then((wiki) => {
//             expect(res.statusCode).toBe(303);
//             expect(wiki.title).toBe("blink-182 songs");
//             expect(wiki.body).toBe("What's your favorite blink-182 song?");
//             done();
//           })
//           .catch((err) => {
//             console.log(err);
//             done();
//           });
//         }
//       );
//     });

//   });

//   describe("GET /wikis/:id", () => {

//     it("should render a view with the selected wiki", (done) => {
//       request.get(`${base}${this.wiki.id}`, (err, res, body) => {
//         expect(err).toBeNull();
//         expect(body).toContain("JS Frameworks");
//         done();
//       });
//     });

//   });

// });