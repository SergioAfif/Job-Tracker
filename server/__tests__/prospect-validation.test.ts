import { validateProspect } from "../prospect-helpers";

describe("prospect creation validation", () => {
  test("rejects a blank company name", () => {
    const result = validateProspect({
      companyName: "",
      roleTitle: "Software Engineer",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Company name is required");
  });

  test("rejects a blank role title", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Role title is required");
  });
});

describe("salary field validation", () => {
  test("accepts a prospect with no salary field", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a dollar-formatted salary string", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      targetSalary: "$120,000",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a range salary string", () => {
    const result = validateProspect({
      companyName: "Stripe",
      roleTitle: "PM",
      targetSalary: "120k-150k",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a free-form salary string", () => {
    const result = validateProspect({
      companyName: "Meta",
      roleTitle: "Designer",
      targetSalary: "negotiable",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts an empty string salary (treated as no salary)", () => {
    const result = validateProspect({
      companyName: "Amazon",
      roleTitle: "Analyst",
      targetSalary: "",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

describe("contact person field validation", () => {
  test("accepts a prospect with no contact person field", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a name-only contact string", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      contactPerson: "Jane Smith",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a name with email contact string", () => {
    const result = validateProspect({
      companyName: "Stripe",
      roleTitle: "PM",
      contactPerson: "Jane Smith - jane@company.com",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a name with phone contact string", () => {
    const result = validateProspect({
      companyName: "Meta",
      roleTitle: "Designer",
      contactPerson: "John Doe - 555-123-4567",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts an empty string contact (treated as no contact)", () => {
    const result = validateProspect({
      companyName: "Amazon",
      roleTitle: "Analyst",
      contactPerson: "",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
