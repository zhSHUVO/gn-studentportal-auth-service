import express from "express";
import validateReq from "../../middlewares/validateReq";
import { AcademicFacultyController } from "./academicFaculty.controller";
import { AcademicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router();

router.post(
    "/create-faculty",
    validateReq(AcademicFacultyValidation.createFacultyZodSchema),
    AcademicFacultyController.createFaculty
);

export const AcademicFacultyRoutes = router;
