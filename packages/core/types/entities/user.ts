export type User = {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  id: string;
  role: "ADMIN" | "DISTRIBUTOR" | "GARAGE_OWNER";
  image_url: string | null;
  garage_id: string | null;
  createdAt: string;
  updatedAt: string;
};
