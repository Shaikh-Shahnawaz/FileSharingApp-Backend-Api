const request = require("supertest");
const mongoose = require("mongoose");
const path = require("path");
const app = require("../app"); // ✅ Import Express app

beforeAll(async () => {
  // ✅ Connect to MongoDB before tests (Use test DB if possible)
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // ✅ Close DB connection after tests
  await mongoose.connection.close();
});

describe("File Sharing API", () => {
  test("GET /api/filesharing/all should return 200 and a files array", async () => {
    const response = await request(app).get("/api/filesharing/all");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Success");
    expect(Array.isArray(response.body.files)).toBe(true);
  });

  test("POST /api/filesharing/uploadfile should upload a file", async () => {
    const dummyFilePath = path.join(__dirname, "dummy.txt"); // ✅ ensure dummy.txt exists
    // console.log("Dummy file path:", dummyFilePath);
    const response = await request(app)
      .post("/api/filesharing/uploadfile")
      .attach("myfile", dummyFilePath); // ✅ attach dummy file
    // console.log("Response body:", response);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Success");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("filename");
    expect(response.body.data).toHaveProperty("uuid");
  });
});
