# adminPanel


- CRUD operations applied
- email validations applied
- password validations applied
- prevelage levels of access

// For Admin 

router.get("/login", login);	 //login
router.get("/logout", logout);	 //Logout
router.get("/", getCurrentAdmin); // get Current Admin //Done
router.post("/", createAdmin); // create a Admin  //Done
router.delete("/", deleteAdmin); // delete a Admin  //Done
router.patch("/", updateAdmin); // update a Admin

- Admin Can Create his Account and manage his account, and also he can logout his session, when he call login  Api, a cookie will stored in local storage and when he call logout Api, his session will be finished and clear cookie.


// For Foods 

router.get("/", getFoods); // get All foods     Done
router.get("/:id", getFood); // get a single food     Done
router.post("/", createFood); // create a food           Done
router.delete("/:id", deleteFood); // delete a food     Done
router.patch("/:id", updateFood); // update a food

- Only Admin Can create, update and delete foods. Users can see details of foods but cannot make any changes in it.


// For Users

router.get("/login", login); //Done
router.get("/logout", logout); //Done
router.get("/", getCurrentUser); // get Current User //Done
router.post("/", signupUser); // create a User  //Done
router.delete("/", deleteUser); // delete a User  //Done
router.patch("/:id", updateUser); // update a User

- User can create, modify, delete Users Account because admin have every access. User can make any changes into his account but cannot change his email address for now.







