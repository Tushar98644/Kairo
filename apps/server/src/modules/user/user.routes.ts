import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("List of users");
});

export default router;