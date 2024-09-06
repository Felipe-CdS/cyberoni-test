import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserController";
import { PostController } from "./controllers/PostController";

const router = Router();

const userController = new UserController();
const postController = new PostController();

router.get("/users/:username", userController.readOne);
router.get("/users", userController.readByPage);
router.post("/users", userController.create);
router.patch("/users/:username", userController.update);
router.delete("/users/:username", userController.delete);

router.get("/posts/:id", postController.read);
router.get("/posts", postController.readAllByUser);
router.post("/posts", postController.create);
router.patch("/posts/:id", postController.update);
router.delete("/posts/:id", postController.delete);

export { router };
