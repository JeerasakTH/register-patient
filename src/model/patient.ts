import mongoose, { ObjectId, Schema } from "mongoose";

interface Patient {
  firstname: string;
  lastname: string;
  created_at: Date;
  date_of_birth: Date;
  gender: string;
  address: string;
  phone_number: string;
  email: string;
  blood_type: string;
  height: number;
  weight: number;
  insurance: Insurance;
  medical_history: MedicalHistory[];
}

interface Insurance {
  name: string;
  policy_number: string;
}

interface MedicalHistory {
  condition: string;
  diagnosis_date: Date;
}

const patientSchema = new Schema<Patient>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  created_at: { type: Date, default: Date.now, required: true },
  date_of_birth: { type: Date, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String },
  blood_type: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  insurance: {
    name: { type: String },
    policy_number: { type: String },
  },
  medical_history: [
    {
      condition: { type: String },
      diagnosis_date: { type: Date },
    },
  ],
});

export const Patient = mongoose.model(
  "Patient",
  patientSchema,
  "patient_statement"
);
