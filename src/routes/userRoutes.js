import { Router } from "express";
import userController from "../controllers/UserController.js";
import loginRequired from "../middlewares/loginRequired.js";

const router = new Router();

// router.get('/',  userController.index);
//router.get('/',  loginRequired, userController.show);

router.post('/', loginRequired, userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;