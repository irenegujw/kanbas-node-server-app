import * as dao from "./dao.js";
// let currentUser = null;
function UserRoutes(app) {
  const createUser = async (req, res) => {
    const {username, password,firstName,lastName, role} = req.body;
    const user = await dao.createUser({
      username, password, firstName, lastName, role
    })
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const id = req.params.id;
    const status = await dao.deleteUser(id);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const id = req.params.id;
    const user = await dao.findUserById(id);
    res.json(user);
  };

  const findUserByUsername = async (req, res) => { 
    const username = req.params.username;
    const user = await dao.findUserByUsername(username);
    res.json(user);
  };

  const findUserByCredentials = async (req, res) => { 
    const {username,password} = req.params;
    const user = await dao.findUserByCredentials(username,password);
    res.json(user);
  };

  const findUsersByRole = async (req, res) => { 
    const role = req.params.role;
    const users = await dao.findUsersByRole(role);
    res.json(users);
  };

  const updateFirstName = async (req, res) => { 
    const id = req.params.id;
    const newFirstName = req.params.newFirstName;
    const status = await dao.updateUser(id,{firstName: newFirstName});
    res.json(status);
  };

  const updateUser = async (req, res) => { 
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json(status);
  };

  const signup = async (req, res) => { 
    const user = await dao.findUserByUsername(
      req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => { 
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session['currentUser'] = currentUser;
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.status(403).json(
        { message: 'Username or password incorrect' }
      )
    }

  };
  const signout = (req, res) => { 
    req.session.destroy();
    res.json(200);
  };
  const account = async (req, res) => { 
    res.json(req.session['currentUser']);
  };

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:id", findUserById);
  app.get("/api/users/username/:username",findUserByUsername)
  app.get("/api/users/credentials/:username/:password", findUserByCredentials)
  app.get("/api/users/role/:role",findUsersByRole)
  // app.get("/api/users/:username/:password/:email/:role",createUser); 
  app.get("/api/users/updateFirstName/:id/:newFirstName",updateFirstName);
  app.get("/api/users/delete/:id", deleteUser);

  app.delete("/api/users/:id", deleteUser);

  app.post("/api/users", createUser);
  app.put("/api/users/:id", updateUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
}
export default UserRoutes;