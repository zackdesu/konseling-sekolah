import { Router } from "express";
import { getAllCounselors, getOneCounselor } from "../controller/counselor";

const router: Router = Router();

router.get("/counselors", getAllCounselors);
router.get("/counselor", getOneCounselor);

export { router };
