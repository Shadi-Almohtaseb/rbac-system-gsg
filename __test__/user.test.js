import dataSource, { initDB } from "../dist/db/dataSource.js";
import { User } from "../src/db/entities/User.js";

beforeAll(async () => {
  await initDB();
});

afterAll(async () => {
  await dataSource.destroy();
});

const TemPUser = {
  email: "test@example.com",
  password: "password123",
  userName: "testuser",
  displayName: "Test User",
  role: "someRole",
};

describe("Create User", () => {
  it("should require all fields", async () => {
    await expect(createUser(TemPUser)).rejects.toThrow();
  });

  it("should create a user", async () => {
    const mockRole = {
      name: "someRole",
      permissions: ["p1", "p2"],
    };
    Role.findOneBy.mockResolvedValue(mockRole);

    const mockPermission = { name: "p1" };
    Permission.findBy.mockResolvedValue([mockPermission]);

    await createUser(TemPUser);

    expect(User.create).toHaveBeenCalledWith({
      ...TemPUser,
      roles: [mockRole],
    });
    expect(dataSource.manager.transaction).toHaveBeenCalled();
  });
});
